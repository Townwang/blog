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

<div class="container" >
	<div class="items">
	  <div class="item grid" v-for="data in datas">
		<a class="VPLink link no-icon VPFeature" :href="data.downloadUrl">
		   <h2 class="title">{{data.name}} <Badge type="tip" :text="data.version" /></h2>
		<p class="card-description">{{data.description}}</p>
		<div class="link-text"><p class="link-text-value">download <span class="vpi-arrow-right link-text-icon"></span></p></div>
		</a>
	  </div>
 </div>
</div>
