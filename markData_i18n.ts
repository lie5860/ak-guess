const {afterDealData} = require("./config.ts");

// 台服没找到文件，模组还没实装？
const servers = {'zh-CN':'【种族】','en':'[Race]','ja':'【種族】','ko':'[종족]'};
const fs = require('fs')
const path = require('path')
var chapterData;
var chapterExtend;
var profession;
var uniequip;
var team;
var handbook;
var patchDefault;

const loadData = (server) => {
  /**
  * 从Kengxxiao/ArknightsGameData仓库中获取对应服务器目录的excel文件夹下同名文件
  */
  // 角色基本信息，里面包了召唤物和临时干员之类的，会自动跳过
  chapterData = require(`./data/${server}/character_table.json`) 
  // 升变数据
  chapterExtend = require(`./data/${server}/char_patch_table.json`) 
  // 模组数据，主要用来拿子职业
  uniequip = require(`./data/${server}/uniequip_table.json`) 
  // 阵营信息
  team=require(`./data/${server}/handbook_team_table.json`) 
  // 皮肤信息，主要拿默认皮的画师
  handbook=require(`./data/${server}/handbook_info_table.json`) 

  // 主职业信息没有文件描述，要自己编写，反正一次性工作
  profession = require(`./data/${server}/profession.json`)

  // 升变的角色需要原角色的ID（应该只有一个阿米娅，不过蛮写了），如果写死就不用引入chapterExtend了
  patchDefault = {};
  for (const data of Object.values(chapterExtend.infos)) {
    for (var j = 0; j < data.tmplIds.length; ++j) {
      patchDefault[data.tmplIds[j]] = data.default;
    }
  }
}

const time1 = +new Date();
const loadChapterData = (k,v,server,isPatch) => {
  if (v.displayNumber == null) {
    // 非正常干员，跳过
    return null;
  }
  let chapter = {
    className: [profession[v.profession], uniequip.subProfDict[v.subProfessionId].subProfessionName],
    name: v.name.trim(),
    en: v.appellation.trim(),
    race: "",
    rarity: Number(v.rarity)
  };
  let tempTeam = [];
  if (v.groupId !== null) {
    tempTeam.push(team[v.groupId].powerName);
  }
  if (v.nationId !== null) {
    tempTeam.push(team[v.nationId].powerName);
  }
  if (tempTeam.length ==0) {
    tempTeam.push(team[v.teamId].powerName);
  }
  chapter.team = tempTeam.join('-').split('-').filter(v=>v);
  if (isPatch) {
    chapter.name += "(" + profession[v.profession] +")";
    k = patchDefault[k]; 
    chapter.painter = handbook.handbookDict[k].drawName;
  } else {
    chapter.painter = handbook.handbookDict[k].drawName;
  }
  // 种族信息从档案中解析对应文本
  let storyText = handbook.handbookDict[k].storyTextAudio[0].stories[0].storyText;
  const raceStr = servers[server];
  let raceIdx = storyText.indexOf(raceStr);
  if (raceIdx>=0) {
    let race = storyText.substring(raceIdx+raceStr.length).trim();
    race = race.substring(0, race.indexOf("\n"));
    chapter.race = race.split("/");
  } 
  return chapter;
}

for (let server of Object.keys(servers)) {
  loadData(server);
  const chartsData = [];
  for (const k of Object.keys(chapterData)) {
    let v = chapterData[k];
    chapter = loadChapterData(k, v, server, false);
    if (chapter !== null) {
      chartsData.push(chapter);
    }
  };
  // 升变
  for (const k of Object.keys(chapterExtend.patchChars)) {
    let v = chapterExtend.patchChars[k];
    chapter = loadChapterData(k, v, server, true);
    if (chapter !== null) {
      chartsData.push(chapter);
    }
  };
  let file = path.resolve(__dirname, `./src/data/dealData_${server}.json`)
  // 异步写入数据到文件
  fs.writeFileSync(file, JSON.stringify(chartsData, null, 4), {encoding: 'utf8'})

  afterDealData({chartsData, server})
  console.log(`生成${server}数据完成 耗时 ${new Date().valueOf() - time1}ms`)
}
