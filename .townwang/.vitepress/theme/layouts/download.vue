<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, computed, onMounted ,getCurrentInstance } from 'vue'
import { VPBadge } from 'vitepress/theme'

const { frontmatter } = useData()

const inputPassword = ref('')      
const isVerified = ref(false) 
const errorTip = ref('')
const isLoading = ref(false)

const password = ref('')
const { $dailyPwd } = getCurrentInstance().appContext.config.globalProperties
const STORAGE_KEY = 'resource_download_auth'
const EXPIRE_TIME = 24 * 60 * 60 * 1000

const isAfterDate = (targetDateStr: string) => {
  if (!targetDateStr) return true
  const targetDate = new Date(targetDateStr)
  if (isNaN(targetDate.getTime())) return true


const targetDateWith8h = new Date(targetDate);
targetDateWith8h.setHours(8, 0, 0, 0);

const today = new Date();
return today >= targetDateWith8h;
}

const filteredFeatures = computed(() => {
  return frontmatter.value.features?.filter(item => isAfterDate(item.showAfter)) ?? []
})

const isButtonDisabled = computed(() => {
  return isLoading.value || isVerified.value || !inputPassword.value.trim()
})

const validate = (inputPwd: string): boolean => {
  if (password.value !== inputPwd) {
    throw new Error('密码错误，请重新输入')
  }
  return true
}

const checkAuthStorage = () => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY)
    if (!storedData) return false
    const { expireTime } = JSON.parse(storedData)
    const now = Date.now()
    if (now < expireTime) {
      isVerified.value = true
      return true
    } else {
      localStorage.removeItem(STORAGE_KEY)
      return false
    }
  } catch (err) {
    localStorage.removeItem(STORAGE_KEY)
    return false
  }
}

const verifyPassword = async () => {
  isLoading.value = true
  errorTip.value = ''
  
  try {
    const inputPwd = inputPassword.value.trim()
validate(inputPwd)
    isVerified.value = true
    const expireTime = Date.now() + EXPIRE_TIME
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      expireTime
    }))
  } catch (err) {
    errorTip.value = (err as Error).message
    isVerified.value = false
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  inputPassword.value = ''
  isVerified.value = false
  errorTip.value = ''
  localStorage.removeItem(STORAGE_KEY)
}

onMounted(() => {
  password.value = $dailyPwd.generateDailyPwd()
  checkAuthStorage()
})
</script>

<template>
  <div v-if="!isVerified">
<div class="tip-alert">
    关注公众号 <strong class="tip-account">{{frontmatter.account}}</strong> 查看软件详细介绍并获取密码
  </div>
  <div class="verifyContainer">
    <h3 class="verifyContainer-title">请输入资源访问密码</h3>
    <input
      type="password"
      v-model="inputPassword"
      placeholder="请输入密码"
      class="verifyContainer-input"
      @keyup.enter="!isButtonDisabled && verifyPassword()"
    />
    <button
      @click="verifyPassword"
      :disabled="isButtonDisabled"
      class="verifyContainer-btn"
    >
      {{ isLoading ? '验证中...' : '验证' }}
    </button>
    <p class="verifyContainer-error">{{ errorTip }}</p>
  </div>
 </div>
  <div v-else class="resource-content">
    <button @click="logout" class="download-logout-btn">退出登录</button>
    <div class="download-features">
      <div 
        v-for="(item, index) in filteredFeatures" 
        :key="index" 
        class="download-feature-card"
      >
        <VPBadge 
          v-if="item.version" 
          type="tip" 
          class="download-version-badge"
        >
          {{ item.version }}
        </VPBadge>
        <h3 class="download-feature-title">{{ item.title }}</h3>
        <p class="download-feature-desc">{{ item.desc }}</p>
        <a 
          v-if="item.link" 
          :href="item.link" 
          class="download-feature-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ item.btnText || 'Download' }}
        </a>
      </div>
    </div>
  </div>
<Content />
</template>
