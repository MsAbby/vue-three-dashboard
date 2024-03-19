
<template>
	<div v-if="menuRouter.length">
		<template v-for="item in menuRouter" :key="item.path">
			<!-- 一级菜单: 无子菜单: item.children && item.children.length === 1 -->
			<!-- !item.children : 循环时里面没有children-->
			<a-menu-item v-if="!item.children || (item.children && item.children.length === 1)" :key="item.name">
				<!-- 注意：此处to属性中用的是name值，而不是path；如果用path, router/index.ts中的子菜单path应该定义为“/父菜单路由/子菜单路由”，例如：将“role”改为“/system/role”。 -->
				<router-link :to="{ name: item.name }" @click="handelMenuJump(item)">
					<!-- <Icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" /> -->
					<span>{{ item.meta && item.meta.title }}</span>
				</router-link>
			</a-menu-item>

			<!-- 存在子级菜单 -->
			<a-sub-menu v-else>
				<!-- 组名称 -->
				<template #title>
					<router-link :to="{ name: item.name }">
						<!-- <SyncOutlined v-if="item.meta && item.meta.icon" :icon="item.meta.icon" /> -->
						<span>{{ item.meta && item.meta.title }}</span>
					</router-link>
				</template>
				<!-- 递归子菜单 -->
				<SubMenu :menuRouter="item.children" />
			</a-sub-menu>
			</template>
		</div>
	</template>

<script lang="ts" setup name="SubMenu">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useCacheMenuStore } from "../../store/keepAlive";
// keepAlive store
const cacheMenuStore = useCacheMenuStore();

/**
 * @description: 第一步：获取所有路由
 */
const router = useRouter();

defineProps({
	menuRouter: {
		type: Object,
		default: () => {
			return {};
		},
	},
});

const handelMenuJump = (item) => {
	cacheMenuStore.removeCacheMenu(item.name)
}

</script>
<style lang="less" scoped>
.menu-icon,
.icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	// width: $base-icon-width-big !important;
	// height: $base-icon-height-super-max !important;
	// margin-right: $base-margin-5;
	// visibility: initial !important;
}
</style>
