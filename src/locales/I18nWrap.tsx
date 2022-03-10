import {React} from "../global";
import {AppCtx} from "./AppCtx";
import languages from './index';

export const I18nWrap = (props: any) => {
  const [language, setLanguage] = React.useState('zh')
  const [inited, setInited] = React.useState(false)
  React.useEffect(() => {
    const lang = localStorage.getItem('__lang')
    if (lang && languages?.[lang]) {
      setLanguage(lang)
    }
    setInited(true)
  }, [])
  if (!inited) return null
  return <AppCtx.Provider value={{
    i18n: {
      get: (key: string, props: { [key: string]: string }) => {
        let res = languages?.[language]?.[key] || key
        if (props) {
          Object.keys(props).forEach(key => {
            res = res.replaceAll(`{${key}}`, props[key])
          })
        }
        return res
      },
      setLanguage
    }
  }}>
    {props.children}
  </AppCtx.Provider>
}
