// Baseline security headers applied to every route. Kept conservative so they
// don't interfere with a static content site: no CSP here (it is easy to break
// and needs per-asset tuning), just the low-risk, high-value defaults.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained server bundle for a small production Docker image.
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    // better-sqlite3 is a native module: keep it external (loaded from
    // node_modules at runtime) rather than bundled by webpack.
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
