export function getMd5(str, salt = 'townwang') {
 
  const strWithSalt = str + salt
  let hash = 0
  if (strWithSalt.length === 0) return hash
  for (let i = 0; i < strWithSalt.length; i++) {
    const char = strWithSalt.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}

export function getTodayDate() {
  const d = new Date()
  return [
    d.getUTCFullYear(),
    String(d.getUTCMonth() + 1).padStart(2, '0'),
    String(d.getUTCDate()).padStart(2, '0')
  ].join('-')
}

export function generateDailyPwd(length = 6, salt) {
  const today = getTodayDate()
  const dateHash = getMd5(today, salt)
  return dateHash.slice(0, length)
}

export function getDateAndPwd(length = 6, salt) {
  const today = getTodayDate()
  return {
    today,
    dailyPwd: generateDailyPwd(length, salt)
  }
}
