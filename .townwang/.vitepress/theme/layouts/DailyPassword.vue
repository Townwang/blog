<template>
  <div class="daily-password">
    <p>今日动态密码（{{ today }}）：<span class="password">{{ dailyPwd }}</span></p>
  </div>
<Content />
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
