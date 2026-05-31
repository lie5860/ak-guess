import React from 'react';
import { reportError } from '../server';

// 仅收集与本应用相关的 localStorage 键，避免泄露其他站点数据
const APP_STORAGE_PREFIXES = [
  'r-',
  'giveUp',
  'dayData',
  'paradoxData',
  'record',
  'firstOpen',
  '__lang',
  'dailyData',
  'UUID',
];

const collectAppLocalStorage = (): string => {
  const arr: Array<{ key: string; val: string | null }> = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && APP_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix))) {
      arr.push({ key, val: localStorage.getItem(key) });
    }
  }
  return JSON.stringify(arr);
};

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    // 更新 state，下次渲染可以展示错误相关的 UI
    console.error('[ErrorBoundary] 捕获到渲染错误:', error);
    return { error: error };
  }

  componentDidCatch(error: Error, _info: React.ErrorInfo) {
    // 错误上报——仅收集本应用相关的 localStorage 数据
    reportError({
      message: error?.message,
      stack: error?.stack || '',
      localstorage: collectAppLocalStorage(),
    });
  }

  render() {
    if (this.state.error) {
      // 渲染出错时的 UI
      return (
        <div style={{ textAlign: 'left' }}>
          <p>小刻猜猜乐发生了某种错误，错误已上报到服务器，待修复后访问，谢谢！</p>
          <p>message:</p>
          <p>{this.state.error?.message}</p>
          <p>stack:</p>
          <p
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {this.state.error?.stack}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
