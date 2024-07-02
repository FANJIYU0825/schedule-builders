/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    const commitId = require('child_process').execSync('git rev-parse HEAD').toString().trim()
    return commitId
  }

}

module.exports = nextConfig
