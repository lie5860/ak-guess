import { MachineOptions } from 'xstate';
import { GameContext, GameEvent } from './gameMachine';
import { gameServices } from './gameServices';
import { loadRecordData, saveRecordData } from '../component/History';
import { localStorageGet, localStorageSet, localStorageRemove } from '../locales/I18nWrap';
import { 
  randomGameGiveUp, 
  paradoxGameGiveUp 
} from '../server';
import { RANDOM_MODE, PARADOX_MODE, STORAGE, PARADOX_FIELDS, RESULT, DEFAULT_TRY_TIMES as DEFAULT_TRY_TIMES_CONST } from '../const';

export const gameMachineConfig: Partial<MachineOptions<GameContext, GameEvent>> = {
  services: gameServices,
  
  actions: {
    handleGameOver: (context: GameContext) => {
      const { mode, data, answer, lang, chartNameToIndexDict, isGiveUp } = context;
      
      if (isGiveUp) {
        // Handle give up logic
        let record = loadRecordData(lang);
        
        if (mode === RANDOM_MODE) {
          const { randomAnswerKey } = context;
          randomGameGiveUp(lang, {
            answer: randomAnswerKey,
            inputArray: data.map(({ guess }) => ({
              index: chartNameToIndexDict?.[guess?.name],
              name: guess?.name,
            })),
          });
          
          record[mode].straightWins = 0;
          record[mode].playTimes += 1;
          record[mode].totalTryTimes += data.length;
          saveRecordData(lang, record);
          
          localStorageSet(lang, STORAGE.GIVE_UP, 'true');
          
        } else if (mode === PARADOX_MODE) {
          const name = answer?.name;
          paradoxGameGiveUp(lang, {
            answer: chartNameToIndexDict[name],
            inputArray: data.map(({ guess }) => ({
              index: chartNameToIndexDict?.[guess?.name],
              name: guess?.name,
            })),
          });
          
          record[mode].playTimes += 1;
          record[mode].straightWins = 0;
          // 计入本局尝试次数
          record[mode].totalTryTimes += (data?.length || 0);
          saveRecordData(lang, record);
          
          const saveData = (key: string, value: any) => {
            const paradoxData = JSON.parse(localStorage.getItem(`${lang}-${STORAGE.PARADOX_DATA}`) || '{}');
            paradoxData[key] = value;
            localStorageSet(lang, STORAGE.PARADOX_DATA, JSON.stringify(paradoxData));
          };
          saveData(PARADOX_FIELDS.GIVE_UP, 'true');
        }
      }
    },
    
    clearRandomGameData: (context: GameContext) => {
      const { lang } = context;
      // 清除随机模式的游戏数据，强制创建新游戏
      localStorageSet(lang, STORAGE.RANDOM_DATA, JSON.stringify([]));
      localStorageSet(lang, STORAGE.GIVE_UP, 'false');
      // 清除旧答案键，强制生成新答案
      localStorageRemove(lang, STORAGE.RANDOM_ANSWER_KEY);
    },
    
    clearParadoxGameData: (context: GameContext) => {
      const { lang } = context;
      // 清除悖论模式的游戏数据，强制创建新游戏
      const saveData = (key: string, value: any) => {
        const paradoxData = JSON.parse(localStorageGet(lang, STORAGE.PARADOX_DATA) || '{}');
        paradoxData[key] = value;
        localStorageSet(lang, STORAGE.PARADOX_DATA, JSON.stringify(paradoxData));
      };
      
      saveData(PARADOX_FIELDS.GIVE_UP, 'false');
      saveData(PARADOX_FIELDS.DATA, []);
      // 清除 restList 来强制重新初始化
      localStorageRemove(lang, STORAGE.PARADOX_DATA);
    },
  },
  
  guards: {
    isWin: (context: GameContext) => {
      const { data, answer, mode } = context;
      if (!data.length || !answer) return false;
      
      if (mode === PARADOX_MODE) {
        const lastGuess = data[data.length - 1];
        const { restList } = context;
        return (restList.length === 1 && 
          lastGuess?.guess?.name === answer.name) ||
          Object.values(lastGuess || {}).every(v => v === RESULT.CORRECT);
      }
      
      return data[data.length - 1]?.guess?.name === answer.name;
    },
    
    isGameOver: (context: GameContext) => {
      const { data, mode, isGiveUp } = context;
      
      if (isGiveUp) return true;
      
      if (mode === PARADOX_MODE) {
        return context.restList?.length === 1 || 
               Object.values(data[data.length - 1] || {}).every(v => v === RESULT.CORRECT);
      }
      
      const DEFAULT_TRY_TIMES = DEFAULT_TRY_TIMES_CONST; // unify
      return data.length >= DEFAULT_TRY_TIMES || 
             (data.length > 0 && data[data.length - 1]?.guess?.name === context.answer?.name);
    },
  },
};