const Dicts: { [key: string]: () => Promise<any> } = {
  zh_CN: () => import(`./zh_CN`),
  en_US: () => import(`./en_US`),
  ja_JP: () => import(`./ja_JP`),
  ko_KR: () => import(`./ko_KR`),
}
const labelDict = {
  zh_CN: 'CN',
  en_US: 'US',
  ja_JP: 'JP',
  ko_KR: 'KR',
}
const hostDict = {
  zh_CN: 'http://akg_zh.saki.cc/',
  en_US: 'http://akg_en.saki.cc',
  ja_JP: 'http://akg_ja.saki.cc',
  // kr 还没有
  ko_KR: '',
}
export {labelDict, hostDict};
export default Dicts;
