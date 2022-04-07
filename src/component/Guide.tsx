import {React} from "../global";
import {AppCtx} from '../locales/AppCtx';
import {localStorageGet} from "../locales/I18nWrap";

const Guide = () => {
  const {i18n, chartsData} = React.useContext(AppCtx);
  const record = JSON.parse(localStorageGet(i18n.language, 'record') || '{}')
  const {paradoxModeRecord = {}, randomModeRecord = {}} = record
  var randomRoleCount = Object.keys(randomModeRecord).length; // 举个栗子，随机模式下猜中过哪些干员
  var paradoxRoleCount = Object.keys(paradoxModeRecord).length; // 举个栗子，悖论模拟下猜中过哪些干员
  React.useEffect(() => {
    window.mdui.mutation()
  }, [])

  return <>
    <div style={{padding: 10}}>
      🥇 {randomRoleCount}/{chartsData.length} 🥈 {paradoxRoleCount}/{chartsData.length}
    </div>
    <div style={{height: 'calc(100% - 50px)', overflow: "auto"}}>
      <div className="mdui-panel" mdui-panel="{accordion: true}">
        {[...chartsData].reverse().map((v: any, index: number) => {
          const pModeWin = !!paradoxModeRecord[v.name]
          const rModeWin = !!randomModeRecord[v.name]
          return <div className="mdui-panel-item" key={index}>
            <div
              className="mdui-panel-item-header"
            >#{chartsData.length - index} {v.name} {rModeWin && '🥇'}{pModeWin && '🥈'}
              <span style={{marginLeft: 'auto'}}><i className="mdui-icon material-icons panel-dync-icon">arrow_drop_down</i></span>
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
                    <li className="mdui-list-item mdui-ripple">累积猜中次数：{randomModeRecord[v.name].winTime}</li>
                    <li className="mdui-list-item mdui-ripple">最少猜测次数：{randomModeRecord[v.name].cost}</li>
                </>}
                {paradoxModeRecord[v.name] && <>
                    <li className="mdui-subheader">🥈{i18n.get('paradoxMode')}</li>
                    <li className="mdui-list-item mdui-ripple">最少猜测次数：{paradoxModeRecord[v.name]}</li>
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
