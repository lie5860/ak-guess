module.exports = {
    globDirectory: '/lie-static/ak-guess/',
    cacheId: 'glob',
    skipWaiting: true,
    inlineWorkboxRuntime: true,
    cleanupOutdatedCaches: true,
    globPatterns: [
        '**/*.{ico}'
    ],
    runtimeCaching: [
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg|ico|json)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'CacheFirst',
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
                },
            },
        },
        {
            urlPattern: /\.*index.(css|js|html)$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'networkFirst'
            }
        },
        {
            urlPattern: /.*(?:png|jpg|jpeg|svg|css|js|html)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'StaleWhileRevalidate'
            }
        }
    ],
    swDest: 'public/sw.js',
    ignoreURLParametersMatching: [
        /^utm_/,
        /^fbclid$/
    ],
    sourcemap: false
};
