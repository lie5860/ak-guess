// https://prts.wiki/w/%E5%B1%9E%E6%80%A7:%E5%AD%90%E8%81%8C%E4%B8%9A
//var items = document.getElementsByClassName("smw-table-row value-row");
// var data = {};
// for (var i = 0; i < items.length; ++i) {
//   var line = document.getElementsByClassName("smw-table-row value-row")[i];
//   var name = line.getElementsByTagName("a")[0].innerText;
//   var type = line.getElementsByClassName("smwprops")[0].innerText;
//   type = type.substring(0, type.length-1).trim(); data[name] = type;
// }
// console.log(JSON.stringify(data));
// 子职业数据 通过以上网址和脚本获得
const subProfession =  require('./subProfession.json')

// https://prts.wiki/w/%E5%B1%9E%E6%80%A7:%E7%94%BB%E5%B8%88
// 画师数据 通过属性：画师和脚本获得（需要去掉皮肤，if (name.indexOf("skin") != -1) continue;
const painter =  require('./painter.json')

// https://prts.wiki/w/%E5%B9%B2%E5%91%98%E4%B8%80%E8%A7%88 干员数据
const prtsData = require('./prtsData.json')

module.exports = {
    subProfession,
    prtsData,
    painter
}
