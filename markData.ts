const {afterDealData} = require("./config.ts");

const fs = require('fs')
const path = require('path')
const {prtsData, subProfession, painter} = require('./src/data/index.ts')
const time1 = +new Date();
const chartsData = prtsData.map((v) => {
  return {
    className: [v.class, subProfession[v.cn]],
    name: v.cn.trim(),
    en: v.en.trim(),
    team: [...new Set([v.camp, v.nation].join('-').split('-').filter(v=>v))],
    race: v.race,
    rarity: Number(v.rarity),
    painter: painter[v.cn]
  }
})
let file = path.resolve(__dirname, './src/data/dealData.json')
// 异步写入数据到文件
fs.writeFileSync(file, JSON.stringify(chartsData, null, 4), {encoding: 'utf8'})

afterDealData({chartsData})
console.log(`生成数据完成 耗时 ${new Date().valueOf() - time1}ms`)
