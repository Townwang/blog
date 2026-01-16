---
layout: home
---

# GT6 Pro Theme
> How to install a theme? [Download](https://watch.townwang.com/watch/app/gadgetbridge.nightly_0.87.1.apk)

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection,
} from "vitepress/theme";

const themeName = [
  "3D机械苍穹",
  "3D建模动态",
  "3D麒麟机械",
  "GT系列玺佳10in1",
  "蹦迪太空人2",
  "超强商务",
  "超清机械夜光",
  "动态麒麟机械",
  "动态极奢绿鬼",
  "多彩情绪",
  "多色复古棱晶",
  "飞龙承运换景",
  "高山吸金纳福",
  "航空宇航员",
  "机甲游龙",
  "极境征途",
  "精英高端机械",
  "蓝龙机械动态",
  "亮橙动态机械",
  "梦幻宇宙动态",
  "破晓雪山徒步",
  "情绪小毛崽",
  "全景城市天气",
  "全景星际双模",
  "全能超级桌面",
  "商务机械黄黑",
  "奢华绿鬼新版",
  "至尊斗战圣佛",
  "智能银河商务",
];
const theme = themeName.map((item) => ({
  avatar: "https://watch.townwang.com/watch/theme/" + item + "/img.png",
  name: item,
  links: [
    {
      icon: {
        svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Download</title><path d="M19 9h-4V4H9v5H5l7 7 7-7zM4 19v2h16v-2H4z" fill="currentColor"/><path d="M12 13l-4-4h3V3h2v6h3l-4 4z" fill="currentColor"/></svg>',
      },
      link: "https://watch.townwang.com/watch/theme/" + item + "/download.hwt",
    },
  ],
}));
</script>
 <VPTeamPageSection>
    <template #members>
      <VPTeamMembers size="small" :members="theme" />
    </template>
 </VPTeamPageSection>
