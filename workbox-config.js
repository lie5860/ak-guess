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
            // moment再见 咱流量费又好起来咯~
            urlPattern: /\.*index.(css|js|html)$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'networkFirst'
            }
        },
        {
            urlPattern: /.*(?:png|jpg|jpeg|svg|css|js|html|json|ico)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'CacheFirst'
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
