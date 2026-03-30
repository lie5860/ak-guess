/**
 * store.tsx 公共辅助函数测试
 * 覆盖：updateRecordOnWin、updateRecordOnLose、buildInputArray
 */
import {describe, it, expect} from 'vitest'

// 从 store.tsx 中提取的公共函数（测试其行为规格）
// 因为这些是模块内部函数，这里重建来做单元测试

const MAIN_KEY = 'name'

const updateRecordOnWin = (
  record: any,
  mode: string,
  newData: any[],
  answerName: string,
  rolesUpdateFn?: (record: any) => void
) => {
  record[mode].winTimes += 1
  record[mode].winTryTimes += newData.length
  record[mode].straightWins += 1
  if (record[mode].straightWins > record[mode].maxStraightWins) {
    record[mode].maxStraightWins = record[mode].straightWins
  }
  if (!record[mode].minWinTimes || record[mode].minWinTimes > newData.length) {
    record[mode].minWinTimes = newData.length
  }
  if (rolesUpdateFn) {
    rolesUpdateFn(record)
  } else {
    if (!record[mode].roles[answerName]) {
      record[mode].roles[answerName] = {cost: newData.length, winTime: 1}
    } else {
      const oldCost = record[mode].roles[answerName]?.cost || 0
      record[mode].roles[answerName] = {
        cost: oldCost > newData.length ? newData.length : oldCost,
        winTime: (record[mode].roles[answerName]?.winTime || 0) + 1
      }
    }
  }
}

const updateRecordOnLose = (record: any, mode: string) => {
  record[mode].straightWins = 0
}

const buildInputArray = (data: any[], chartNameToIndexDict: Record<string, number>) => {
  return data.map(({guess}: any) => ({
    index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
    name: guess?.[MAIN_KEY]
  }))
}

const createEmptyRecord = (mode: string) => ({
  [mode]: {
    winTimes: 0,
    winTryTimes: 0,
    straightWins: 0,
    maxStraightWins: 0,
    minWinTimes: 0,
    roles: {} as Record<string, any>
  }
})

describe('updateRecordOnWin', () => {
  it('应增加胜利次数和尝试次数', () => {
    const record = createEmptyRecord('daily')
    const data = [{guess: {name: '阿米娅'}}, {guess: {name: '能天使'}}, {guess: {name: '银灰'}}]
    updateRecordOnWin(record, 'daily', data, '银灰')
    expect(record.daily.winTimes).toBe(1)
    expect(record.daily.winTryTimes).toBe(3)
  })

  it('应更新连胜记录', () => {
    const record = createEmptyRecord('daily')
    const data1 = [{guess: {name: '阿米娅'}}]
    updateRecordOnWin(record, 'daily', data1, '阿米娅')
    expect(record.daily.straightWins).toBe(1)
    expect(record.daily.maxStraightWins).toBe(1)

    const data2 = [{guess: {name: '能天使'}}, {guess: {name: '银灰'}}]
    updateRecordOnWin(record, 'daily', data2, '银灰')
    expect(record.daily.straightWins).toBe(2)
    expect(record.daily.maxStraightWins).toBe(2)
  })

  it('应跟踪最少胜利次数', () => {
    const record = createEmptyRecord('daily')
    const data5 = Array.from({length: 5}, (_, i) => ({guess: {name: `角色${i}`}}))
    updateRecordOnWin(record, 'daily', data5, '角色4')
    expect(record.daily.minWinTimes).toBe(5)

    const data2 = [{guess: {name: '阿米娅'}}, {guess: {name: '银灰'}}]
    updateRecordOnWin(record, 'daily', data2, '银灰')
    expect(record.daily.minWinTimes).toBe(2) // 应被更新为更小的值
  })

  it('应记录图鉴数据', () => {
    const record = createEmptyRecord('daily')
    const data = [{guess: {name: '阿米娅'}}]
    updateRecordOnWin(record, 'daily', data, '阿米娅')
    expect(record.daily.roles['阿米娅']).toEqual({cost: 1, winTime: 1})
  })

  it('重复猜到同一角色应取最小 cost', () => {
    const record = createEmptyRecord('daily')
    const data3 = Array.from({length: 3}, (_, i) => ({guess: {name: `角色${i}`}}))
    updateRecordOnWin(record, 'daily', data3, '角色2')
    expect(record.daily.roles['角色2'].cost).toBe(3)

    const data1 = [{guess: {name: '角色2'}}]
    updateRecordOnWin(record, 'daily', data1, '角色2')
    expect(record.daily.roles['角色2'].cost).toBe(1) // 应取更小值
    expect(record.daily.roles['角色2'].winTime).toBe(2)
  })

  it('应支持自定义 rolesUpdateFn', () => {
    const record = createEmptyRecord('paradox')
    const data = [{guess: {name: '阿米娅'}}]
    const customFn = (rec: any) => {
      rec.paradox.roles['custom'] = {special: true}
    }
    updateRecordOnWin(record, 'paradox', data, '阿米娅', customFn)
    expect(record.paradox.roles['custom']).toEqual({special: true})
    expect(record.paradox.roles['阿米娅']).toBeUndefined() // 默认逻辑不执行
  })
})

describe('updateRecordOnLose', () => {
  it('应重置连胜记录', () => {
    const record = createEmptyRecord('daily')
    record.daily.straightWins = 5
    updateRecordOnLose(record, 'daily')
    expect(record.daily.straightWins).toBe(0)
  })

  it('应保留其他数据不变', () => {
    const record = createEmptyRecord('daily')
    record.daily.winTimes = 10
    record.daily.maxStraightWins = 5
    updateRecordOnLose(record, 'daily')
    expect(record.daily.winTimes).toBe(10) // 不变
    expect(record.daily.maxStraightWins).toBe(5) // 不变
  })
})

describe('buildInputArray', () => {
  it('应将 GuessItem[] 转为埋点数组', () => {
    const data = [
      {guess: {name: '阿米娅'}},
      {guess: {name: '能天使'}},
    ]
    const dict = {'阿米娅': 0, '能天使': 1, '银灰': 2}
    const result = buildInputArray(data, dict)
    expect(result).toEqual([
      {index: 0, name: '阿米娅'},
      {index: 1, name: '能天使'},
    ])
  })

  it('角色不在字典中时 index 应为 undefined', () => {
    const data = [{guess: {name: '未知角色'}}]
    const dict = {'阿米娅': 0}
    const result = buildInputArray(data, dict)
    expect(result[0].index).toBeUndefined()
    expect(result[0].name).toBe('未知角色')
  })

  it('空数组应返回空数组', () => {
    expect(buildInputArray([], {})).toEqual([])
  })
})
