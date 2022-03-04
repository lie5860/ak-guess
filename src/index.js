import React, {createElement} from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'


// 初始化
export function bootstrap() {
}

// 挂载
export function mount(container, props) {
    console.log(props, 'props')
    ReactDOM.render(createElement(App, props, null), container);
}

// 更新
export function updated(attrName, value, container, props) {
    ReactDOM.render(createElement(App, props, null), container);
}

window.App = {
    bootstrap, mount, updated
}
