---
layout: page
title: 资源下载页
titleTemplate: 资源站
description: 包含常用工具的版本及下载入口
pageClass: "download-page"
---

<script setup lang="ts">
import Features from '../.vitepress/theme/layouts/DownloadLayout.vue'
import { datas } from './shareware.js'
</script>

> [!TIP]
> 关注公众号 软件人 查看软件详情介绍



<Features :features="datas" />
