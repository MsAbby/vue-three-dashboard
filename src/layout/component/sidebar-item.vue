<template>
	<a-sub-menu :key="route.path">
		<div>{{ route.meta.title}}</div>
		<!-- <template #title>111</template>
		<template v-for="(options, index) in route.children" :key="index"> -->
			<!-- <template v-if="!options.children">
				<a-menu-item :key="option.path" @click="menuItemClick(route)">
					{{ route.title }}
				</a-menu-item>
			</template> -->
			<!-- <template v-else>
				<sub-menu
					:key="route.path"
					:menu-info="route"
					@menuItemClick="menuItemClick(route)"
				></sub-menu>
			</template> -->
		<!-- </template> -->
	</a-sub-menu>
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
