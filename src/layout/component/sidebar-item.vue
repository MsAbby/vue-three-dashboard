<template>
	<!-- 没有子菜单时 -->
	<el-menu-item
		v-if="!item.meta || !item.children"
		:key="item.path"
		:index="item.children ? item.children[0].path : item.path"
	>
		<!-- <component
      class="menu-icon"
      v-if="item.children ? item.children[0].meta.icon : item.meta.icon"
      theme="outline"
      size="14"
      strokeWidth="3"
      :is="item.children ? item.children[0].meta.icon : item.meta.icon"
    /> -->
		<template #title>
			<span class="title">
				{{ item.children ? item.children[0].meta.title : item.meta.title }}
			</span>
		</template>
	</el-menu-item>

	<!-- 有子菜单时: 第一步展示父菜单， 第二步循环展示子菜单 -->
	<a-sub-menu v-else :index="item.path">
		<template #title>
			<!-- <component
        class="menu-icon"
        v-if="item.meta.icon"
        theme="outline"
        size="14"
        strokeWidth="3"
        :is="item.meta.icon"
      /> -->
			<span class="title">{{ item.meta.title }}</span>
		</template>
		<template v-for="(option, index) in item.children">
			<menu-item v-if="option.children" :key="option.path" :item="option" />
			<a-menu-item v-else :index="option.path" :key="index">
				<!-- <component
          class="menu-icon"
          v-if="option.meta.icon"
          theme="outline"
          size="14"
          strokeWidth="3"
          :is="option.meta.icon"
        /> -->
				<span class="title">
					{{ option.meta.title }}
				</span>
			</a-menu-item>
		</template>
	</a-sub-menu>
</template>

<script>
export default {
	name: 'MenuItem',
};
</script>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const whiteColors = ['#fff', '#ffffff', '#FFF', '#FFF', 'rgb(255, 255, 255)'];

defineProps({
	item: {
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
