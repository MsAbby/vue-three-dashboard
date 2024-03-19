<!--
 * @date: 2023/09/11 18:19:23
 * @description: 侧边栏组件
-->


<template>
	<a-menu
		mode="inline"
		theme="light"
		class="el-menu-vertical-demo"
		v-model:selectedKeys="selectedKeys"
		v-model:openKeys="openKeys"
	>
		<!-- 引入子组件 -->
		<SubMenu :menuRouter="menuRouter" />
	</a-menu>
</template>

<script lang="ts" setup>
/*
 ** reactive:  只能 给对象、数组添加响应式
 **      ref:  给值类型添加响应式
 **    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
 */
import { computed, ref } from "vue";
import { usePermissionRouterStore } from '../../store/router';
import SubMenu from "./sub-menu.vue";

// 路由store
const routerStore = usePermissionRouterStore();

const props = defineProps({
	collapsed: Boolean
});

const selectedKeys = ref<string[]>(['/']);
const openKeys = ref<string[]>([])

// computed
const menuRouter = computed(() => {
	console.log("+++??????", routerStore.getFilterRoutes)
	return routerStore.getFilterRoutes;
});
</script>
