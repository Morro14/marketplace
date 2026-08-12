import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.11.53"],
  devIndicators: false,
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
