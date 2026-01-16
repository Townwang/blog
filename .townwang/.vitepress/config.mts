import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OpenApe",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'keywords', content: 'open-source, openApe, open, ape, town, townwang, engine, software' }]
  ],
  lang: 'zh',
  description: "A hub for diverse Android open-source projects. For more open-source content, search the official account 👉 'OpenApe'",
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Watch', link: '/pages/watchtheme' },
      { text: 'Shareware', link: '/pages/shareware' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Townwang' }
    ],
    sitemap: {
      hostname: 'https://townwang.com'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: "Copyright  © 2012-2025 <a href='https://github.com/Townwang'>Townwang</a>"
    }
  }
})