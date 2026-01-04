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

> [!TIP]
> 关注公众号 软件人 查看软件详情介绍

<style scoped>
/* 卡片容器样式 - 相对定位用于子元素绝对定位 */
.download-card {
  position: relative;
  padding: 20px;
  margin: 15px 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  /* 防止标签和按钮超出卡片 */
  overflow: hidden;
}

/* 左上角三角形标签 - 使用伪元素实现 */
.download-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  /* 三角形大小：宽高 0，通过边框实现 */
  width: 0;
  height: 0;
  border-width: 40px 40px 0 0;
  border-style: solid;
  /* 三角形颜色：可自行修改 */
  border-color: #3b82f6 transparent transparent transparent;
}

/* 下载按钮 - 绝对定位到右下角 */
.download-btn {
  position: absolute;
  bottom: 15px;
  right: 15px;
  padding: 6px 12px;
  background-color: #3b82f6;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

/* 其他样式优化（可选） */
.card-name {
  font-size: 18px;
  font-weight: 600;
}
.card-description {
  margin: 10px 0;
  color: #666;
}
.card-container {
  display: grid;
  gap: 10px;
}
</style>

<div class="card-container" v-for="data in datas">
  <div class="download-card" >
    <h1 class="heading">
      <span class="card-name">{{data.name}} <Badge type="tip" :text="data.version" /></span>
    </h1>
    <p class="card-description">{{data.description}}</p>
    <a :href="data.downloadUrl" class="download-btn" target="_blank">
      下载软件
    </a>
  </div>
</div>
