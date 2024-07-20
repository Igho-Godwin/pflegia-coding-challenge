//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      {
        // https://images.pexels.com
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        // https://placehold.co/600x400
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        // https://loremflickr.com
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
