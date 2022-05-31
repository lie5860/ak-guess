import React from "react";
import ReactDom from 'react-dom';
import App from './App'
import {I18nWrap} from "./locales/I18nWrap";
import {Container} from "react-dom";
import {ErrorBoundary} from "./component/ErrorBoundary";

import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
const Main = () => {
  return <I18nWrap>
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </I18nWrap>
}

// 初始化
export function bootstrap() {
}

// 挂载
export function mount(container: Container, props: any) {
  console.log(props, 'props')
  ReactDom.render(React.createElement(Main, props, null), container);
}

// 更新
export function updated(attrName: string, value: any, container: Container, props: any) {
  ReactDom.render(React.createElement(Main, props, null), container);
}

const AkGuess = {
  bootstrap, mount, updated
}
export default AkGuess
