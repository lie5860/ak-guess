import React from "react";
import {MAIN_KEY, TYPES} from "../const";
import {AppCtx} from "../locales/AppCtx";

export const ChartInfoLink = ({chart}: { chart: Character }) => {
  const {i18n} = React.useContext(AppCtx)
  const {name, rarity, team, className, race, painter} = chart
  return <div className="tooltip" onClick={() => {
    window?.mduiModal?.open({
      title: i18n.get('info'),
      message: <div>
        <div><strong>{i18n.get('chartsName')}:</strong>{name}</div>
        <div><strong>{i18n.get('rarity')}:</strong>{1 + rarity}</div>
        <div><strong>{i18n.get('camp')}:</strong>{team?.join(',')}</div>
        <div><strong>{i18n.get('className')}:</strong>{className?.join('-')}</div>
        <div><strong>{i18n.get('race')}:</strong>{race}</div>
        <div><strong>{i18n.get('painter')}:</strong>{painter}</div>
      </div>,
      useCloseIcon: true
    })
  }}>
    {chart?.[MAIN_KEY]}
  </div>
}
const GuessItem = ({data}: { data: any[] }) => {
  const {i18n} = React.useContext(AppCtx)
  return <div className={'guesses'}>
    <div className="row">
      {TYPES.map(({label, i18nKey}) => <div className='column' key={label}>
        <span className={'title'}>{i18n.get(i18nKey)}</span></div>)}
    </div>
    {data.map((v: any, index: number) => {
      return <div className="row" key={index}>
        {TYPES.map(({key, type}) => {
          if (key === 'guess') {
            return <div className='column' key={key}>
              <ChartInfoLink chart={v.guess}/>
            </div>
          }
          return <div className='column' key={key}>
            <div className={`emoji ${v[key]}`}/>
          </div>
        })}
      </div>
    })}
  </div>
}
export default GuessItem;
