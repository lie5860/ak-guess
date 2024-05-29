import App from './App'
import {React, ReactDomClient} from './global'
import {I18nWrap} from "./locales/I18nWrap";
import {Container} from "react-dom";
import {ErrorBoundary} from "./component/ErrorBoundary";

const Main = () => {
    return <React.StrictMode>
        <I18nWrap>
            <ErrorBoundary>
                <App/>
            </ErrorBoundary>
        </I18nWrap>
    </React.StrictMode>
}

// 初始化
export function bootstrap() {
}

// 挂载
export function mount(container: Container, props: any) {
    console.log(props, 'props');
    console.log(ReactDomClient)
    const root = ReactDomClient.createRoot(container);
    root.render(React.createElement(Main, props, null));
}

// 更新
export function updated(attrName: string, value: any, container: Container, props: any) {
    const root = ReactDomClient.createRoot(container);
    root.render(React.createElement(Main, props, null));
}

const AkGuess = {
    bootstrap, mount, updated
}
// 暂时不知道怎么处理 todo
// 债务 这边应该把AkGuess导出 由外部引入模块后调用window.magic
window.magic('ak-guess', AkGuess);
