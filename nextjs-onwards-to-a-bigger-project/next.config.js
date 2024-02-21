/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/images/**"
      }
    ]
  }
}
// ignore warning here
module.exports = nextConfig
