async function openWechat() {
  try {
    // 1. 你给的 POST 地址
    const api = 'https://mp.weixin.qq.com/mp/jumptoweixin?uin=&key=&pass_ticket=&wxtoken=777&devicetype=&clientversion=false&version=false&__biz=MjM5ODU3NjMxMA==&appmsg_token=&x5=0&f=json&user_article_role=0'

    // 2. 你给的 POST 参数
    const body = new URLSearchParams({
      link: 'https://mp.weixin.qq.com/s/6j8_as4mV4I5isPf2Z9qmw?clicktag=mp-common-profile&scene=294&clickpos=0',
      click_type: 'mp-common-profile'
    })

    // 3. 发请求拿 ticket
    const res = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })

    const data = await res.json()

    // 4. 从返回里取 weixin:// 链接（微信这个接口返回的是 url）
    const weixinScheme = data.url

    if (weixinScheme) {
      window.location.href = weixinScheme
    } else {
      alert('获取跳转链接失败')
    }
  } catch (err) {
    console.error('出错：', err)
    alert('请求失败，请在手机浏览器打开')
  }
}