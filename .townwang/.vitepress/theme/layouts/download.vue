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
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 1.5rem; 
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  padding: 1.5rem;
  padding-top: 2.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  transition: transform 0.2s ease;
  position: relative;
  padding-bottom: 4rem;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.version-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.2rem 0.6rem !important; 
  font-size: 0.75rem !important;
}

.feature-title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: var(--vp-c-text-1);
  text-align: left;
  font-weight: 700; 
}

.feature-desc {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: left;
}

.feature-btn {
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-top-left-radius:50px;
  border-bottom-right-radius:8px;
  border-bottom-left-radius:8px;
  border-color: var(--vp-c-brand);
  border-style:solid;
  border-width: 1px;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 0.9rem;
  transition: none;
}


.verify-error {
  margin-top: 1rem;
  color: var(--vp-c-danger-1);
  font-size: 0.9rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.8rem;
  z-index: 100;
}
.tip-alert {
  padding: 1rem;
  margin: 1rem 2rem;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid #228be6;
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
    padding: 1rem 1.5rem;
  }
  .feature-card {
    padding: 1rem;
    padding-top: 2rem; 
    padding-bottom: 3.5rem;
  }
  .version-badge {
    top: 1rem;
    right: 1rem;
    padding: 0.15rem 0.5rem !important;
    font-size: 0.7rem !important;
  }
  .feature-btn {
    bottom: 0rem;
    right: 0rem;
  }
  .logout-btn {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}





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