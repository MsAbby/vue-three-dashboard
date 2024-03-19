<!--
 * @description: 面包屑组件
-->
<template>
	<div>
		1111
		<!-- <a-breadcrumb>
            <a-breadcrumb-item v-for="item in menuRouter" :key="item.path">
                <router-link :to="{ name: item.name }">{{ item.meta && item.meta.title }}</router-link>
            </a-breadcrumb-item>
		</a-breadcrumb> -->
	</div>
</template>
<script lang="ts" setup name="Breadcrumb">
import { computed } from "vue";

const menuRouter = [
	{
		path: "/",
		name: "测试",
		meta: {
			title: "测试1"
		}
	}
]

</script>
