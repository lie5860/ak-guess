import { createMachine, assign } from 'xstate';
import { DAILY_MODE, RANDOM_MODE, PARADOX_MODE } from '../const';

export interface GameContext {
  // 模式相关
  currentMode: string;
  availableModes: string[];
  
  // 游戏数据
  data: GuessItem[];
  answer: Character | null;
  answerKey: number;
  chartsData: Character[];
  chartNameToIndexDict: { [key: string]: number };
  i18n: any;
  today: string;
  lang: string;
  
  // 游戏状态
  isWin: boolean;
  isGiveUp: boolean;
  error?: string;
  
  // 模式特定数据
  randomAnswerKey: number;
  remoteAnswerKey: number;
  restList: number[];
}

export type GameEvent =
  | { type: 'INIT'; chartsData: Character[]; chartNameToIndexDict: any; i18n: any; lang: string }
  | { type: 'SELECT_MODE'; mode: string }
  | { type: 'START_GAME' }
  | { type: 'SUBMIT_GUESS'; guess: Character }
  | { type: 'NEW_GAME' }
  | { type: 'GIVE_UP' }
  | { type: 'GAME_WON' }
  | { type: 'GAME_LOST' }
  | { type: 'RETRY' }
  | { type: 'RESET' };

// 主状态机 - 管理整个应用状态
export const mainGameMachine = createMachine({
  id: 'mainGame',
  initial: 'initializing',
  context: {
    currentMode: '',
    availableModes: [RANDOM_MODE, DAILY_MODE, PARADOX_MODE],
    data: [],
    answer: null,
    answerKey: -1,
    chartsData: [],
    chartNameToIndexDict: {},
    i18n: null,
    today: '',
    lang: 'zh_CN',
    isWin: false,
    isGiveUp: false,
    error: undefined,
    randomAnswerKey: -1,
    remoteAnswerKey: -1,
    restList: [],
  },
  states: {
    // 初始化状态
    initializing: {
      on: {
        INIT: {
          target: 'modeSelection',
          actions: assign({
            chartsData: (_, event: any) => event.chartsData,
            chartNameToIndexDict: (_, event: any) => event.chartNameToIndexDict,
            i18n: (_, event: any) => event.i18n,
            lang: (_, event: any) => event.lang,
          }),
        },
      },
    },
    
    // 模式选择状态
    modeSelection: {
      on: {
        SELECT_MODE: {
          target: 'gameMode',
          actions: assign({
            currentMode: (_, event: any) => event.mode,
          }),
        },
      },
    },
    
    // 游戏模式状态 - 包含并行的模式管理和游戏状态
    gameMode: {
      type: 'parallel',
      states: {
        // 模式管理器 - 可以切换模式
        modeManager: {
          initial: 'active',
          states: {
            active: {
              on: {
                SELECT_MODE: {
                  target: 'switching',
                  actions: assign({
                    currentMode: (_, event: any) => event.mode,
                  }),
                },
              },
            },
            switching: {
              always: {
                target: 'active',
                actions: ['resetGameState'],
              },
            },
          },
        },
        
        // 游戏状态管理器
        gameState: {
          initial: 'notStarted',
          states: {
            // 未开始
            notStarted: {
              on: {
                START_GAME: {
                  target: 'loading',
                },
              },
            },
            
            // 加载中
            loading: {
              invoke: {
                id: 'loadGame',
                src: 'loadGameData',
                onDone: {
                  target: 'playing',
                  actions: assign({
                    data: (_, event) => event.data.data || [],
                    answer: (_, event) => event.data.answer,
                    answerKey: (_, event) => event.data.answerKey,
                    randomAnswerKey: (_, event) => event.data.randomAnswerKey || -1,
                    remoteAnswerKey: (_, event) => event.data.remoteAnswerKey || -1,
                    restList: (_, event) => event.data.restList || [],
                    today: (_, event) => event.data.today || '',
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
            
            // 游戏进行中
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
            
            // 处理猜测
            processing: {
              invoke: {
                id: 'processGuess',
                src: 'processGuess',
                onDone: [
                  {
                    target: 'gameOver',
                    cond: (_, event) => event.data.isGameOver,
                    actions: assign({
                      data: (_, event) => event.data.newData,
                      isWin: (_, event) => event.data.isWin,
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
            
            // 游戏结束
            gameOver: {
              entry: 'handleGameOver',
              on: {
                NEW_GAME: [
                  {
                    target: 'loading',
                    cond: (context) => context.currentMode !== DAILY_MODE,
                    actions: ['clearGameData', assign({
                      data: () => [],
                      isWin: () => false,
                      isGiveUp: () => false,
                      error: () => undefined,
                    })],
                  },
                  // 每日模式不支持新游戏
                ],
                SELECT_MODE: {
                  target: 'notStarted',
                },
              },
            },
            
            // 错误状态
            error: {
              on: {
                RETRY: {
                  target: 'loading',
                  actions: assign({
                    error: () => undefined,
                  }),
                },
                RESET: {
                  target: 'notStarted',
                  actions: assign({
                    error: () => undefined,
                  }),
                },
              },
            },
          },
        },
      },
    },
  },
});