//首先是异常处理
self.addEventListener('error', function (e) {
    self.clients.matchAll()
        .then(function (clients) {
            if (clients && clients.length) {
                clients[0].postMessage({
                    type: 'ERROR',
                    msg: e.message || null,
                    stack: e.error ? e.error.stack : null
                });
            }
        });
});
self.addEventListener('unhandledrejection', function (e) {
    self.clients.matchAll()
        .then(function (clients) {
            if (clients && clients.length) {
                clients[0].postMessage({
                    type: 'REJECTION',
                    msg: e.reason ? e.reason.message : null,
                    stack: e.reason ? e.reason.stack : null
                });
            }
        });
})
//然后引入workbox
importScripts(
    "./workbox.js"
);
if (workbox) {
    console.log('workbox加载成功');
} else {
    console.log('workbox加载失败');
}
//关闭控制台中的输出
workbox.setConfig({debug: false});

//直接激活跳过等待阶段
workbox.skipWaiting();
workbox.clientsClaim();
// 定义缓存名称
workbox.core.setCacheNameDetails({
    prefix: 'react-wc',
    suffix: 'v1'
});
const urls = [
    'https://unpkg.com/@magic-microservices/magic@1.1.3/dist/index.umd.js',
    'https://cdn.jsdelivr.net/npm/echarts@5.3.0/dist/echarts.js',
    'https://unpkg.com/react@17/umd/react.production.min.js',
    'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    'https://unpkg.com/axios/dist/axios.min.js',
]
var fileList = urls.map(url => ({url}));
//precache 适用于支持跨域的cdn和域内静态资源
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(fileList, {
    "ignoreUrlParametersMatching": [/./]
});
//staleWhileRevalidate
// 这种策略的意思是当请求的路由有对应的 Cache 缓存结果就直接返回，
// 在返回 Cache 缓存结果的同时会在后台发起网络请求拿到请求结果并更新 Cache 缓存，
// 如果本来就没有 Cache 缓存的话，直接就发起网络请求并返回结果，这对用户来说是一种非常安全的策略，能保证用户最快速的拿到请求的结果。
// 但是也有一定的缺点，就是还是会有网络请求占用了用户的网络带宽。可以像如下的方式使用 State While Revalidate 策略：
workbox.routing.registerRoute(
    new RegExp('https://74082082-1683720436570405.test.functioncompute.com/'),
    workbox.strategies.staleWhileRevalidate({
        //cache名称
        cacheName: 'lf-sw:static',
        plugins: [
            new workbox.expiration.Plugin({
                //cache最大数量
                maxEntries: 30
            })
        ]
    })
);
//cacheFirst
// 这个策略的意思就是当匹配到请求之后直接从 Cache 缓存中取得结果，
// 如果 Cache 缓存中没有结果，那就会发起网络请求，
// 拿到网络请求结果并将结果更新至 Cache 缓存，
// 并将结果返回给客户端。这种策略比较适合结果不怎么变动且对实时性要求不高的请求。
// 可以像如下方式使用 Cache First 策略：
workbox.routing.registerRoute(
    new RegExp('https://cdn\.jsdelivr\.net/npm/@shoelace-style/'),
    workbox.strategies.cacheFirst({
        cacheName: 'lf-sw:img',
        plugins: [
            //如果要拿到域外的资源，必须配置
            //因为跨域使用fetch配置了
            //mode: 'no-cors',所以status返回值为0，故而需要兼容
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 150,
                //缓存的时间
                maxAgeSeconds: 60 * 60 * 24 * 365
            })
        ]
    })
);
console.log('Hello from service-worker.js');
