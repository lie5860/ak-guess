import {React} from "../global";
import {AppCtx} from "./AppCtx";
import languages from './index';

export const localStorageSet = (lang: string, key: string, value: string) => {
  return localStorage.setItem(key + ((lang === 'zh_CN' || !lang) ? '' : `|${lang}`), value)
}
export const localStorageGet = (lang: string, key: string) => {
  return localStorage.getItem(key + ((lang === 'zh_CN' || !lang) ? '' : `|${lang}`))
}
export const I18nWrap = (props: any) => {
  const [language, setLanguage] = React.useState('zh_CN')
  const [inited, setInited] = React.useState(false)
  const [chartsData, setDealData] = React.useState({})
  const init = async () => {
    const lang = localStorage.getItem('__lang')
    if (lang && languages?.[lang]) {
      setLanguage(lang)
      const dd = (await import(`../data/dealData_${lang}.json`)).default
      setDealData(dd)
      setInited(true)
    } else {
      const dd = (await import(`../data/dealData_${language}.json`)).default
      setDealData(dd)
    }
    setInited(true)
  }
  React.useEffect(init, [])
  if (!inited) return null
  return <AppCtx.Provider value={{
    i18n: {
      get: (key: string, props: { [key: string]: string }, hasLegacyDom = false) => {
        let res = languages?.[language]?.[key] || key
        if (props) {
          Object.keys(props).forEach(key => {
            res = res.replaceAll(`{${key}}`, props[key])
          })
        }
        return hasLegacyDom ? <span dangerouslySetInnerHTML={{__html: res}}/> : res
      },
      setLanguage,
      language
    },
    chartsData,
  }}>
    {props.children}
  </AppCtx.Provider>
}
