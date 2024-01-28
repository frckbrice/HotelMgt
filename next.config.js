/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
  // disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
  fallbacks: {
    image: "/public/assets/icons/icon-512x512.png",
  },
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "www.vecteezy.com",
      },
      {
        hostname: "www.google.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "unsplash.com",
      },
      {
        hostname: "plus.unsplash.com",
      },
      {
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
