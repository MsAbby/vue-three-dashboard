<template>
	<a-sub-menu :key="route.key">
		<template #icon><SettingOutlined /></template>
		<template #title>{{ route.meta.title }}</template>
		<template v-for="item in route.meta.children" :key="item.key">
			<template v-if="!item.children">
				<a-menu-item :key="item.key" @click="menuItemClick(item)">
					{{ item.title }}
				</a-menu-item>
			</template>
			<template v-else>
				<sub-menu
					:key="item.key"
					:menu-info="item"
					@menuItemClick="menuItemClick(item)"
				></sub-menu>
			</template>
		</template>
	</a-sub-menu>

	
	
</template>

<script lang="ts" setup name="SubMenu">

import { computed } from "vue";
import { useStore } from "vuex";

const whiteColors = ["#fff", "#ffffff", "#FFF", "#FFF", "rgb(255, 255, 255)"];

defineProps({
	route: {
		type: Object,
		default: () => {
			return {};
		},
	},
});

const store = useStore();



// const theme = computed(() => {
//   return store.getters['setting/theme'];
// });

const menuBgColor = computed(() => {
	// return themeOptions[theme.value].menuBgColor;
});

const isBlack = computed(() => {
	// return whiteColors.indexOf(menuBgColor.value) === -1;
});
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
