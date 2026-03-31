import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { I18nWrap } from './locales/I18nWrap';
import { Container } from 'react-dom';
import { ErrorBoundary } from './component/ErrorBoundary';
const Main = () => {
  return (
    <I18nWrap>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </I18nWrap>
  );
};

// 初始化
export function bootstrap() {
  return void 0;
}

// 挂载
export function mount(container: Container, props: Record<string, unknown>) {
  ReactDom.render(React.createElement(Main, props, null), container);
}

// 更新
export function updated(
  attrName: string,
  value: unknown,
  container: Container,
  props: Record<string, unknown>,
) {
  ReactDom.render(React.createElement(Main, props, null), container);
}

const AkGuess = {
  bootstrap,
  mount,
  updated,
};
// 暂时不知道怎么处理 todo
// 债务 这边应该把AkGuess导出 由外部引入模块后调用window.magic
(window as unknown as { magic: (name: string, obj: unknown) => void }).magic('ak-guess', AkGuess);
