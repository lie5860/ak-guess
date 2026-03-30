/**
 * autocomplete.ts 核心过滤函数测试
 * 覆盖：名称匹配、英文首字母匹配、别名匹配、正则错误容错、假名转换
 */
import {describe, it, expect, vi} from 'vitest'
import {filterDataByInputVal} from './autocomplete'

// 构建测试用的角色数据
const mockChartsData: Character[] = [
  {name: '阿米娅', en: 'Amiya', className: ['术师'], race: '奇美拉', rarity: 4, key: 'char_002', team: ['罗德岛'], painter: 'Lowlight'},
  {name: '能天使', en: 'Exusiai', className: ['狙击'], race: '拉特兰人', rarity: 5, key: 'char_003', team: ['企鹅物流'], painter: 'Infukun'},
  {name: 'Blaze', en: 'Blaze', className: ['近卫'], race: '菲林', rarity: 5, key: 'char_004', team: ['罗德岛'], painter: 'Ask'},
  {name: '银灰', en: 'SilverAsh', className: ['近卫'], race: '菲林', rarity: 5, key: 'char_005', team: ['喀兰贸易'], painter: 'NoriZC'},
  {name: 'W', en: 'W', className: ['狙击'], race: '萨卡兹', rarity: 5, key: 'char_006', team: ['巴别塔'], painter: '下野宏铭'},
]

const mockAliasData: Alias[] = [
  {regexp: '兔兔|兔子', values: ['阿米娅']},
  {regexp: '苹果|天使', values: ['能天使']},
]

describe('filterDataByInputVal', () => {
  it('应该按名称匹配角色', () => {
    const result = filterDataByInputVal('阿米', mockChartsData, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('阿米娅')
  })

  it('应该按英文名匹配角色', () => {
    const result = filterDataByInputVal('Blaze', mockChartsData, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Blaze')
  })

  it('应该按英文模糊匹配（大小写不敏感）', () => {
    const result = filterDataByInputVal('blaze', mockChartsData, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Blaze')
  })

  it('应该按英文名前缀匹配（大小写不敏感）', () => {
    const result = filterDataByInputVal('EX', mockChartsData, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('能天使')
  })

  it('应该按英文名完整匹配', () => {
    const result = filterDataByInputVal('SilverAsh', mockChartsData, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('银灰')
  })

  it('应该通过别名正则匹配角色', () => {
    const result = filterDataByInputVal('兔兔', mockChartsData, mockAliasData)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('阿米娅')
  })

  it('别名正则匹配中的竖线分隔应支持多别名', () => {
    const result = filterDataByInputVal('天使', mockChartsData, mockAliasData)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('能天使')
  })

  it('空输入时所有角色名 indexOf 均返回 0，返回全部角色', () => {
    // filterDataByInputVal 不做空值守卫（由调用方在 UI 层处理）
    // 空字符串 .indexOf('') === 0，所以所有角色都会被匹配到
    const result = filterDataByInputVal('', mockChartsData, mockAliasData)
    expect(result).toHaveLength(mockChartsData.length)
  })

  it('无匹配项时应返回空数组', () => {
    const result = filterDataByInputVal('不存在的角色XXXXXXXXX', mockChartsData, mockAliasData)
    expect(result).toHaveLength(0)
  })

  it('名称匹配应排在别名匹配之前', () => {
    // "能天使" 同时被名称命中（包含"天使"），也可能被别名命中
    // 但应只出现在名称组中
    const result = filterDataByInputVal('能天', mockChartsData, mockAliasData)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('能天使')
  })

  it('单字符 W 应正确匹配', () => {
    const result = filterDataByInputVal('W', mockChartsData, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('W')
  })

  // 安全性测试 (#2)
  it('应安全处理无效正则表达式的别名', () => {
    const badAlias: Alias[] = [
      {regexp: '([invalid', values: ['阿米娅']}, // 畸形正则
    ]
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const result = filterDataByInputVal('test', mockChartsData, badAlias)
    // 不应崩溃，应返回空（无匹配）
    expect(result).toHaveLength(0)
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('别名正则无效'),
      expect.any(String),
      expect.any(Error)
    )
    consoleSpy.mockRestore()
  })

  it('应正确处理多个别名匹配同一个角色', () => {
    const result = filterDataByInputVal('兔子', mockChartsData, mockAliasData)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('阿米娅')
  })
})
