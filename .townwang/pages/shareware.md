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
    showAfter: 2026-01-14
  - title: Stratum
    link: https://apt.izzysoft.de/fdroid/repo/com.stratumauth.app_12.apk
    desc: Stratum 是一款开源的双因素认证应用程序。
    btnText: 立即下载
    version: v1.4.0
    showAfter: 2026-01-14
  - title: BiliPai
    link: https://github.com/jay3-yy/BiliPai/releases/download/3.5.0/BiliPai.apk
    desc: 原生、纯净、可扩展 —— 重新定义你的 B 站体验
    btnText: 立即下载
    version: v3.5.0
    showAfter: 2026-01-14
  - title: 拟声
    link: https://download.music.mimicry.cool/
    desc: 拟声音乐app是一款免费听歌的软件，里面有真丰富的曲库资源，市面上一些比较火热的音乐在软件内都可以通过搜索找到，同时针对不同年龄段的群体还设置了专门的歌单，以此来满足不同用户的需求。
    btnText: 立即下载
    version: v0.84.0
    showAfter: 2026-01-14
  - title: Flow Auto Clicker
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.1/Auto%20Clicker_1.3.4.apk
    desc: Flow让你一键轻松实现自动重复点击和滑动
    btnText: 立即下载
    version: v1.3.4
    showAfter: 2026-01-15
  - title: SAI安装器
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.2/SAI%E5%AE%89%E8%A3%85%E5%99%A8v2.1.8.apk
    desc: 在您设备上安装APK-APKS-XAPK-APKM和分割APK
    btnText: 立即下载
    version: v2.1.8
    showAfter: 2026-01-16
  - title: 中药百科大全
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.3/%E4%B8%AD%E8%8D%AF%E7%99%BE%E7%A7%91%E5%A4%A7%E5%85%A8_1.5.apk
    desc: 【中药百科大全】v1.5解锁永久会员版/药材方剂中药识别一站式查
    btnText: 立即下载
    version: v1.5.0
    showAfter: 2026-01-17
  - title: 金调KTV
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.4/%E9%87%91%E8%B0%83KTV_20250801.8.1.apk
    desc: 【金调KTV】v20250801.8.1更新修改永久激活免费版
    btnText: 立即下载
    version: v1.8.1
    showAfter: 2026-01-18
  - title: 吉他教学
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.5/SimplyGuitar_9.7.6.apk
    desc: 无需经验适合所有年龄段和任何吉他
    btnText: 立即下载
    version: v9.7.6
    showAfter: 2026-01-19
  - title: 蓝云
    link: https://gitee.com/jdy2002/SplitLanzou/releases/download/1.8.6/SplitLanzou-1.8.6.apk
    desc: 第三方蓝奏云盘安卓客户端
    btnText: 立即下载
    version: v1.8.6
    showAfter: 2026-01-20
  - title: 30天内练出六块腹肌
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.6/30%E5%A4%A9%E5%86%85%E7%BB%83%E5%87%BA%E5%85%AD%E5%9D%97%E8%85%B9%E8%82%8Cv1.4.4(98).apk
    desc: 超级有效实用腹部锻炼
    btnText: 立即下载
    version: v1.4.4
    showAfter: 2026-01-21
  - title: 电工仿真软件
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.7/%E7%94%B5%E5%B7%A5%E4%BB%BF%E7%9C%9F%E8%BD%AF%E4%BB%B6_7.4.0.apk
    desc: 电工仿真软件一款专为电工和电子发烧友、电力专业学生打造的高效电路模拟电路仿真工具。无论您是从事工业电路仿真、家庭电路仿真，还是学习物理电路仿真，电工仿真软件都将是您的高效助手。
    btnText: 立即下载
    version: v7.4.0
    showAfter: 2026-01-22
  - title: 爱电影
    link: https://gitee.com/townwangs/shareware/releases/download/v0.0.8/%E7%88%B1%E7%94%B5%E5%BD%B1_2.2.8.apk
    desc: 爱电影是一款专门为喜欢电影的朋友们打造的视频软件。
    btnText: 立即下载
    version: v2.2.8
    showAfter: 2026-01-23

---

<script setup lang="ts">
import Features from '../.vitepress/theme/layouts/DownloadLayout.vue'
import { useData } from 'vitepress'
import { ref, computed, onMounted } from 'vue'

const { frontmatter } = useData()
const inputPassword = ref('')      
const isVerified = ref(false) 
const errorTip = ref('')
const isLoading = ref(false) 
const STORAGE_KEY = 'resource_download_auth'
const EXPIRE_TIME = 24 * 60 * 60 * 1000

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
  <button @click="logout" class="logout-btn">退出登录</button>
  <Features :features="frontmatter.features" />
</div>
