<template>
	<!-- 没有孩子的 -->
	<a-menu-item :key="route.path" v-if="!route.children">
		<template #icon>{{ route.meta.title}}</template>
		<template #title>{{ route.meta.title}}</template>
	</a-menu-item>
	<!-- 有孩子的 -->
	<a-menu-item :key="route.path" v-else>
		<template #icon>{{ route.meta.title}}</template>
		<template #title>{{ route.meta.title}}</template>
		<!-- <template>
			<MenuItem
				v-for="options in routes.children"
				:key="options.path"
				:route="options"
			></MenuItem>
		</template> -->
	</a-menu-item>
	
</template>

<script>
export default {
	name: "MenuItem",
};
</script>

<script setup>
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
