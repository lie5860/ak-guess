import {chartsData, defaultTryTimes, updateData} from "../const";
import {AppCtx} from '../locales/AppCtx';
import {React} from "../global";

const Help = ({updateDate = 'emmm'}) => {
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
      <span>{i18n.get('helpWrongDetail', null, true)}</span>
      <hr/>
      {i18n.get('helpDataSource')}<br/>{i18n.get('helpUpdateTime', {updateDate: updateDate})}<br/>{i18n.get('helpNum', {num: chartsData.length})}
    </p>
  </>
}
export default Help
