const Dicts: { [key: string]: () => Promise<any> } = {
  zh_CN: () => import(`./zh_CN`),
  en_US: () => import(`./en_US`),
  ja_JP: () => import(`./ja_JP`),
  ko_KR: () => import(`./ko_KR`),
}
export default Dicts
