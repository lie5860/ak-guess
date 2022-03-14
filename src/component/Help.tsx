import {chartsData, defaultTryTimes, updateData} from "../const";
import {AppCtx} from '../locales/AppCtx';
import {React} from "../global";

const Help = ({updateDate = 'emmm', firstOpen = false}) => {
  const {i18n} = React.useContext(AppCtx);
  return <>
    <p>
      <span className='title' style={{lineHeight: '20px'}}>{i18n.get('helpTitle')}</span>
    </p>
    <hr/>
    <p>{i18n.get('helpDesc', {times: defaultTryTimes})}
      <ul className="tipList">
        <li>
          <div className="emoji correct"/>
          {i18n.get('helpCorrect')}
        </li>
        <li>
          <div className="emoji wrong"/>
          {i18n.get('helpWrong')}
        </li>
        <li>
          <div className="emoji down"/>
          {i18n.get('helpDown')}
        </li>
        <li>
          <div className="emoji up"/>
          {i18n.get('helpUp')}
        </li>
        <li>
          <div className="emoji wrongpos"/>
          {i18n.get('helpWrongPos')}
        </li>
      </ul>
      <span>干员所属的阵营拆成了多级维度，<br/>和出身地无关，请查阅<strong style={{color:'rgb(255, 204, 76)'}}>关系网</strong>！<br/>职业也区分了主职业和分支职业！<br/>点击干员姓名可以看到详情！</span>
      <hr/>
      {firstOpen && <>
          这么多记不住怎么办？<br/><strong style={{color:'rgb(255, 204, 76)'}}>小刻学堂</strong>随时开启！
          <hr/>
      </>}
      游戏数据来自PRTS！<br/>最近更新时间是{updateDate}！<br/>目前有{chartsData.length}名干员（包含异格和升变）
    </p>
  </>
}
export default Help
