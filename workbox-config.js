// "generateSW": "workbox generateSW workbox-config.js",
module.exports = {
    globDirectory: '/dict',
    cacheId: 'glob',
    skipWaiting: true,
    clientsClaim: true,
    inlineWorkboxRuntime: true,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
        {
            // moment再见 咱流量费又好起来咯~
            urlPattern: /^https:\/\/74082082-1683720436570405.test.functioncompute.com.*index.*/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'networkFirst-1.2'
            }
        },
        {
            urlPattern: /^.*unpkg.*$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'CacheFirst-unpkg',
                cacheableResponse: {
                    statuses: [200]
                }
            }
        },
        {
            urlPattern: /^.*ak-guess\.oss.*$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'CacheFirst-oss',
                cacheableResponse: {
                    statuses: [200]
                }
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
