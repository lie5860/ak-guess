// "generateSW": "workbox generateSW workbox-config.js",
module.exports = {
    globDirectory: '/dict',
    cacheId: 'glob',
    skipWaiting: true,
    inlineWorkboxRuntime: true,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
        {
            // baidu统计的部分不走缓存 写了好像没什么效果
            urlPattern: 'https://hm.baidu.com/hm.js?22b404b3f2e90c075c155f75ff26fb32',
            handler: 'NetworkOnly'
        },
        {
            // moment再见 咱流量费又好起来咯~
            urlPattern: /^https:\/\/74082082-1683720436570405.test.functioncompute.com.*index.*/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'networkFirst-1.2'
            }
        },
        {
            urlPattern: /.*(css|js|png|jpg|jpeg|svg|json|ico).*/,
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
