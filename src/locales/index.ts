const Dicts: { [key: string]: () => Promise<any> } = {
  zh_CN: () => import(`./resource/zh_CN`),
  en_US: () => import(`./resource/en_US`),
  ja_JP: () => import(`./resource/ja_JP`),
  ko_KR: () => import(`./resource/ko_KR`),
}
const labelDict = {
  zh_CN: 'CN',
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
export {labelDict, hostDict};
export default Dicts;
