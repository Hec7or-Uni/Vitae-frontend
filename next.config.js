/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
// eslint-disable-next-line no-unused-vars
const runtimeCaching = require('next-pwa/cache')

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'spoonacular.com']
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  }
})

module.exports = nextConfig
