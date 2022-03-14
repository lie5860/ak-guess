import {chartsData, defaultTryTimes, updateData} from "../const";
import {React} from "../global";

const Help = ({updateDate = 'emmm', firstOpen = false}) => {
  return <>
    <p>
      <span className='title' style={{lineHeight: '20px'}}>小刻也能学会的游戏规则！</span>
    </p>
    <hr/>
    <p>最多可以尝试{defaultTryTimes}次，找出稀有度/阵营/职业/种族/画师都一模一样的干员！
      <ul className="tipList">
        <li>
          <div className="emoji correct"/>
          猜测的干员该属性和神秘干员完全一样！太棒了！
        </li>
        <li>
          <div className="emoji wrong"/>
          猜测的干员该属性和神秘干员完全不一样！难搞哦！
        </li>
        <li>
          <div className="emoji down"/>
          猜测的干员稀有度比神秘干员高！试着往低星猜吧！
        </li>
        <li>
          <div className="emoji up"/>
          猜测的干员稀有度比神秘干员低！试着往高星猜吧！
        </li>
        <li>
          <div className="emoji wrongpos"/>
          猜测的干员该属性和神秘干员部分一样！再加把劲！
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
