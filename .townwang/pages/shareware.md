---
layout: page
title: 资源下载页
titleTemplate: 资源站
description: 包含常用工具的版本及下载入口
pageClass: "download-page"
features:
  - title: 全球网测
    link: https://down.cnspeedtest.cn:8043/TaierAndroid/update/globalspeed_4.4.4_safe.apk
    desc: 全球网测是中国信息通信研究院自主研发的专业网络测试工具，具备宽带测速、上网体验和网络诊断三大核心功能。
    btnText: 立即下载
    version: v4.4.4
  - title: Stratum
    link: https://apt.izzysoft.de/fdroid/repo/com.stratumauth.app_12.apk
    desc: Stratum 是一款开源的双因素认证应用程序。
    btnText: 立即下载
    version: v1.4.0
  - title: BiliPai
    link: https://github.com/jay3-yy/BiliPai/releases/download/3.5.0/BiliPai.apk
    desc: 原生、纯净、可扩展 —— 重新定义你的 B 站体验
    btnText: 立即下载
    version: v3.5.0
  - title: 拟声
    link: https://download.music.mimicry.cool/
    desc: 拟声音乐app是一款免费听歌的软件，里面有真丰富的曲库资源，市面上一些比较火热的音乐在软件内都可以通过搜索找到，同时针对不同年龄段的群体还设置了专门的歌单，以此来满足不同用户的需求。
    btnText: 立即下载
    version: v0.84.0
  - title: Flow Auto Clicker
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.1/Auto%20Clicker_1.3.4.apk
    desc: Flow让你一键轻松实现自动重复点击和滑动
    btnText: 立即下载
    version: v1.3.4
  - title: SAI安装器
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.2/SAI%E5%AE%89%E8%A3%85%E5%99%A8v2.1.8.apk
    desc: 在您设备上安装APK-APKS-XAPK-APKM和分割APK
    btnText: 立即下载
    version: v2.1.8
---

<script setup lang="ts">
import Features from '../.vitepress/theme/layouts/DownloadLayout.vue'
import { useData } from 'vitepress'
const { frontmatter } = useData()
import { ref, computed } from 'vue'

const inputPassword = ref('')      
const isVerified = ref(false) 
const errorTip = ref('')
const isLoading = ref(false) 

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

const verifyPassword = async () => {
  isLoading.value = true
  errorTip.value = ''
  
  try {
    const inputPwd = inputPassword.value.trim()
    
    const base64 = await fetchBase64ByPassword(inputPwd)

    validateBase64(base64, inputPwd)

    isVerified.value = true
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
}
</script>

> [!TIP]
> 关注公众号 软件人 查看软件详细介绍并获取密码

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
  <Features :features="frontmatter.features" />
</div>