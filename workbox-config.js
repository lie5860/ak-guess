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
            urlPattern: /.*index.(css|js|html)$/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'networkFirst-1.2'
            }
        },
        {
            urlPattern: /.*(?:(css|js|png|jpg|jpeg|svg|json|ico))$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'CacheFirst-1.2'
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
