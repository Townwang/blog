<!-- blog/.townwang/.vitepress/theme/components/Downloads.vue -->
<template>
  <div class="features">
    <!-- 新增日期判断：当前日期 >= item.showAfter 才显示 -->
<div 
  v-for="(item, index) in features" 
  :key="index"
  v-if="isAfterDate(item.showAfter)"
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
</template>

<script setup>
import { VPBadge } from 'vitepress/theme'

const props = defineProps({
  features: {
    type: Array,
    required: true,
    default: () => []
  }
});


const isAfterDate = (targetDateStr) => {
   // 容错1：入参为空，直接返回true（显示组件）
   if (!targetDateStr) return true
   // 容错2：强制解析 YYYY-MM-DD 格式，避免格式错误
   const [year, month, day] = targetDateStr.split('-').map(Number)
   if (!year || !month || !day) return true
   const targetDate = new Date(year, month - 1, day)
   const today = new Date()
   today.setHours(0, 0, 0, 0) // 重置当天时间为 00:00:00，避免时分秒干扰
   return today >= targetDate
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
}
</style>
