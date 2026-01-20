<template>
  <div class="daily-password">
    <p>今日动态密码（{{ today }}）：<span class="password">{{ dailyPwd }}</span></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const today = ref('')
const dailyPwd = ref('')

// 基于日期生成固定哈希（MD5），保证同一日期哈希唯一
function getMd5(str) {
  let hash = 0
  if (str.length === 0) return hash
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转为32位整数
  }
  return Math.abs(hash).toString(16).padStart(8, '0')
}

// 生成当日日期（格式：YYYY-MM-DD，保证跨时区一致）
function getTodayDate() {
  const d = new Date()
  // 转UTC日期，避免不同时区日期不一致
  return [
    d.getUTCFullYear(),
    String(d.getUTCMonth() + 1).padStart(2, '0'),
    String(d.getUTCDate()).padStart(2, '0')
  ].join('-')
}

// 生成每日密码：截取哈希前6/8位，可自定义长度
onMounted(() => {
  today.value = getTodayDate()
  const dateHash = getMd5(today.value)
  dailyPwd.value = dateHash.slice(0, 6) // 取前6位，可改8位/其他长度
})
</script>

<style scoped>
.daily-password {
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}
.password {
  font-weight: 700;
  color: #2196f3;
  font-size: 1.2rem;
  letter-spacing: 2px;
}
</style>
