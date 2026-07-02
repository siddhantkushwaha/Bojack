/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained server bundle for a small production Docker image.
  output: "standalone",
  reactStrictMode: true,
  experimental: {
    // better-sqlite3 is a native module — keep it external (loaded from
    // node_modules at runtime) rather than bundled by webpack.
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
};

export default nextConfig;
