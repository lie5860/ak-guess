import { interpret } from 'xstate';
import { gameMachine } from '../gameMachine';
import { gameMachineConfig } from '../gameMachineConfig';
import { RANDOM_MODE, DAILY_MODE, PARADOX_MODE } from '../../const';

// Mock data for testing
const mockChartsData = [
  { name: 'TestChar1', key: 'test1', className: ['Guard'], race: 'Human', rarity: 4, team: [], painter: '' },
  { name: 'TestChar2', key: 'test2', className: ['Caster'], race: 'Elf', rarity: 5, team: [], painter: '' },
];

const mockChartNameToIndexDict = {
  'TestChar1': 0,
  'TestChar2': 1,
};

const mockI18n = {
  language: 'zh_CN',
  get: (key: string, params?: any) => {
    const translations: { [key: string]: string } = {
      'timesTip': `剩余次数: ${params?.times}`,
      'dailyTimeTip': '每日模式',
      'paradoxModeTip': '悖论模式',
    };
    return translations[key] || key;
  },
};

describe('Game State Machine', () => {
  const machineWithConfig = gameMachine.withConfig(gameMachineConfig);

  test('should start in idle state', () => {
    const service = interpret(machineWithConfig);
    service.start();
    
    expect(service.state.value).toBe('idle');
    
    service.stop();
  });

  test('should transition to initializing on INIT event', () => {
    const service = interpret(machineWithConfig);
    service.start();
    
    service.send({
      type: 'INIT',
      mode: RANDOM_MODE,
      chartsData: mockChartsData,
      chartNameToIndexDict: mockChartNameToIndexDict,
      i18n: mockI18n,
      lang: 'zh_CN',
    });
    
    expect(service.state.value).toBe('initializing');
    expect(service.state.context.mode).toBe(RANDOM_MODE);
    expect(service.state.context.chartsData).toEqual(mockChartsData);
    
    service.stop();
  });

  test('should transition to randomMode for random game', () => {
    const service = interpret(machineWithConfig);
    service.start();
    
    service.send({
      type: 'INIT',
      mode: RANDOM_MODE,
      chartsData: mockChartsData,
      chartNameToIndexDict: mockChartNameToIndexDict,
      i18n: mockI18n,
      lang: 'zh_CN',
    });
    
    // Wait for automatic transition
    setTimeout(() => {
      expect(service.state.matches('randomMode')).toBe(true);
    }, 0);
    
    service.stop();
  });

  test('should transition to dailyMode for daily game', () => {
    const service = interpret(machineWithConfig);
    service.start();
    
    service.send({
      type: 'INIT',
      mode: DAILY_MODE,
      chartsData: mockChartsData,
      chartNameToIndexDict: mockChartNameToIndexDict,
      i18n: mockI18n,
      lang: 'zh_CN',
    });
    
    // Wait for automatic transition
    setTimeout(() => {
      expect(service.state.matches('dailyMode')).toBe(true);
    }, 0);
    
    service.stop();
  });

  test('should transition to paradoxMode for paradox game', () => {
    const service = interpret(machineWithConfig);
    service.start();
    
    service.send({
      type: 'INIT',
      mode: PARADOX_MODE,
      chartsData: mockChartsData,
      chartNameToIndexDict: mockChartNameToIndexDict,
      i18n: mockI18n,
      lang: 'zh_CN',
    });
    
    // Wait for automatic transition
    setTimeout(() => {
      expect(service.state.matches('paradoxMode')).toBe(true);
    }, 0);
    
    service.stop();
  });

  test('should handle context updates correctly', () => {
    const service = interpret(machineWithConfig);
    service.start();
    
    const initEvent = {
      type: 'INIT' as const,
      mode: RANDOM_MODE,
      chartsData: mockChartsData,
      chartNameToIndexDict: mockChartNameToIndexDict,
      i18n: mockI18n,
      lang: 'zh_CN',
    };
    
    service.send(initEvent);
    
    const context = service.state.context;
    expect(context.mode).toBe(RANDOM_MODE);
    expect(context.chartsData).toEqual(mockChartsData);
    expect(context.chartNameToIndexDict).toEqual(mockChartNameToIndexDict);
    expect(context.i18n).toEqual(mockI18n);
    expect(context.lang).toBe('zh_CN');
    
    service.stop();
  });

  test('should maintain initial context values', () => {
    const service = interpret(machineWithConfig);
    service.start();
    
    const initialContext = service.state.context;
    expect(initialContext.data).toEqual([]);
    expect(initialContext.answer).toBe(null);
    expect(initialContext.answerKey).toBe(-1);
    expect(initialContext.isGiveUp).toBe(false);
    expect(initialContext.randomAnswerKey).toBe(-1);
    expect(initialContext.remoteAnswerKey).toBe(-1);
    expect(initialContext.restList).toEqual([]);
    
    service.stop();
  });
});