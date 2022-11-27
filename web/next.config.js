/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  localeDetection: false,
  i18n,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
      port: "",
      pathname: "/a/",
    },
  ],
};
