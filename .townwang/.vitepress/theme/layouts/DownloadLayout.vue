<!-- blog/.townwang/.vitepress/theme/components/Downloads.vue -->
<template>
     <div 
     class="features"
     v-for="(item, index) in features"
     :key="index">
        <div
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
   // 1. 无日期字段 → 直接显示
   if (!targetDateStr) return true
   // 2. 解析 ISO 格式日期字符串（自动识别 UTC 时区）
   const targetDate = new Date(targetDateStr)
   // 解析失败时默认显示
   if (isNaN(targetDate.getTime())) return true
   // 3. 构建今天的 UTC 00:00:00 时间
   const today = new Date()
   const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
   // 4. UTC 时间对比：今天 >= 目标日期 → 显示
   return todayUTC >= targetDate
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
