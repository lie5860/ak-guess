const Dicts: { [key: string]: () => Promise<any> } = {
  zh_CN: () => import(`./zh_CN`),
  en_US: () => import(`./en_US`),
  ja_JP: () => import(`./ja_JP`),
  ko_KR: () => import(`./ko_KR`),
}
const labelDict = {
  zh_CN: 'ZH',
  en_US: 'EN',
  ja_JP: 'JP',
  ko_KR: 'KR',
}
const hostDict = {
  zh_CN: 'http://akg.saki.cc',
  en_US: 'http://akg_en.saki.cc',
  ja_JP: 'http://akg_ja.saki.cc',
  // kr 还没有
  ko_KR: 'http://akg.saki.cc',
}
export {labelDict, hostDict};
export default Dicts;
