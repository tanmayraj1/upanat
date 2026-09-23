/**
 * Static export: the storefront ships to GitHub Pages, so every route is
 * pre-rendered and next/image optimisation is turned off (no server at runtime).
 * BASE_PATH is set by the Pages workflow for project sites (/<repo>).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true
};
