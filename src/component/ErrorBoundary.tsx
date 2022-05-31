import React, {ErrorInfo} from "react";
import {reportError} from "../server";

interface State {
  error: null | { message: string, stack: string }
}

export class ErrorBoundary extends React.Component<{}, State> {

  static getDerivedStateFromError(error: any) {
    // 更新 state，下次渲染可以展示错误相关的 UI
    return {error: error};
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const len = localStorage.length;  // 获取长度
    const arr = []; // 定义数据集
    for (let i = 0; i < len; i++) {
      // 获取key 索引从0开始
      const getKey = localStorage.key(i);
      if (getKey) {
        // 获取key对应的值
        const getVal = localStorage.getItem(getKey);
        // 放进数组
        arr[i] = {
          'key': getKey,
          'val': getVal,
        }
      }
    }
    // 错误上报
    reportError({
      message: error?.message,
      stack: error?.stack,
      localstorage: JSON.stringify(arr)
    })
  }

  render() {
    if (this.state?.error) {
      // 渲染出错时的 UI
      return <div style={{textAlign: 'left'}}>
        <p>小刻猜猜乐发生了某种错误，错误已上报到服务器，待修复后访问，谢谢！</p>
        <p>message:</p>
        <p>{this.state?.error?.message}</p>
        <p>stack:</p>
        <p style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>{this.state?.error?.stack}</p>
      </div>;
    }
    return this.props.children;
  }
}
