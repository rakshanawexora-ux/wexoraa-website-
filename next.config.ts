import type { NextConfig } from "next";
const config: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
};
export default config;
