---
layout: home
---

<script setup>
// 主题列表数据：替换为你的实际数据
const themeList = [
  { name: "主题A", version: "1.0.0", downloadUrl: "/path/to/themeA.zip" },
  { name: "主题B", version: "2.1.3", downloadUrl: "/path/to/themeB.zip" },
  { name: "主题C", version: "0.8.5", downloadUrl: "/path/to/themeC.zip" }
];

// 下载处理函数
const handleDownload = (url) => {
  // 创建a标签触发下载
  const link = document.createElement('a');
  link.href = url;
  link.download = url.split('/').pop(); // 自动提取文件名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>
<template>
  <VPTeamPage>
    <VPTeamPageSection>
      <template #members>
        <!-- 外层容器：控制卡片排版 -->
        <div class="theme-card-container">
          <!-- 循环渲染主题卡片 -->
          <div 
            v-for="(item, index) in themeList" 
            :key="index"
            class="theme-card"
            @click="handleDownload(item.downloadUrl)"
          >
            <!-- 名称 -->
            <h3 class="theme-name">{{ item.name }}</h3>
            <!-- 版本 -->
            <p class="theme-version">v{{ item.version }}</p>
          </div>
        </div>
      </template>
    </VPTeamPageSection>
  </VPTeamPage>
</template>

<style scoped>
.theme-card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px 0;
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
