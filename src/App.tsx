import {moment, React} from './global'
import {DAILY_MODE, modeI18nKeyDict, PARADOX_MODE, RANDOM_MODE} from "./const";
import Modal from "./component/Modal";
import Help from './component/Help';
import {getDailyData} from "./server";
import {AppCtx} from './locales/AppCtx';
import './normalize.css'
import './index.less'
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";
import {hostDict, labelDict} from "./locales";
import Game from './component/Game';

export default function Home() {
  const {i18n, chartsData, chartNameToIndexDict} = React.useContext(AppCtx);
  const [mode, setMode] = React.useState(RANDOM_MODE)
  const [showDailyMode, setShowDailyMode] = React.useState(false)
  const [updateDate, setUpdateDate] = React.useState('')
  const today = React.useMemo(() => moment().tz("Asia/Shanghai").format('YYYY-MM-DD'), [])
  const store = {mode, chartsData, today, i18n, chartNameToIndexDict}
  const openHelp = (firstOpen = false) => {
    window?.mduiModal?.open({
      "message": <Help updateDate={updateDate} firstOpen={firstOpen} mode={mode}/>,
      "title": i18n.get('helpTitle'),
      useCloseIcon: true
    })
  }
  window.document.title = i18n.get('title');
  React.useEffect(() => {
    getDailyData(i18n.language).then(({last_date, daily}: { last_date: string, daily: number }) => {
      setUpdateDate(last_date)
      setShowDailyMode(daily >= 0)
    })
    if (!localStorageGet(i18n.language, 'firstOpen')) {
      localStorageSet(i18n.language, 'firstOpen', 'yes');
      setTimeout(() => {
        openHelp(true)
      }, 500)
    }
  }, [])
  const menu = showDailyMode ? [RANDOM_MODE, DAILY_MODE, PARADOX_MODE] : [RANDOM_MODE, PARADOX_MODE];
  // 第一次进悖论模式，弹出帮助框
  if (mode == PARADOX_MODE && !localStorageGet(i18n.language, 'firstOpenParadox')) {
    localStorageSet(i18n.language, 'firstOpenParadox', 'yes');
    setTimeout(() => {
      openHelp(true)
    }, 500)
  }
  return (
    <div className={'container'}>
      <div className={`main-container clean-float lang-${i18n.language}`}>
        {hostDict[i18n.language] && <button id="server-menu-btn" mdui-menu="{ target: '#server-menu', covered: false }"
                className="appbar-btn mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white">
          <i className="mdui-icon material-icons">dns</i>
          <span className="mini-chip mdui-color-blue-a400 mdui-text-uppercase pointer font-mono"
                id="server-chip">
            <span className="mini-chip-content">{labelDict[i18n.language]}</span>
          </span>
        </button>}
         <ul id="server-menu" className="mdui-menu">
          <li className="mdui-menu-item mdui-ripple">
            {Object.keys(labelDict).filter(v => hostDict[v]).map((key) => {
              return <a key={key} className="mdui-ripple pointer" onClick={() => {
                location.href = `${location.protocol}//${location.host}${location.pathname}?lang=${key}`
              }}>
                <i style={{visibility: key === i18n.language ? undefined : 'hidden'}}
                   className="mdui-menu-item-icon mdui-icon material-icons">done</i>
                {labelDict[key]}
              </a>
            })}
          </li>
        </ul>
        <div className="mdui-tab mdui-tab-scrollable ak-tab" mdui-tab={`${true}`}>
          {menu.map((menuMode) => {
            return <div key={menuMode} className={`ak-tab-item ${mode === menuMode ? 'active' : ''}`}
                        onClick={() => setMode(menuMode)}>
              {i18n.get(modeI18nKeyDict[menuMode])}
            </div>
          })}
        </div>
        {<Game key={mode} store={store} openHelp={openHelp}/>}
        <Modal/>
      </div>
    </div>
  )
}
