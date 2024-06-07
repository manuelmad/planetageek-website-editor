/** @type {import('next').NextConfig} */
const nextConfig = {
        // Added this 'images' rule here so Next Accepts the external url from firebasestorage
        images: {
            remotePatterns: [
              {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
              },
            ],
          },
};

export default nextConfig;
