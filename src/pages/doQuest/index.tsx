import React from "react";


function searchObj(href: string = location.href) {
  const obj = {};
  const arr = href.split('?').pop().split('#').shift().split('&');
  for (let i = arr.length - 1; i >= 0; i--) {
    const k = arr[i].split('=')[0];
    const val = arr[i].split('=')[1];
    obj[k] = val;
  }
  return obj
}

const DoQuest = () => {
  const [mode, SetMode] = React.useState('')
  React.useEffect(() => {
    const obj = searchObj()
    const data = decodeURIComponent(obj.data) || ''
    let res = {mode: ''}
    try {
      res = JSON.parse(data)
    } catch (e) {
      console.log(e)
      //  初始化异常
    }
    SetMode(res.mode)
    console.log(res.mode)
  })
  return <div className="mdui-appbar">
    <div className="mdui-toolbar mdui-color-theme">
      <a href="javascript:;" className="mdui-btn mdui-btn-icon">
        <i className="mdui-icon material-icons">back</i>
      </a>
      <a href="javascript:;" className="mdui-typo-title">Title</a>
      <div className="mdui-toolbar-spacer"></div>
      <a href="javascript:;" className="mdui-btn mdui-btn-icon">
        <i className="mdui-icon material-icons">search</i>
      </a>
      <a href="javascript:;" className="mdui-btn mdui-btn-icon">
        <i className="mdui-icon material-icons">refresh</i>
      </a>
      <a href="javascript:;" className="mdui-btn mdui-btn-icon">
        <i className="mdui-icon material-icons">more_vert</i>
      </a>
    </div>
    <div className="mdui-tab mdui-color-theme" mdui-tab>
      <a href="#example3-tab1" className="mdui-ripple mdui-ripple-white">web</a>
      <a href="#example3-tab1" className="mdui-ripple mdui-ripple-white">shopping</a>
      <a href="#example3-tab1" className="mdui-ripple mdui-ripple-white">videos</a>
    </div>
  </div>
}
export default DoQuest
