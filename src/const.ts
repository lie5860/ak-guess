import dealData from './data/dealData.json'

export const TYPES = [
  {label: '稀有度', key: 'rarity', type: 'number'},
  {label: '阵营', key: 'team', type: 'array'},
  {label: '职业', key: 'className', type: 'array'},
  {label: '种族', key: 'race', type: 'string'},
  {label: '画师', key: 'painter', type: 'string'},
  {label: '名称', key: 'guess'},
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