import React from "React";
import {AppCtx} from "./AppCtx";
import languages from './index';
import {MAIN_KEY} from "../const";

export const localStorageSet = (lang: string, key: string, value: string) => {
  return localStorage.setItem(key + ((lang === 'zh_CN' || !lang) ? '' : `|${lang}`), value)
}
export const localStorageGet = (lang: string, key: string) => {
  return localStorage.getItem(key + ((lang === 'zh_CN' || !lang) ? '' : `|${lang}`))
}
export const I18nWrap = (props: any) => {
  const [language, setLanguage] = React.useState('zh_CN')
  const [inited, setInited] = React.useState(false)
  const [chartsData, setDealData] = React.useState([])
  const [chartNameToIndexDict, setChartNameToIndexDict] = React.useState({})
  const [aliasData, setAliasData] = React.useState([])
  const [languageDict, initI18nDict] = React.useState({});
  const init = async () => {
    const lang = localStorage.getItem('__lang')
    const urlLang = location?.search?.slice?.(1)?.split("&")?.map(s => s?.split("="))?.filter(v => v?.[0] === 'lang')?.[0]?.[1];
    if (urlLang !== lang && languages?.[urlLang]) {
      localStorage.setItem('__lang', urlLang)
      location.reload()
      return;
    }
    const lastLang = (lang && languages?.[lang]) ? lang : language
    const sl = (await languages?.[lastLang]()).default
    setLanguage(lastLang)
    initI18nDict(sl)
    const dd = (await import(`../data/dealData/dealData_${lastLang}.json`)).default
    setDealData(dd)
    const dict: { [key: string]: number } = {};
    dd.forEach((v: Character, index: number) => {
      dict[v?.[MAIN_KEY]] = index;
    })
    setChartNameToIndexDict(dict);
    const alias = (await import(`../data/alias/alias_${lastLang}.json`)).default
    setAliasData(alias)
    setInited(true)

  }
  React.useEffect(init, [])
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
