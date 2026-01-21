<template>
  <div class="daily-password">
    <p>今日动态密码（{{ today }}）：<span class="password">{{ dailyPwd }}</span></p>
  </div>
    <div class="pwd-link-wrap">
      <a href="https://townwang.com/pages/shareware" target="_blank" rel="noopener noreferrer">点击前往下载基地</a>
    </div>
<Content />
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
const today = ref('')
const dailyPwd = ref('')

const { $dailyPwd } = getCurrentInstance().appContext.config.globalProperties

onMounted(() => {
  const { today: t, dailyPwd: p } = $dailyPwd.getDateAndPwd()
  today.value = t
  dailyPwd.value = p
})
</script>

<style scoped>
.pwd-link-wrap {
  text-align: center;
  margin-top: 16px;
}
.pwd-link-wrap a {
  color: #42b983;
  text-decoration: none;
}
.pwd-link-wrap a:hover {
  text-decoration: underline;
}
</style>
