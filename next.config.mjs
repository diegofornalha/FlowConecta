/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains :['images.lumacdn.com'],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
    }
};

export default nextConfig;
