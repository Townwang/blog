// .vitepress/utils/dailyPwd.js
// 简易MD5哈希生成
export function getMd5(str) {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}

// 获取UTC标准当日日期（YYYY-MM-DD）
export function getTodayDate() {
  const d = new Date()
  return [
    d.getUTCFullYear(),
    String(d.getUTCMonth() + 1).padStart(2, '0'),
    String(d.getUTCDate()).padStart(2, '0')
  ].join('-')
}

// 生成每日动态密码（可传参自定义长度，默认6位）
export function generateDailyPwd(length = 6) {
  const today = getTodayDate()
  const dateHash = getMd5(today)
  return dateHash.slice(0, length)
}

// 整合获取【日期+密码】（组件专用）
export function getDateAndPwd(length = 6) {
  const today = getTodayDate()
  return {
    today,
    dailyPwd: generateDailyPwd(length)
  }
}
