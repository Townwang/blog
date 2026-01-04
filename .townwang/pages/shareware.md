---
layout: page
title: 资源下载页
titleTemplate: 资源站
description: 包含常用工具的版本及下载入口
pageClass: "download-page"
---

<script setup>
import { datas } from './shareware.js'
</script>

> 关注公众号 软件人 查看软件详情介绍

<div class="card-container" v-for="data in datas">
  <div class="download-card" >
    <h1 class="heading">
    <span class="name clip">{{data.name}} <Badge type="tip" :text="data.version" /></span>
    </h1>
    <p class="card-version">{{data.description}}</p>
    <a :href="data.downloadUrl" class="download-btn" target="_blank">
      下载软件
    </a>
  </div>
</div>

