<template>
	<div>
		<a-tabs
			v-model:activeKey="tabActive"
			hide-add
			size="small"
			type="editable-card"
			class="tabs-content"
			@tabClick="handleTabClick"
            @edit="handleTabRemove"
		>
			<a-tab-pane
				v-for="item in tabRouteList"
				:key="item.fullPath"
				:tab="item.meta.title"
			>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>
<script setup lang="ts" name="TabBar">
import { reactive, toRef, ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useTabRoutesStore } from "../../store/tabs";
import { useCacheMenuStore } from "../../store/keepAlive";

const cacheMenuStore = useCacheMenuStore();



// store
const tabRouterStore = useTabRoutesStore();

// 选中的tab（当前激活 tab 面板的 key）
let tabActive = ref("");

/**
 * @description: 第一步：获取所有路由
 */
const router = useRouter();

/**
 * @description: 第二步： 获取tab栏列表（路由列表）(来源：store中)
 */
 const tabRouteList = computed(() => {
    return tabRouterStore.getTabRoutes;
});

/**
 * @description: 第三步： 监听当前路由的变化（getter函数）
 * 1. 监听的目标是：router.currentRoute.value
 * 2. 监听到路由变化后： tabRouteList中添加tab
 * 3.router.currentRoute.value: { fullPath, href, path, query, params, matched}
 */
watch(
	// get
	() => router.currentRoute.value,
	// set
	(current) => {
		if (current) {
			// 1. 往store中，添加tab
			tabRouterStore.addTabRoutes(current);
			// 2. 设置tabActive: 找到当前路由, 选中
			tabActive.value = current.fullPath;
			// 3. 设置缓存
			cacheMenuStore.setCacheMenu(current.name);
		}
	},
	{ immediate: true }
); 

/**
 * @description: tab点击事件，往tab栏列表中新增tab
 * @param { string } targetKey 点击的tabKey
 */
 const handleTabClick = (targetKey: string) => {
	// 点击的是不同的tab时，路由跳转
	if (router.currentRoute.value.fullPath !== targetKey) {
		tabActive.value = targetKey;
		// 页面跳转
		router.push(targetKey);
	}
};

/**
 * @description: tab删除事件，往tab栏列表中删除tab
 * @param {*} targetKey
 */
const handleTabRemove = (targetKey: string) => {
    console.log("---------, targetKey")
	// tabRouterStore.deleteTabRoutes(params)
};

// const filterAffixtabs = (routes) => {
// 	let tabs = [];
// 	routes.forEach((route) => {
// 		if (route.meta && route.meta.affix) {
// 			tabs.push({
// 				fullPath: route.path,
// 				path: route.path,
// 				name: route.name,
// 				meta: { ...route.meta },
// 			});
// 		}
// 		if (route.children) {
// 			const temptabs = filterAffixtabs(route.children, route.path);
// 			if (temptabs.length >= 1) {
// 				tabs = [...tabs, ...temptabs];
// 			}
// 		}
// 	});
// 	return tabs;
// };
</script>
