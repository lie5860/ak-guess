/// <reference path="../typings.d.ts" />
import { createMachine, assign } from 'xstate';
import { DAILY_MODE, RANDOM_MODE, PARADOX_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, EVENTS, COLUMNS } from '../const';

export interface GameContext {
  mode: string;
  data: any[];
  answer: any | null;
  answerKey: number;
  chartsData: any[];
  chartNameToIndexDict: { [key: string]: number };
  i18n: any;
  today: string;
  lang: string;
  isGiveUp: boolean;
  // Random mode specific
  randomAnswerKey: number;
  // Daily mode specific
  remoteAnswerKey: number;
  // Paradox mode specific
  restList: number[];
  error?: string;
}

export type GameEvent =
  | { type: typeof EVENTS.INIT; mode: string; chartsData: any[]; chartNameToIndexDict: any; i18n: any; lang: string }
  | { type: typeof EVENTS.SUBMIT_GUESS; guess: any }
  | { type: typeof EVENTS.NEW_GAME }
  | { type: typeof EVENTS.GIVE_UP }
  | { type: typeof EVENTS.GAME_OVER; data: any[] }
  | { type: 'SET_DAILY_DATA'; daily: number; server_date: string }
  | { type: typeof EVENTS.RETRY };

export const gameMachine = createMachine({
  id: 'game',
  initial: 'idle',
  context: {
    mode: RANDOM_MODE,
    data: [],
    answer: null,
    answerKey: -1,
    chartsData: [],
    chartNameToIndexDict: {},
    i18n: null,
    today: '',
    lang: 'zh_CN',
    isGiveUp: false,
    randomAnswerKey: -1,
    remoteAnswerKey: -1,
    restList: [],
    error: undefined,
  },
  // 允许在任意状态通过 INIT 事件重新选择模式并进入对应模式的初始化流程
  on: {
    INIT: {
      target: 'initializing',
      actions: assign({
        mode: (_: any, event: any) => event.mode,
        chartsData: (_: any, event: any) => event.chartsData,
        chartNameToIndexDict: (_: any, event: any) => event.chartNameToIndexDict,
        i18n: (_: any, event: any) => event.i18n,
        lang: (_: any, event: any) => event.lang,
        // 重置运行期态，由各自服务在 loading 阶段读取本地数据恢复
        data: () => [],
        isGiveUp: () => false,
        error: () => undefined,
      }),
    },
  },
  states: {
    // 空闲状态：等待初始化
    idle: {
      on: {
        INIT: {
          target: 'initializing',
          actions: assign({
            mode: (_: any, event: any) => event.mode,
            chartsData: (_: any, event: any) => event.chartsData,
            chartNameToIndexDict: (_: any, event: any) => event.chartNameToIndexDict,
            i18n: (_: any, event: any) => event.i18n,
            lang: (_: any, event: any) => event.lang,
          }),
        },
      },
    },
    // 初始化状态：根据模式分发到对应的模式状态
    initializing: {
      always: [
        {
          target: 'randomMode',
          cond: 'isRandomMode',
        },
        {
          target: 'dailyMode',
          cond: 'isDailyMode',
        },
        {
          target: 'paradoxMode',
          cond: 'isParadoxMode',
        },
      ],
    },
    // 随机模式：无限次游戏，可重新开始
    randomMode: {
      initial: 'loading',
      states: {
        // 加载中：加载随机游戏数据
        loading: {
          invoke: {
            id: 'loadRandomGame',
            src: 'loadRandomGame',
            onDone: [
              {
                target: 'ready',
                actions: assign({
                  data: (_: any, event: any) => event.data.data || [],
                  randomAnswerKey: (_: any, event: any) => event.data.answerKey,
                  answer: (context: any, event: any) => context.chartsData[event.data.answerKey],
                  isGiveUp: (_: any, event: any) => event.data.isGiveUp || false,
                }),
              },
            ],
            onError: {
              target: 'error',
              actions: assign({
                error: (_: any, event: any) => event.data.message,
              }),
            },
          },
        },
        // 就绪状态：根据历史数据决定游戏状态
        ready: {
          always: [
            {
              target: 'gameOver',
              cond: 'isRandomGameOver',
            },
            { target: 'notStarted', cond: 'isGameNotStarted' },
            { target: 'playing' },
          ],
          on: {
            SUBMIT_GUESS: { target: 'processing' },
          },
        },
        // 未开始：游戏尚未开始，等待首次猜测
        notStarted: {
          on: {
            SUBMIT_GUESS: { target: 'processing' },
          },
        },
        // 游戏中：正在进行游戏，可以提交猜测或放弃
        playing: {
          on: {
            SUBMIT_GUESS: {
              target: 'processing',
              actions: assign({
                data: (context, event) => {
                  // This will be handled in the service
                  return context.data;
                },
              }),
            },
            GIVE_UP: {
              target: 'gameOver',
              actions: assign({
                isGiveUp: () => true,
              }),
            },
          },
        },
        // 处理中：处理用户的猜测
        processing: {
          invoke: {
            id: 'processGuess',
            src: 'processRandomGuess',
            onDone: [
              {
                target: 'gameOver',
                cond: (_, event) => event.data.isGameOver,
                actions: assign({
                  data: (_, event) => event.data.newData,
                }),
              },
              {
                target: 'playing',
                actions: assign({
                  data: (_, event) => event.data.newData,
                }),
              },
            ],
            onError: {
              target: 'error',
              actions: assign({
                error: (_: any, event: any) => event.data.message,
              }),
            },
          },
        },
        // 游戏结束：游戏已结束，可以开始新游戏
        gameOver: {
          entry: 'handleGameOver',
          on: {
            NEW_GAME: {
              target: 'loading',
              actions: ['clearRandomGameData', assign({
                data: () => [],
                isGiveUp: () => false,
                error: () => undefined,
              })],
            },
          },
        },
        // 错误状态：发生错误，可以重试
        error: {
          on: {
            RETRY: {
              target: 'loading',
              actions: assign({
                error: () => undefined,
              }),
            },
          },
        },
      },
    },
    // 每日模式：每天一次的固定题目
    dailyMode: {
      initial: 'loading',
      states: {
        // 加载中：加载每日题目数据
        loading: {
          invoke: {
            id: 'loadDailyGame',
            src: 'loadDailyGame',
            onDone: {
              target: 'ready',
              actions: assign({
                remoteAnswerKey: (_, event) => event.data.daily,
                today: (_, event) => event.data.server_date,
                answer: (context, event) => context.chartsData[event.data.daily],
                data: (_, event) => event.data.data || [],
              }),
            },
            onError: {
              target: 'error',
              actions: assign({
                error: (_: any, event: any) => event.data.message,
              }),
            },
          },
        },
        // 就绪状态：判断游戏是否结束
        ready: {
          always: [
            {
              target: 'gameOver',
              cond: 'isDailyGameOver',
            },
            { target: 'playing' },
          ],
          on: {
            SUBMIT_GUESS: { target: 'processing' },
          },
        },
        // 游戏中：正在进行每日游戏
        playing: {
          on: {
            SUBMIT_GUESS: {
              target: 'processing',
            },
          },
        },
        // 处理中：处理每日游戏的猜测
        processing: {
          invoke: {
            id: 'processDailyGuess',
            src: 'processDailyGuess',
            onDone: [
              {
                target: 'gameOver',
                cond: (_, event) => event.data.isGameOver,
                actions: assign({
                  data: (_, event) => event.data.newData,
                }),
              },
              {
                target: 'playing',
                actions: assign({
                  data: (_, event) => event.data.newData,
                }),
              },
            ],
            onError: {
              target: 'error',
              actions: assign({
                error: (_: any, event: any) => event.data.message,
              }),
            },
          },
        },
        // 游戏结束：每日游戏结束，不可重新开始
        gameOver: {
          entry: 'handleGameOver',
          // 每日模式不支持 NEW_GAME，每天只能玩一次
        },
        // 错误状态：发生错误，可以重试
        error: {
          on: {
            RETRY: {
              target: 'loading',
              actions: assign({
                error: () => undefined,
              }),
            },
          },
        },
      },
    },
    // 悖论模式：动态变化答案的特殊模式
    paradoxMode: {
      initial: 'loading',
      states: {
        // 加载中：加载悖论游戏数据
        loading: {
          invoke: {
            id: 'loadParadoxGame',
            src: 'loadParadoxGame',
            onDone: [
              {
                target: 'ready',
                actions: assign({
                  data: (_, event) => event.data.data || [],
                  restList: (_, event) => event.data.restList || [],
                  answer: (context, event) => {
                    const restList = event.data.restList || [];
                    return restList.length > 0 ? context.chartsData[restList[0]] : null;
                  },
                  isGiveUp: (_, event) => event.data.isGiveUp || false,
                }),
              },
            ],
            onError: {
              target: 'error',
              actions: assign({
                error: (_: any, event: any) => event.data.message,
              }),
            },
          },
        },
        // 就绪状态：判断悖论游戏是否结束
        ready: {
          always: [
            {
              target: 'gameOver',
              cond: 'isParadoxGameOver',
            },
            { target: 'notStarted', cond: 'isGameNotStarted' },
            { target: 'playing' },
          ],
          on: {
            SUBMIT_GUESS: { target: 'processing' },
          },
        },
        // 未开始：悖论游戏尚未开始
        notStarted: {
          on: {
            SUBMIT_GUESS: { target: 'processing' },
            GIVE_UP: { target: 'gameOver', actions: assign({ isGiveUp: true }) },
          },
        },
        // 游戏中：正在进行悖论游戏
        playing: {
          on: {
            SUBMIT_GUESS: {
              target: 'processing',
            },
            GIVE_UP: {
              target: 'gameOver',
              actions: assign({
                isGiveUp: () => true,
              }),
            },
          },
        },
        // 处理中：处理悖论游戏的猜测
        processing: {
          invoke: {
            id: 'processParadoxGuess',
            src: 'processParadoxGuess',
            onDone: [
              {
                target: 'gameOver',
                cond: (_, event) => event.data.isGameOver,
                actions: assign({
                  data: (_, event) => event.data.newData,
                  restList: (_, event) => event.data.restList,
                  answer: (context, event) => {
                    const restList = event.data.restList;
                    return restList.length > 0 ? context.chartsData[restList[0]] : null;
                  },
                }),
              },
              {
                target: 'playing',
                actions: assign({
                  data: (_, event) => event.data.newData,
                  restList: (_, event) => event.data.restList,
                  answer: (context, event) => {
                    const restList = event.data.restList;
                    return restList.length > 0 ? context.chartsData[restList[0]] : null;
                  },
                }),
              },
            ],
            onError: {
              target: 'error',
              actions: assign({
                error: (_: any, event: any) => event.data.message,
              }),
            },
          },
        },
        // 游戏结束：悖论游戏结束，可以开始新游戏
        gameOver: {
          entry: 'handleGameOver',
          on: {
            NEW_GAME: {
              target: 'loading',
              actions: ['clearParadoxGameData', assign({
                data: () => [],
                restList: () => [],
                isGiveUp: () => false,
                error: () => undefined,
              })],
            },
          },
        },
        // 错误状态：发生错误，可以重试
        error: {
          on: {
            RETRY: {
              target: 'loading',
              actions: assign({
                error: () => undefined,
              }),
            },
          },
        },
      },
    },
  },
}, {
  guards: {
    // 模式判断守卫
    isRandomMode: (context) => context.mode === RANDOM_MODE,
    isDailyMode: (context) => context.mode === DAILY_MODE,
    isParadoxMode: (context) => context.mode === PARADOX_MODE,
    
    // 通用守卫：游戏是否未开始
    isGameNotStarted: (context) => (context.data?.length || 0) === 0,
    
    // 随机模式守卫：是否游戏结束
    isRandomGameOver: (context) => {
      const length = context.data?.length || 0;
      const last = length > 0 ? (context.data as any[])[length - 1] : null;
      const isWin = last?.guess?.[MAIN_KEY] === context.answer?.[MAIN_KEY];
      const isTriesExhausted = length >= DEFAULT_TRY_TIMES;
      return context.isGiveUp || isWin || isTriesExhausted;
    },
    
    // 每日模式守卫：是否游戏结束
    isDailyGameOver: (context) => {
      const length = context.data?.length || 0;
      const last = length > 0 ? (context.data as any[])[length - 1] : null;
      const isWin = last?.guess?.[MAIN_KEY] === context.answer?.[MAIN_KEY];
      const isTriesExhausted = length >= DEFAULT_TRY_TIMES;
      return isWin || isTriesExhausted;
    },
    
    // 悖论模式守卫：是否游戏结束
    isParadoxGameOver: (context) => {
      if (context.isGiveUp) return true;
      const length = context.data?.length || 0;
      if (length === 0) return false;
      const last = (context.data as any[])[length - 1];
      const restList = context.restList || [];
      const winByRest = restList.length === 1 && last?.guess?.[MAIN_KEY] === context.chartsData[restList[0]]?.[MAIN_KEY];
      const allCorrectKey = COLUMNS.map(() => 'correct').join('|');
      const key = COLUMNS.map(v => last?.[v?.key]).join('|');
      const winByAllCorrect = key === allCorrectKey;
      return winByRest || winByAllCorrect;
    },
  },
});