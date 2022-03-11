import dealData from './data/dealData.json'

export const MAIN_KEY = 'name'
export const GAME_NAME = '干员猜猜乐'
export const TYPES = [
  {label: '稀有度', i18nKey: 'rarity', key: 'rarity', type: 'number'},
  {label: '阵营', i18nKey: 'camp', key: 'team', type: 'array'},
  {label: '职业', i18nKey: 'className', key: 'className', type: 'array'},
  {label: '种族', i18nKey: 'race', key: 'race', type: 'array'},
  {label: '画师', i18nKey: 'painter', key: 'painter', type: 'string'},
  {label: '干员', i18nKey: 'chartsName', key: 'guess'},
]
export const VAL_DICT = {
  'correct': '🟩',
  'wrong': '🟥',
  'wrongpos': '🟨',
  'up': '🔼',
  'down': '🔽',
}
export const chartsData = dealData;
export const defaultTryTimes = 8;
export const updateData = '2022-3-5';

export const githubUrl = 'https://github.com/lie5860/ak-guess/issues'
// 反馈问卷链接
export const questionnaireUrl = 'https://www.wjx.top/vj/QgfS7Yd.aspx'
