import {React} from "../global";

export class ErrorBoundary extends React.Component{
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    // 更新 state，下次渲染可以展示错误相关的 UI
    console.dir(error)
    console.log(JSON.stringify(error.message), 'message');
    console.log(JSON.stringify(error.stack), 'stack');
    return {error: error};
  }

  componentDidCatch(error, info) {
    // 错误上报
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.error) {
      // 渲染出错时的 UI
      return <div style={{textAlign: 'left'}}>
        <p>小刻猜猜乐发生了某种错误，帮忙截图提交至
          <a href="https://www.wjx.top/vj/QgfS7Yd.aspx">问卷</a>
          中反馈，谢谢！</p>
        <p>message:</p>
        <p>{this.state.error?.message}</p>
        <p>stack:</p>
        <p style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>{this.state.error?.stack}</p>
      </div>;
    }
    return this.props.children;
  }
}
