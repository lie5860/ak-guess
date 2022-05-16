const PostQuest = () => {
  return <div>
    <div style={{height: 200}}>回到首页</div>
    <div style={{height: 200}}>233</div>
    <div style={{height: 200}} onClick={() => {
      const obj = {
        mode: '模式A',
        option: {
          answer: 12
        }
      }
      const url = `${location.origin}${location.pathname}#/doQuest?data=${encodeURIComponent(JSON.stringify(obj))}`
      location.href = url
    }}>分享
    </div>
  </div>
}
export default PostQuest
