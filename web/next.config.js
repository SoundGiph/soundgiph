/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  i18n,
  env: {
    API_URL: process.env.ENV === "development" ? process.env.API_URL_DEV : process.env.API_URL_PROD,
  },
};
