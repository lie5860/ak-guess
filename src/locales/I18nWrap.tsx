import {React} from "../global";
import '../typings.d.ts'
import {AppCtx} from "./AppCtx";
import languages, {DEFAULT_CONFIG, getConfig, hostDict} from './index';
import {MAIN_KEY, STORAGE} from "../const";

export const localStorageSet = (lang: string, key: string, value: string) => {
  return localStorage.setItem(key + ((lang === 'zh_CN' || !lang) ? '' : `|${lang}`), value)
}
export const localStorageGet = (lang: string, key: string) => {
  return localStorage.getItem(key + ((lang === 'zh_CN' || !lang) ? '' : `|${lang}`))
}
export const localStorageRemove = (lang: string, key: string) => {
  return localStorage.removeItem(key + ((lang === 'zh_CN' || !lang) ? '' : `|${lang}`))
}
export const I18nWrap = (props: any) => {
  const [language, setLanguage] = React.useState(DEFAULT_CONFIG.defaultLang)
  const [inited, setInited] = React.useState(false)
  const [chartsData, setDealData] = React.useState([])
  const [chartNameToIndexDict, setChartNameToIndexDict] = React.useState({})
  const [aliasData, setAliasData] = React.useState([])
  const [languageDict, initI18nDict] = React.useState<Record<string, string>>({});
  const init = async () => {
    const lang = localStorage.getItem(STORAGE.LANG)
    const urlLang = location?.search?.slice?.(1)?.split("&")?.map(s => s?.split("="))?.filter(v => v?.[0] === 'lang')?.[0]?.[1];
    const preConfig = getConfig(lang || '');
    if(!urlLang && lang && !preConfig.showServer){
      //   如果 url 没有值，则默认使用上次语言，如果上次语言不支持切换服务（语言），则认为是限定语言。应该切回默认语言
      localStorage.setItem(STORAGE.LANG, preConfig.defaultLang)
      location.reload()
      return;
    }
    if (urlLang !== lang && languages?.[urlLang]) {
      localStorage.setItem(STORAGE.LANG, urlLang)
      location.reload()
      return;
    }
    const lastLang = (lang && languages?.[lang]) ? lang : language
    const sl = (await languages?.[lastLang]()).default
    setLanguage(lastLang)
    initI18nDict(sl)
    // 如果是限定语言 不存在对应的游戏数据，则使用该语言配置的默认语言作为游戏数据的语言
    const fixLang = Object.keys(hostDict).includes(lastLang) ? lastLang :  preConfig.defaultLang;
    const dd = (await import(`../data/dealData/dealData_${fixLang}.json`)).default
    setDealData(dd)
    const dict: { [key: string]: number } = {};
    dd.forEach((v: any, index: number) => {
      dict[v?.[MAIN_KEY]] = index;
    })
    setChartNameToIndexDict(dict);
    const alias = (await import(`../data/alias/alias_${fixLang}.json`)).default
    setAliasData(alias)
    setInited(true)

  }
  React.useEffect(() => { void init(); }, [])
  if (!inited) return null
  return <AppCtx.Provider value={{
    i18n: {
      get: (key: string, props: { [key: string]: string }, hasLegacyDom = false) => {
        let res = languageDict?.[key] || key
        if (props) {
          Object.keys(props).forEach(key => {
            res = res.replace(new RegExp(`{${key}}`, 'g'), props[key])
          })
        }
        return hasLegacyDom ? <span dangerouslySetInnerHTML={{__html: res}}/> : res
      },
      setLanguage,
      language
    },
    chartsData,
    aliasData,
    chartNameToIndexDict
  }}>
    {props.children}
  </AppCtx.Provider>
}
