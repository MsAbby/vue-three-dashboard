<template>
	<div>
		<a-tabs
			v-model:activeKey="tabActive"
			hide-add
			size="small"
			type="editable-card"
			class="tabs-content"
			:tabBarStyle="tabBarStyle"
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

const tabBarStyle = {
	color: "rgba(0, 0, 0, 0.65)",
}

// keepAlive store
const cacheMenuStore = useCacheMenuStore();

// tabs store
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
		if (current && current.fullPath !== "welcome") {
			// 1. 往store中，添加tab
			tabRouterStore.addTabRoutes(current);
			// 2. 设置tabActive: 找到当前路由, 选中
			tabActive.value = current.fullPath;
			// // 3. 设置缓存
			cacheMenuStore.setCacheMenu(current.name);
		}
	},
	{ immediate: true }
); 

/**
 * @description: tab点击
 * @param { string } targetKey 点击的tabKey
 */
 const handleTabClick = (targetKey: string) => {
	// 点击的是不同的tab时
	if (router.currentRoute.value.fullPath !== targetKey) {
		// 1. 路由跳转
		router.push(targetKey);
	}
};

/**
 * @description: 删除tab
 * @param { string } targetKey 点击的tabKey
 * @param { string } action 事件类型（编辑、删除）
 */
const handleTabRemove = (targetKey: string, action: string) => {
	if (action === 'remove') {
		const len = tabRouteList.value.length
		// 长度为1:
		if (len === 1) {
			// 跳转welcome, 再删除tab（页面没有一个tab）
			router.push("/welcome")
		}
		// 长度大于1：
		else {
			// 删除的是高亮的tab, targetKey的前一个tab高亮跳转
			tabRouteList.value.map((item, index) => {
				if (item.fullPath === targetKey) {
					tabActive.value = tabRouteList.value[index - 1]["fullPath"]
					router.push(tabActive.value)
				}
			})
		}
		tabRouterStore.deleteTabRoutes(targetKey)
    }
};
</script>
<style scoped>
</style>
