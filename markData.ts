const fs = require('fs')
const path = require('path')
const {prtsData, subProfession, painter} = require('./src/data/index.ts')
const chartsData = prtsData.map(v => {
  return {
    className: [v.class, subProfession[v.cn]],
    name: v.cn,
    team: [...new Set([v.camp, v.nation].join('-').split('-'))],
    race: v.race.join('/'),
    rarity: Number(v.rarity),
    painter: painter[v.cn]
  }
})
let file = path.resolve(__dirname, './src/data/dealData.json')
// 异步写入数据到文件
fs.writeFileSync(file, JSON.stringify(chartsData, null, 4), {encoding: 'utf8'})
console.log('生成数据完成')
