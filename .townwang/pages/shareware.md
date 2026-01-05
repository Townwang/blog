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

<div data-v-f5090ebe="" data-v-d8beba3b="" class="VPFeatures VPDownloadFeatures">
	<div data-v-f5090ebe="" class="container">
		<div data-v-f5090ebe="" class="items">
			<div data-v-f5090ebe="" class="item grid-4" v-for="data in datas">
				<a data-v-549c013f="" data-v-f5090ebe="" class="VPLink link no-icon VPFeature" :href="data.downloadUrl">
					<article data-v-549c013f="" class="box"><!--v-if-->
						<h2 data-v-549c013f="" class="title">{{data.name}}<Badge type="tip" :text="data.version" /></h2>
						<p data-v-549c013f="" class="details">{{data.description}}</p>
						<div data-v-549c013f="" class="link-text">
							<p data-v-549c013f="" class="link-text-value">Download</p>
						</div>
					</article>
				</a>
			</div>
		</div>
	</div>
</div>
