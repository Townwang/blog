async function openWechat(biz = "MjM5ODU3NjMxMA==") {
  try {
    // 动态拼接 __biz
    const api = `https://mp.weixin.qq.com/mp/jumptoweixin?uin=&key=&pass_ticket=&wxtoken=777&devicetype=&clientversion=false&version=false&__biz=${biz}&appmsg_token=&x5=0&f=json&user_article_role=0`

    const body = new URLSearchParams({
      link: 'https://mp.weixin.qq.com/s/6j8_as4mV4I5isPf2Z9qmw?clicktag=mp-common-profile&scene=294&clickpos=0',
      click_type: 'mp-common-profile'
    })

    // 补齐原版完整请求头
    const res = await fetch(api, {
      method: 'POST',
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; U; Android 13; zh-CN; IN2010 Build/RKQ1.211119.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.58 Quark/6.9.0.481 Mobile Safari/537.36 XiaoMi/MiuiBrowser T7/13.41 SearchCraft/2.8.99 (Baidu; P1 13)",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "*/*",
        "Origin": "https://mp.weixin.qq.com",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Cookie": "rewardsn=; wxtokenkey=777",
        "Referer": "https://mp.weixin.qq.com/s/CR8SXflDvw6qzer1r0HbAA"
      },
      body: body
    })

    const data = await res.json()
    const weixinScheme = data.url

    if (weixinScheme) {
      window.location.href = weixinScheme
    } else {
      alert('获取微信跳转链接失败')
    }
  } catch (err) {
    console.error('出错：', err)
    alert('请求失败，请在手机微信/手机浏览器打开')
  }
}
