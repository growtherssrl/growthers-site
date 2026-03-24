import type { NextConfig } from "next";

const isPagesExport = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isPagesExport ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
  basePath: isPagesExport ? "/growthers-site" : "",
};

export default nextConfig;
