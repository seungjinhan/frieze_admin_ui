/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    APISERVER: process.env.APISERVER,
  },
};

module.exports = nextConfig;
