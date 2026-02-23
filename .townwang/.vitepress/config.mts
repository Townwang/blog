import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "开源人",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'keywords', content: '开源人,开源项目,原创开源,纯净软件,无捆绑软件,绿色软件,无广告软件,开源工具,免费开源,开源技术分享' }]
  ],
  lang: 'zh',
  description: "开源人博客，专注分享个人原创开源项目、无捆绑无广告纯净软件与绿色实用工具，提供干净免费的开源资源，做纯粹的开源技术分享平台。",
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    nav: [
      { text: '主页', link: '/' }
    ],
    sitemap: {
      hostname: 'https://townwang.com'
    },
    footer: {
      message: '基于 MIT 协议开源发布',
      copyright: "版权所有  © 2012-2026 <a href='https://github.com/Townwang'>开源人</a> · 专注开源"
    }
  }
})