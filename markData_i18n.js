const fs = require('fs')
const path = require('path')
const {afterDealData, getGameDataByLangAndName} = require("./config.ts");
const jsonList = ['character_table', 'char_patch_table', 'uniequip_table', 'handbook_team_table',
    'handbook_info_table', 'skin_table']

const serversDict = {
    'zh_CN': {raceName: '【种族】'},
    'en_US': {raceName: '[Race]'},
    'ja_JP': {raceName: '【種族】'},
    'ko_KR': {raceName: '[종족]'}
};

const [_runer, _path, pass, needUpdate] = process.argv;
// 需要处理错别字的种族
const fixRaceData = {
    'zh_CN': [],
    'en_US': [["Phidia", "Pythia"]],
    'ja_JP': [],
    'ko_KR': []
};

function writeFileByUser(filePath, ...rest) {
    if (fs.existsSync(filePath)) {
    } else {
        mkdir(filePath);
    }
    fs.writeFileSync(filePath, ...rest)
}

function mkdir(filePath) {
    const dirCache = {};
    const arr = filePath.split('\\');
    let dir = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (!dirCache[dir] && !fs.existsSync(dir)) {
            dirCache[dir] = true;
            fs.mkdirSync(dir);
        }
        dir = dir + '/' + arr[i];
    }
    fs.writeFileSync(filePath, '')
}

function convertText(str) {
    // 统一把平假名转换成片假名
    return str.replace(/べ/g, 'ベ').replace(/へ/g, 'ヘ').replace(/ぺ/g, 'ペ');
}

const writeJsonByLangAndName = async (language, jsonName) => {
    const res = await getGameDataByLangAndName(language, jsonName);
    const file = path.resolve(__dirname, `./data/${language}/${jsonName}.json`)
    // 异步写入数据到文件
    writeFileByUser(file, JSON.stringify(res.data), {encoding: 'utf8'})
}
const main = async () => {
    // 这是一个开关 todo
    if (needUpdate === 'true') {
        const queryList = []
        Object.keys(serversDict).map(lang => jsonList.map(jsonName => queryList.push([lang, jsonName])))
        for (let i = 0; i < queryList.length; i++) {
            const [lang, jsonName] = queryList[i];
            
            await writeJsonByLangAndName(lang, jsonName);
        }
    }
    // 台服没找到文件，模组还没实装？
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
        if (chapterData.characters != null) {
            // 兼容[key-value]的数据
            let characters = {}
            for (const data of chapterData.characters) {
                characters[data.key] = data.value;
            }
            chapterData = characters;
        }

        // 升变数据
        chapterExtend = require(`./data/${server}/char_patch_table.json`)
        // 模组数据，主要用来拿子职业
        uniequip = require(`./data/${server}/uniequip_table.json`)
        // 阵营信息
        team = require(`./data/${server}/handbook_team_table.json`)
        // 档案信息，主要拿种族
        handbook = require(`./data/${server}/handbook_info_table.json`)
        if (Array.isArray(handbook.handbookDict)) {
            // 兼容档案为[key-value]的数据
            let handbookDict = {}
            for (const data of handbook.handbookDict) {
                handbookDict[data.key] = data.value;
            }
            handbook = handbookDict;
        } else {
            handbook = handbook.handbookDict;
        }
        // 皮肤信息，主要拿默认皮的画师
        skin = require(`./data/${server}/skin_table.json`)

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
    const loadChapterData = (k, v, server, isPatch) => {
        if (v.displayNumber == null) {
            // 非正常干员，跳过
            return null;
        }
        let rarity = null;
        if (v.rarity != null) {
            if (isNaN(v.rarity)) {
                rarity = parseInt(v.rarity.substring("TIER_".length)) - 1;
            } else {
                rarity = v.rarity;
            }
        }
        let chapter = {
            className: [profession[v.profession], uniequip.subProfDict[v.subProfessionId].subProfessionName],
            name: v.name.trim(),
            en: v.appellation.trim(),
            race: "",
            rarity: Number(rarity),
            key: k
        };
        let tempTeam = [];
        if (v.teamId !== undefined && v.teamId !== null) {
            tempTeam.push(team[v.teamId].powerName);
        }
        if (v.groupId !== undefined && v.groupId !== null) {
            tempTeam.push(team[v.groupId].powerName);
        }
        if (v.nationId !== undefined && v.nationId !== null) {
            tempTeam.push(team[v.nationId].powerName);
        }
        chapter.team = [...new Set(tempTeam.join('-').replace('−', '-').split('-').filter(v => v))];
        if (isPatch) {
            chapter.name += "(" + profession[v.profession] + ")";
            let r = patchDefault[k];
            let sk = skin.charSkins[skin.buildinPatchMap[r][k]];
            k = r;
            chapter.painter = sk?.displaySkin?.drawerName || sk?.displaySkin?.drawerList[0];
        } else {
            let sk = skin.charSkins[skin.buildinEvolveMap[k][0]];
            chapter.painter = sk?.displaySkin?.drawerName || sk?.displaySkin?.drawerList[0];
        }
        // 种族信息从档案中解析对应文本
        let profile = handbook[k];
        if (profile == null) {
            
            return null;
        }
        let storyText = profile.storyTextAudio[0].stories[0].storyText;
        const raceStr = serversDict[server]?.raceName;
        let raceIdx = storyText.indexOf(raceStr);
        if (raceIdx >= 0) {
            let race = storyText.substring(raceIdx + raceStr.length).trim();
            race = race.substring(0, race.indexOf("\n")).trim();
            race = convertText(race);
            chapter.race = race.split("/");
            if (fixRaceData[server].length > 0) {
                // 特殊处理对应服务器的种族错别字
                for (var i = 0; i < chapter.race.length; ++i) {
                    for (const fixData of fixRaceData[server]) {
                        for (var j = 0; j < fixData.length; ++j) {
                            if (chapter.race[i] == fixData[j]) {
                                chapter.race[i] = fixData.join("/");
                            }
                        }
                    }
                }
            }
        }
        return chapter;
    }

    for (let server of Object.keys(serversDict)) {
        loadData(server);
        const chartsData = [];
        for (const k of Object.keys(chapterData)) {
            let v = chapterData[k];
            chapter = loadChapterData(k, v, server, false);
            if (chapter !== null) {
                chartsData.push(chapter);
            }
        }
        // 升变
        for (const k of Object.keys(chapterExtend.patchChars)) {
            let v = chapterExtend.patchChars[k];
            chapter = loadChapterData(k, v, server, true);
            if (chapter !== null) {
                chartsData.push(chapter);
            }
        }
        // 写入id-index列表
        const chapterList = require(`./data/${server}/character_list.json`)
        const allCharacterkeys = chartsData.map(({key}) => key);
        let idIndexList = chapterList.list;
        if (allCharacterkeys.length > chapterList.list.length) {
            const newChapterList = allCharacterkeys.filter(v => chapterList.list.indexOf(v) === -1);
            const file = path.resolve(__dirname, `./data/${server}/character_list.json`)
            idIndexList = [...chapterList.list, ...newChapterList]
            writeFileByUser(file, JSON.stringify({list: idIndexList}), {encoding: 'utf8'})
        }
        chartsData.sort((v1, v2) => {
            const key1 = v1.key;
            const key2 = v2.key;
            const index1 = idIndexList.indexOf(key1);
            const index2 = idIndexList.indexOf(key2);
            return index1 - index2;
        })
        let file = path.resolve(__dirname, `./src/data/dealData/dealData_${server}.json`)
        // 异步写入数据到文件
        fs.writeFileSync(file, JSON.stringify(chartsData, null, 4), {encoding: 'utf8'})

        afterDealData({chartsData, server, pass})
        
    }

}

main()
