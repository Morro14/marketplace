import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.11.58", "192.168.11.73"],
  devIndicators: false,
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
