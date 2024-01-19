/** @type {import('next').NextConfig} */
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
    ],
  },
};

module.exports = nextConfig;
