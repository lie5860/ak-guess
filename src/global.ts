// moment 和 axios 仍通过 CDN 加载到 window，保持全局代理导出
// React/ReactDOM 已迁移为标准模块化导入，不再从 window 取值
const moment = window.moment;

export { moment };
