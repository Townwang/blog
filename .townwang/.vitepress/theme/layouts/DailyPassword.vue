<template>
  <div class="daily-password">
    <p>今日动态密码（{{ today }}）：<span class="password">{{ dailyPwd }}</span></p>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'

const today = ref('')
const dailyPwd = ref('')

// 获取Vue全局实例，拿到挂载的$dailyPwd工具函数
const { $dailyPwd } = getCurrentInstance().appContext.config.globalProperties

onMounted(() => {
  // 调用全局工具函数，获取日期和密码（可传参改长度，如$dailyPwd.getDateAndPwd(8)）
  const { today: t, dailyPwd: p } = $dailyPwd.getDateAndPwd()
  today.value = t
  dailyPwd.value = p
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
/* 适配VitePress深色模式 */
:deep(.dark) .daily-password {
  background: #2d2d2d;
}
:deep(.dark) .password {
  color: #4fc3f7;
}
</style>
