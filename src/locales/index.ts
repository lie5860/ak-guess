const Dicts: { [key: string]: () => Promise<any> } = {
    zh_CN: () => import(`./resource/zh_CN`),
    tlml: () => import(`./resource/tlml`),
    en_US: () => import(`./resource/en_US`),
    ja_JP: () => import(`./resource/ja_JP`),
    ko_KR: () => import(`./resource/ko_KR`),
}
const labelDict: { [key: string]: string } = {
    zh_CN: 'CN',
    tlml: 'CN',
    en_US: 'EN',
    ja_JP: 'JP',
    ko_KR: 'KR',
}
const hostDict: { [key: string]: string } = {
    zh_CN: 'http://zh.akg.saki.cc',
    en_US: 'http://en.akg.saki.cc',
    ja_JP: 'http://ja.akg.saki.cc',
    // kr 还没有
    ko_KR: '',
}
export const DEFAULT_CONFIG = {
    // 顶部切换模式开关
    showModeTab: true,
    // 右上角语言切换开关
    showServer: true,
    // 显示帮助
    showHelp: true,
    // 显示统计数据
    showReport: true,
    // 显示反馈入口
    showFeedback: true,
    // 显示干员列表
    showOperators: true,
    // 再不支持切换服务器的语言上使用不带语言的 url 进行访问时自动切会的语言，且游戏资源不存在该语言的情况下默认使用这个配置的语言
    defaultLang: 'zh_CN'
}
const config: { [key in string]: typeof DEFAULT_CONFIG } = {
    tlml: {
        ...DEFAULT_CONFIG,
        showModeTab: false,
        showServer: false,
        showHelp: false,
        showFeedback: false,
        showOperators: false,
        showReport: false
    }
}
export const getConfig = (lang: string) => {
    return config[lang] || DEFAULT_CONFIG
}
export {labelDict, hostDict};
export default Dicts;
