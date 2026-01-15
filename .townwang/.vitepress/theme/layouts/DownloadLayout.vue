<!-- blog/.townwang/.vitepress/theme/components/Downloads.vue -->
<template>
  <div class="features">
    <!-- 增加空数据兜底提示 -->
    <div v-if="features.length === 0" class="empty-tip">
      暂无下载资源
    </div>
    <div 
      v-for="(item, index) in features" 
      :key="index"  <!-- 建议使用 item.id 作为 key 更稳定 -->
      class="feature-card"
      v-if="isEnable(item.date)"
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
</template>

<script setup>
import { VPBadge } from 'vitepress/theme'
import { computed } from 'vue'

const props = defineProps({
  features: {
    type: Array,
    required: true,
    default: () => []
  }
});

// 修复 isEnable 函数：优化日期对比逻辑，避免 NaN 异常
const isEnable = (date) => {
  if (!date) return true // 无 date 字段 直接显示

  let targetDate
  try {
    targetDate = typeof date === 'string' ? new Date(date) : date
    // 验证日期有效性
    if (isNaN(targetDate.getTime())) return true
  } catch (e) {
    return true
  }

  // 统一日期格式为 年-月-日 00:00:00 进行对比
  const now = new Date()
  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const compareTarget = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate())

  return currentDate >= compareTarget
}
</script>

<style scoped>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 1.5rem; 
  max-width: 1200px;
  margin: 0 auto;
  /* 确保空数据时容器高度正常 */
  min-height: 200px;
}

/* 空数据提示样式 */
.empty-tip {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--vp-c-text-2);
  padding: 2rem;
  font-size: 0.95rem;
}

.feature-card {
  padding: 1.5rem;
  padding-top: 2.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  transition: transform 0.2s ease;
  position: relative;
  padding-bottom: 4rem;
  /* 增加边框，确保卡片可见 */
  border: 1px solid var(--vp-c-divider-light);
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
  bottom: 1rem; /* 修复按钮位置：原 bottom:0 可能被遮挡 */
  right: 1.5rem;
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
  transition: all 0.2s ease;
}

/* 增加按钮 hover 效果 */
.feature-btn:hover {
  background-color: var(--vp-c-brand);
  color: var(--vp-c-white);
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
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
