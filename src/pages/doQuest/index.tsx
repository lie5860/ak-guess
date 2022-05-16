import {React} from "@/global";


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
  return <div>123</div>
}
export default DoQuest
