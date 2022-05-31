import React, { useEffect } from "react";

const PostQuest = () => {
  const post = () => {
    const obj = {
      mode: '模式A',
      option: {
        answer: 12
      }
    }
    const url = `${location.origin}${location.pathname}#/doQuest?data=${encodeURIComponent(JSON.stringify(obj))}`
    location.href = url
  }
  useEffect(() => {
    window.mdui.mutation()
  })
  return <div className="mdui-appbar">
    <div className="mdui-toolbar mdui-color-theme">
      <a href="javascript:;" className="mdui-btn mdui-btn-icon">
        <i className="mdui-icon material-icons">arrow_back</i>
      </a>
      <a href="javascript:;" className="mdui-typo-title">出题啦</a>
      <div className="mdui-toolbar-spacer"></div>
      {/*<a href="javascript:;" className="mdui-btn mdui-btn-icon">*/}
      {/*  <i className="mdui-icon material-icons">search</i>*/}
      {/*</a>*/}
      {/*<a href="javascript:;" className="mdui-btn mdui-btn-icon">*/}
      {/*  <i className="mdui-icon material-icons">refresh</i>*/}
      {/*</a>*/}
      {/*<a href="javascript:;" className="mdui-btn mdui-btn-icon">*/}
      {/*  <i className="mdui-icon material-icons">more_vert</i>*/}
      {/*</a>*/}
    </div>
    <div className="mdui-tab mdui-color-theme" mdui-tab>
      <a className="mdui-ripple mdui-ripple-white mdui-tab-active">
        <i className="mdui-icon material-icons">looks_one</i>
        <label>随机模式</label>
      </a>
      <a className="mdui-ripple mdui-ripple-white">
        <i className="mdui-icon material-icons">looks_two</i>
        <label>悖论模拟</label>
      </a>
      <a className="mdui-ripple mdui-ripple-white">
        <i className="mdui-icon material-icons">history</i>
        <label>历史记录</label>
      </a>
    </div>
    <div>
      <li className="mdui-list-item mdui-ripple">
        <div className="mdui-list-item-content">指定答案</div>
        <label className="mdui-switch">
          <input type="checkbox"/>
          <i className="mdui-switch-icon"></i>
        </label>
      </li>
      <li className="mdui-list-item mdui-ripple">
        <div className="mdui-list-item-content">严格区分完全匹配和部分匹配</div>
        <label className="mdui-switch">
          <input type="checkbox"/>
          <i className="mdui-switch-icon"></i>
        </label>
      </li>
      <div className="mdui-typo">
        <h1>h1 标题 heading</h1>
        <h2>h2 标题 heading</h2>
        <h3>h3 标题 heading</h3>
        <h4>h4 标题 heading</h4>
        <h6>猜测次数</h6>
      </div>
      <label className="mdui-slider mdui-slider-discrete">
        <input type="range" step="1" min="0" max="100"/>
      </label>
    </div>
  </div>
}
export default PostQuest
