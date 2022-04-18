import App from './App'
import {ReactDom, React} from './global'
import {I18nWrap} from "./locales/I18nWrap";
import {Container} from "react-dom";

const Main = () => {
  return <I18nWrap>
    <App/>
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
// 暂时不知道怎么处理 todo
// 债务 这边应该把AkGuess导出 由外部引入模块后调用window.magic
window.magic('ak-guess', AkGuess);
