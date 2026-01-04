---
layout: home
---

<template>
  <VPTeamPage>
    <VPTeamPageSection>
      <template #members>
        <!-- 外层容器，增加 v-if 确保数据加载后渲染 -->
        <div class="theme-card-container" v-if="themeList.length">
          <div 
            v-for="(item, index) in themeList" 
            :key="index"
            class="theme-card"
            @click="handleDownload(item.downloadUrl)"
          >
            <h3 class="theme-name">{{ item.name }}</h3>
            <p class="theme-version">v{{ item.version }}</p>
          </div>
        </div>
      </template>
    </VPTeamPageSection>
  </VPTeamPage>
</template>

<script setup>
// 方式1：直接定义数据（推荐，避免配置依赖）
const themeList = [
  { name: "默认主题", version: "1.0.0", downloadUrl: "/themes/default.zip" },
  { name: "暗黑主题", version: "1.1.2", downloadUrl: "/themes/dark.zip" }
];

// 方式2：从 VitePress 配置中读取（如果你的 theme 数据在 config.ts 里）
// import { useData } from 'vitepress';
// const { site } = useData();
// const themeList = site.value.themeConfig.theme;

// 下载函数（兼容 VitePress 静态资源路径）
const handleDownload = (url) => {
  // 静态资源路径补全（VitePress 静态文件放 public 文件夹下）
  const fullUrl = url.startsWith('/') ? url : `/${url}`;
  const link = document.createElement('a');
  link.href = fullUrl;
  link.download = fullUrl.split('/').pop();
  link.click();
  URL.revokeObjectURL(link.href);
};
</script>

<!-- 移除 scoped，或用 :deep() 穿透 -->
<style>
.theme-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 24px 0;
  width: 100%;
}

.theme-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.theme-card:hover {
  border-color: #4299e1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.theme-name {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.theme-version {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}
</style>
