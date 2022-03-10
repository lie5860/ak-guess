import App from './App'
import {ReactDom, React} from './global'
import {I18nWrap} from "./locales/I18nWrap";

const Main = () => {
  return <I18nWrap>
    <App/>
  </I18nWrap>
}

// 初始化
export function bootstrap() {
}

// 挂载
export function mount(container, props) {
  console.log(props, 'props')
  ReactDom.render(React.createElement(Main, props, null), container);
}

// 更新
export function updated(attrName, value, container, props) {
  ReactDom.render(React.createElement(Main, props, null), container);
}

export default {
  bootstrap, mount, updated
}
