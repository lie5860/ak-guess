import { interpret, Interpreter } from 'xstate';
import { React, moment } from '../global';
import '../typings.d.ts'
import { gameMachine, GameContext, GameEvent } from './gameMachine';
import { gameMachineConfig } from './gameMachineConfig';
import { HomeStore } from '../store';
import { DEFAULT_TRY_TIMES, MAIN_KEY, DAILY_MODE, PARADOX_MODE, EVENTS, TZ_ASIA_SHANGHAI, DATE_FMT } from '../const';

export const useGameMachine = (store: HomeStore) => {
  const { mode, chartsData, chartNameToIndexDict, i18n, today } = store;
  
  const machineWithConfig = gameMachine.withConfig(gameMachineConfig);
  
  // 使用 React.useRef 和 React.useState 替代 @xstate/react
  const serviceRef = React.useRef(null as any);
  const [state, setState] = React.useState(() => machineWithConfig.initialState);
  
  // 初始化服务
  React.useEffect(() => {
    const service = interpret(machineWithConfig);
    serviceRef.current = service;
    
    service.onTransition((newState) => {
      setState(newState);
    });
    
    service.start();
    
    return () => {
      service.stop();
    };
  }, []);

  const send = React.useCallback((event: GameEvent) => {
    serviceRef.current?.send(event);
  }, []);

  const context = state.context;
  const { data, answer, isGiveUp } = context;

  // Game state helpers
  const isPlaying = state.matches('randomMode.playing') || 
                   state.matches('randomMode.notStarted') || 
                   state.matches('randomMode.ready') || 
                   state.matches('dailyMode.playing') || 
                   state.matches('paradoxMode.playing') ||
                   state.matches('paradoxMode.notStarted') ||
                   state.matches('paradoxMode.ready');
  
  const isGameOver = state.matches('randomMode.gameOver') || 
                    state.matches('dailyMode.gameOver') || 
                    state.matches('paradoxMode.gameOver');
  
  const isLoading = state.matches('randomMode.loading') || 
                   state.matches('dailyMode.loading') || 
                   state.matches('paradoxMode.loading');
  
  const isProcessing = state.matches('randomMode.processing') || 
                      state.matches('dailyMode.processing') || 
                      state.matches('paradoxMode.processing');

  // 从当前状态推断模式
  const getCurrentMode = () => {
    const stateValue = state.value;
    if (typeof stateValue === 'string') {
      if (stateValue.includes('random')) return 'RANDOM_MODE';
      if (stateValue.includes('daily')) return 'DAILY_MODE';
      if (stateValue.includes('paradox')) return 'PARADOX_MODE';
    }
    if (typeof stateValue === 'object') {
      if (stateValue.randomMode) return 'RANDOM_MODE';
      if (stateValue.dailyMode) return 'DAILY_MODE';
      if (stateValue.paradoxMode) return 'PARADOX_MODE';
    }
    return mode; // fallback to store mode
  };

  const currentMode = getCurrentMode();
  
  // 每日模式不支持再来一局
  const canNewGame = isGameOver && mode !== DAILY_MODE;
  
  // 调试信息移除

  // Game logic helpers
  const judgeWin = (gameData: any[]) => {
    if (!gameData.length || !answer) return false;
    return gameData[gameData.length - 1]?.guess?.[MAIN_KEY] === answer[MAIN_KEY];
  };

  const judgeOver = (gameData: any[]) => {
    return gameData.length >= DEFAULT_TRY_TIMES || judgeWin(gameData) || isGiveUp;
  };

  const isWin = judgeWin(data);

  // Actions
  const init = () => {
    send({
      type: EVENTS.INIT,
      mode,
      chartsData,
      chartNameToIndexDict,
      i18n,
      lang: i18n.language,
    });
  };

  const insertItem = (newItem: any) => {
    send({
      type: EVENTS.SUBMIT_GUESS,
      guess: newItem,
    });
    
    return data; // The actual data will be updated through the state machine
  };

  const newGame = () => {
    send({ type: EVENTS.NEW_GAME });
  };

  const giveUp = () => {
    send({ type: EVENTS.GIVE_UP });
  };

  const gameOver = (newData: any[]) => {
    send({ type: EVENTS.GAME_OVER, data: newData });
  };

  // Pre-submit validation
  const preSubmitCheck = () => {
    if (mode === DAILY_MODE) {
      if (today !== moment().tz(TZ_ASIA_SHANGHAI).format(DATE_FMT)) {
        return true; // Indicates should stop submission
      }
    }
    return false;
  };

  // Game tip component
  const gameTip = (config: any) => {
    const remainingTries = DEFAULT_TRY_TIMES - data.length;
    
    if (mode === DAILY_MODE) {
      return (
        <>
          <div style={{ marginTop: 8, ...config.gameTipStyle }}>
            {i18n.get('timesTip', { times: `${remainingTries}/${DEFAULT_TRY_TIMES}` })}
          </div>
          <div>{i18n.get('dailyTimeTip')}</div>
        </>
      );
    } else if (mode === PARADOX_MODE) {
      return (
        <div style={{ marginTop: 8, ...config.gameTipStyle }}>
          {i18n.get('paradoxModeTip')}
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: 8, ...config.gameTipStyle }}>
          {i18n.get('timesTip', { times: `${remainingTries}/${DEFAULT_TRY_TIMES}` })}
        </div>
      );
    }
  };

  return {
    // Required Game interface properties
    answer,
    data,
    isWin,
    isOver: isGameOver,
    canGiveUp: isPlaying && data.length > 0 && mode !== DAILY_MODE,
    canNewGame,
    
    // Actions
    init,
    insertItem,
    newGame,
    giveUp,
    gameOver,
    preSubmitCheck,
    
    // Helpers
    judgeWin,
    judgeOver,
    gameTip,
    
    // Additional XState-specific properties
    state,
    context,
    send,
    isLoading,
    isProcessing,
    machine: machineWithConfig,
  } as any & {
    state: any;
    context: GameContext;
    send: any;
    isLoading: boolean;
    isProcessing: boolean;
    machine: any;
  };
};