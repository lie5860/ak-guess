import React from "react";
import {AppCtx} from '../locales/AppCtx';
import {localStorageGet} from "../locales/I18nWrap";
import {filterDataByInputVal} from "../utils/autocomplete";
import {modeI18nKeyDict, DAILY_MODE, PARADOX_MODE, RANDOM_MODE} from "../const";

const Guide = () => {
  const {i18n, chartsData, aliasData} = React.useContext(AppCtx);
  const baseData = [...chartsData].reverse().map((v, index) => {
    return {...v, index: chartsData.length - index}
  })
  const [data, setData] = React.useState(baseData)
  const record = JSON.parse(localStorageGet(i18n.language, 'record') || '{}')
  const paradoxModeRecord = record[PARADOX_MODE].roles;
  const randomModeRecord = record[RANDOM_MODE].roles;
  var randomRoleCount = Object.keys(randomModeRecord).length;
  var paradoxRoleCount = Object.keys(paradoxModeRecord).length;
  React.useEffect(() => {
    window.mdui.mutation()
  }, [])

  return <>
    <div style={{padding: 10}}>
      🥇 {randomRoleCount}/{chartsData.length} 🥈 {paradoxRoleCount}/{chartsData.length}
    </div>
    <div className="mdui-textfield" style={{textAlign: 'left', paddingTop: 0}}>
      <i className="mdui-icon material-icons">search</i>
      <input className="mdui-textfield-input" onChange={e => {
        console.log(e.target.value)
        setData(filterDataByInputVal(e.target.value, baseData, aliasData))
      }} placeholder={i18n.get('inputTip')}/>
    </div>
    <div style={{height: 'calc(100% - 80px)', overflow: "auto"}}>
      <div className="mdui-panel" mdui-panel="{accordion: true}">
        {data.map((v: any) => {
          const index = v?.index;
          const pModeWin = !!paradoxModeRecord[v.name]
          const rModeWin = !!randomModeRecord[v.name]
          return <div className="mdui-panel-item" key={index}>
            <div
              className="mdui-panel-item-header"
            >#{index} {v.name} {rModeWin && '🥇'}{pModeWin && '🥈'}
              <span style={{marginLeft: 'auto'}}><i
                className="mdui-icon material-icons panel-dync-icon">arrow_drop_down</i></span>
            </div>
            <div className="mdui-panel-item-body">
              <ul className="mdui-list mdui-list-dense">
                <li className="mdui-list-item mdui-ripple">{i18n.get('rarity')}: {1 + v.rarity}</li>
                <li className="mdui-list-item mdui-ripple">{i18n.get('camp')}: {v.team?.join(',')}</li>
                <li className="mdui-list-item mdui-ripple">{i18n.get('className')}: {v.className?.join('-')}</li>
                <li className="mdui-list-item mdui-ripple">{i18n.get('race')}: {v.race ? v.race : "/"}</li>
                <li className="mdui-list-item mdui-ripple">{i18n.get('painter')}: {v.painter}</li>
                {randomModeRecord[v.name] && <>
                    <li className="mdui-subheader">🥇{i18n.get('randomMode')}</li>
                    <li className="mdui-list-item mdui-ripple">{i18n.get("roleWinTimes")}{randomModeRecord[v.name].winTime}</li>
                    <li className="mdui-list-item mdui-ripple">{i18n.get("minWinTimes")}{randomModeRecord[v.name].cost}</li>
                </>}
                {paradoxModeRecord[v.name] && <>
                    <li className="mdui-subheader">🥈{i18n.get('paradoxMode')}</li>
                    <li className="mdui-list-item mdui-ripple">{i18n.get("minWinTimes")}{paradoxModeRecord[v.name]}</li>
                </>
                }
              </ul>
            </div>
          </div>
        })}
      </div>
    </div>

  </>;
}
export default Guide
