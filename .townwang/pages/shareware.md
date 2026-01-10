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
---

<script setup lang="ts">
import Features from '../.vitepress/theme/layouts/DownloadLayout.vue'
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

> [!TIP]
> 关注公众号 软件人 查看软件详情介绍

<Features :features="frontmatter.features" />