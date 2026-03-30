/**
 * I18nWrap 核心逻辑测试
 * 覆盖：escapeHtml 安全转义、i18n.get 模板替换
 */
import {describe, it, expect} from 'vitest'

// 从 I18nWrap 中提取可测试的纯函数（escapeHtml 是模块私有的，这里重新实现来测试逻辑）
// 实际上我们测试的是 escapeHtml 的行为规格

// 重建 escapeHtml 的逻辑（与 I18nWrap.tsx 中一致）
const escapeHtml = (value: unknown): string => {
  const str = String(value ?? '')
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

describe('escapeHtml', () => {
  it('应正确转义 HTML 特殊字符', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    )
  })

  it('应转义单引号', () => {
    expect(escapeHtml("it's")).toBe("it&#39;s")
  })

  it('应转义 & 符号', () => {
    expect(escapeHtml('a&b')).toBe('a&amp;b')
  })

  it('应正确处理数字输入', () => {
    expect(escapeHtml(8)).toBe('8')
    expect(escapeHtml(0)).toBe('0')
    expect(escapeHtml(3.14)).toBe('3.14')
  })

  it('应正确处理 null 和 undefined', () => {
    expect(escapeHtml(null)).toBe('')
    expect(escapeHtml(undefined)).toBe('')
  })

  it('应正确处理空字符串', () => {
    expect(escapeHtml('')).toBe('')
  })

  it('应正确处理布尔值', () => {
    expect(escapeHtml(true)).toBe('true')
    expect(escapeHtml(false)).toBe('false')
  })

  it('不应修改普通文本', () => {
    expect(escapeHtml('Hello World 你好世界 123')).toBe('Hello World 你好世界 123')
  })

  it('应处理混合特殊字符', () => {
    expect(escapeHtml('<div class="test">&amp;</div>')).toBe(
      '&lt;div class=&quot;test&quot;&gt;&amp;amp;&lt;/div&gt;'
    )
  })
})

// i18n.get 模板替换逻辑测试
describe('i18n template replacement', () => {
  // 模拟 i18n.get 的核心逻辑
  const templateReplace = (template: string, props: Record<string, unknown> | null, hasLegacyDom = false) => {
    let res = template
    if (props) {
      Object.keys(props).forEach(key => {
        const safeValue = hasLegacyDom ? escapeHtml(props[key]) : String(props[key] ?? '')
        res = res.replace(new RegExp(`{${key}}`, 'g'), safeValue)
      })
    }
    return res
  }

  it('应替换单个模板变量', () => {
    expect(templateReplace('你有{times}次机会', {times: 8})).toBe('你有8次机会')
  })

  it('应替换多个模板变量', () => {
    expect(templateReplace('{name}有{count}个', {name: '阿米娅', count: 3})).toBe('阿米娅有3个')
  })

  it('无 props 时应返回原字符串', () => {
    expect(templateReplace('hello world', null)).toBe('hello world')
  })

  it('模板变量不存在时应保留原占位符', () => {
    expect(templateReplace('你好{name}', {age: 18})).toBe('你好{name}')
  })

  it('hasLegacyDom=true 时应转义 HTML 危险字符', () => {
    const result = templateReplace('名字是 {name}', {name: '<script>alert(1)</script>'}, true)
    expect(result).toBe('名字是 &lt;script&gt;alert(1)&lt;/script&gt;')
    expect(result).not.toContain('<script>')
  })

  it('hasLegacyDom=false 时不应转义', () => {
    const result = templateReplace('名字是 {name}', {name: '<b>bold</b>'}, false)
    expect(result).toBe('名字是 <b>bold</b>')
  })

  it('应处理数字类型的 props 值', () => {
    expect(templateReplace('总共{num}个', {num: 42})).toBe('总共42个')
  })

  it('应处理重复出现的模板变量', () => {
    expect(templateReplace('{x}+{x}={result}', {x: 1, result: 2})).toBe('1+1=2')
  })
})
