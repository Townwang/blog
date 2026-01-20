function getMd5(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

export function getTodayDate() {
  const d = new Date();
  return [
    d.getUTCFullYear(),
    String(d.getUTCMonth() + 1).padStart(2, '0'),
    String(d.getUTCDate()).padStart(2, '0')
  ].join('-');
}


export function generateDailyPwd(options = {}) {
  const {
    salt = 'townwang', // 自定义盐值，提升唯一性
    length = 6, // 密码长度
    isNumber = false // 是否纯数字密码
  } = options;
  const today = getTodayDate();
  const hash = getMd5(today + salt);
  
  if (isNumber) {
    // 纯数字密码：哈希转10进制后截取，不足补0
    return BigInt('0x' + hash).toString().slice(0, length).padStart(length, '0');
  }
  // 字母数字混合密码：直接截取哈希
  return hash.slice(0, length);
}

// 快捷获取默认6位混合密码（无配置时直接调用）
export const getDefaultPwd = () => generateDailyPwd();
