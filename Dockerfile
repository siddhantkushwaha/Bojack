# syntax=docker/dockerfile:1

# Debian slim (glibc) rather than Alpine (musl): better-sqlite3 is a native
# module and its prebuilt binaries target glibc.
FROM node:22-slim AS base
WORKDIR /app

# ---- Dependencies ----
FROM base AS deps
# Build toolchain in case a native prebuild isn't available for this platform.
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Builder ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Runner (production) ----
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Where the SQLite database lives (mount a volume here to persist it).
ENV DATABASE_PATH=/app/data/app.db

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# Standalone output: minimal server + traced node_modules.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Data directory for the SQLite file, owned by the runtime user.
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data
VOLUME ["/app/data"]

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
