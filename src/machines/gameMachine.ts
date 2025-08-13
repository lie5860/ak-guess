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

export const gameMachine = createMachine<GameContext, GameEvent>({
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
        data: (_: any) => [],
        isGiveUp: (_: any) => false,
        error: (_: any) => undefined,
      }),
    },
  },
  states: {
    idle: {
      on: {
        INIT: {
          target: 'initializing',
          actions: assign({
            mode: (_, event) => event.mode,
            chartsData: (_, event) => event.chartsData,
            chartNameToIndexDict: (_, event) => event.chartNameToIndexDict,
            i18n: (_, event) => event.i18n,
            lang: (_, event) => event.lang,
          }),
        },
      },
    },
    initializing: {
      always: [
        {
          target: 'randomMode',
          cond: (context) => context.mode === RANDOM_MODE,
        },
        {
          target: 'dailyMode',
          cond: (context) => context.mode === DAILY_MODE,
        },
        {
          target: 'paradoxMode',
          cond: (context) => context.mode === PARADOX_MODE,
        },
      ],
    },
    randomMode: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'loadRandomGame',
            src: 'loadRandomGame',
            onDone: [
              {
                target: 'ready',
                actions: assign({
                  data: (_, event) => event.data.data || [],
                  randomAnswerKey: (_, event) => event.data.answerKey,
                  answer: (context, event) => context.chartsData[event.data.answerKey],
                  isGiveUp: (_, event) => event.data.isGiveUp || false,
                }),
              },
            ],
            onError: {
              target: 'error',
              actions: assign({
                error: (_, event) => event.data.message,
              }),
            },
          },
        },
        // 根据是否已有历史数据决定进入未开始或已开始
        ready: {
          always: [
            {
              target: 'gameOver',
              cond: (context) => {
                const length = context.data?.length || 0;
                const last = length > 0 ? context.data[length - 1] : null;
                const isWin = last?.guess?.[MAIN_KEY] === context.answer?.[MAIN_KEY];
                const isTriesExhausted = length >= DEFAULT_TRY_TIMES;
                return context.isGiveUp || isWin || isTriesExhausted;
              },
            },
            { target: 'notStarted', cond: (context) => (context.data?.length || 0) === 0 },
            { target: 'playing' },
          ],
          on: {
            SUBMIT_GUESS: { target: 'processing' },
          },
        },
        // 未开始：允许直接提交首个猜测
        notStarted: {
          on: {
            SUBMIT_GUESS: { target: 'processing' },
          },
        },
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
                isGiveUp: true,
              }),
            },
          },
        },
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
                error: (_, event) => event.data.message,
              }),
            },
          },
        },
        gameOver: {
          entry: 'handleGameOver',
          on: {
            NEW_GAME: {
              target: 'loading',
              actions: ['clearRandomGameData', assign({
                data: [],
                isGiveUp: false,
                error: undefined,
              })],
            },
          },
        },
        error: {
          on: {
            RETRY: {
              target: 'loading',
              actions: assign({
                error: undefined,
              }),
            },
          },
        },
      },
    },
    dailyMode: {
      initial: 'loading',
      states: {
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
                error: (_, event) => event.data.message,
              }),
            },
          },
        },
        ready: {
          always: [
            {
              target: 'gameOver',
              cond: (context) => {
                const length = context.data?.length || 0;
                const last = length > 0 ? context.data[length - 1] : null;
                const isWin = last?.guess?.[MAIN_KEY] === context.answer?.[MAIN_KEY];
                const isTriesExhausted = length >= DEFAULT_TRY_TIMES;
                return isWin || isTriesExhausted;
              },
            },
            { target: 'playing' },
          ],
          on: {
            SUBMIT_GUESS: { target: 'processing' },
          },
        },
        playing: {
          on: {
            SUBMIT_GUESS: {
              target: 'processing',
            },
          },
        },
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
                error: (_, event) => event.data.message,
              }),
            },
          },
        },
        gameOver: {
          entry: 'handleGameOver',
          // 每日模式不支持 NEW_GAME，每天只能玩一次
        },
        error: {
          on: {
            RETRY: {
              target: 'loading',
              actions: assign({
                error: undefined,
              }),
            },
          },
        },
      },
    },
    paradoxMode: {
      initial: 'loading',
      states: {
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
                error: (_, event) => event.data.message,
              }),
            },
          },
        },
        ready: {
          always: [
            {
              target: 'gameOver',
              cond: (context) => {
                if (context.isGiveUp) return true;
                const length = context.data?.length || 0;
                if (length === 0) return false;
                const last = context.data[length - 1];
                const restList = context.restList || [];
                const winByRest = restList.length === 1 && last?.guess?.[MAIN_KEY] === context.chartsData[restList[0]]?.[MAIN_KEY];
                const allCorrectKey = COLUMNS.map(() => 'correct').join('|');
                const key = COLUMNS.map(v => last?.[v?.key]).join('|');
                const winByAllCorrect = key === allCorrectKey;
                return winByRest || winByAllCorrect;
              },
            },
            { target: 'notStarted', cond: (context) => (context.data?.length || 0) === 0 },
            { target: 'playing' },
          ],
          on: {
            SUBMIT_GUESS: { target: 'processing' },
          },
        },
        notStarted: {
          on: {
            SUBMIT_GUESS: { target: 'processing' },
            GIVE_UP: { target: 'gameOver', actions: assign({ isGiveUp: true }) },
          },
        },
        playing: {
          on: {
            SUBMIT_GUESS: {
              target: 'processing',
            },
            GIVE_UP: {
              target: 'gameOver',
              actions: assign({
                isGiveUp: true,
              }),
            },
          },
        },
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
                error: (_, event) => event.data.message,
              }),
            },
          },
        },
        gameOver: {
          entry: 'handleGameOver',
          on: {
            NEW_GAME: {
              target: 'loading',
              actions: ['clearParadoxGameData', assign({
                data: [],
                restList: [],
                isGiveUp: false,
                error: undefined,
              })],
            },
          },
        },
        error: {
          on: {
            RETRY: {
              target: 'loading',
              actions: assign({
                error: undefined,
              }),
            },
          },
        },
      },
    },
  },
});