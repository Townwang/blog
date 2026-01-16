<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, computed, onMounted } from 'vue'
import { VPBadge } from 'vitepress/theme'

const { frontmatter } = useData()

const inputPassword = ref('')      
const isVerified = ref(false) 
const errorTip = ref('')
const isLoading = ref(false) 
const STORAGE_KEY = 'resource_download_auth'
const EXPIRE_TIME = 24 * 60 * 60 * 1000

const isAfterDate = (targetDateStr: string) => {
  if (!targetDateStr) return true
  const targetDate = new Date(targetDateStr)
  if (isNaN(targetDate.getTime())) return true
  
  const targetDateWith8h = new Date(targetDate.getTime() + 8 * 60 * 60 * 1000)
  
  const today = new Date()
  const todayUTC = new Date(Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    today.getHours(),
    today.getMinutes(),
    today.getSeconds(),
    today.getMilliseconds()
  ))
  return todayUTC >= targetDateWith8h
}

const filteredFeatures = computed(() => {
  return frontmatter.value.features?.filter(item => isAfterDate(item.showAfter)) || []
})

const isButtonDisabled = computed(() => {
  return isLoading.value || isVerified.value || !inputPassword.value.trim()
})

const decodeChineseBase64 = (base64: string): string => {
  try {
    const binaryStr = atob(base64)
    const utf8Bytes = new Uint8Array(binaryStr.length)
    for (let i = 0; i < binaryStr.length; i++) {
      utf8Bytes[i] = binaryStr.charCodeAt(i)
    }
    return new TextDecoder('utf-8').decode(utf8Bytes)
  } catch (err) {
    throw new Error('解码失败')
  }
}

const fetchBase64ByPassword = async (password: string): Promise<string> => {
  try {
    const response = await fetch('/shareware', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'If-Modified-Since': '0'
      }
    })

    if (!response.ok) {
      throw new Error(`API请求失败：${response.status} ${response.statusText}`)
    }

    const rawBase64 = await response.text()
    return rawBase64
  } catch (err) {
    throw new Error(`获取失败：${(err as Error).message}`)
  }
}

const validateBase64 = (base64: string, inputPwd: string): boolean => {
  const decodedText = decodeChineseBase64(base64)
  if (decodedText !== inputPwd) {
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
    const base64 = await fetchBase64ByPassword(inputPwd)
    validateBase64(base64, inputPwd)
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
  checkAuthStorage()
})
</script>

<template>
<div class="tip-alert">
<strong>💡提示</strong>：关注公众号 <strong class="tip-account">{{frontmatter.account}}</strong> 查看软件详细介绍并获取密码
</div>

  <div v-if="!isVerified" class="password-verify-container">
    <h3 class="verify-title">请输入资源访问密码</h3>
    <input
      type="password"
      v-model="inputPassword"
      placeholder="请输入密码"
      class="verify-input"
      @keyup.enter="!isButtonDisabled && verifyPassword()"
    />
    <button
      @click="verifyPassword"
      :disabled="isButtonDisabled"
      class="verify-btn"
    >
      {{ isLoading ? '验证中...' : '验证' }}
    </button>
    <p class="verify-error">{{ errorTip }}</p>
  </div>

  <div v-else class="resource-content">
    <button @click="logout" class="logout-btn">退出登录</button>
    <div class="features">
      <div 
        v-for="(item, index) in filteredFeatures" 
        :key="index" 
        class="feature-card"
      >
        <VPBadge 
          v-if="item.version" 
          type="tip" 
          class="version-badge"
        >
          {{ item.version }}
        </VPBadge>
        <h3 class="feature-title">{{ item.title }}</h3>
        <p class="feature-desc">{{ item.desc }}</p>
        <a 
          v-if="item.link" 
          :href="item.link" 
          class="feature-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ item.btnText || 'Download' }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tip-account {
  color: var(--vp-c-brand);
}
.tip-alert {
  padding: 1rem;
  margin: 1rem 2rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid #228be6;
}
</style>