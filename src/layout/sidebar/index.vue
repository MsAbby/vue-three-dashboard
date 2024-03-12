
<template>
	<a-menu
		mode="inline"
		theme="light"
		v-model:selectedKeys="selectedKeys"
		class="el-menu-vertical-demo"
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
import { reactive, onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import SubMenu from "./sub-menu.vue";

const props = defineProps({
	collapsed: Boolean
});

const store = useStore();
const route = useRouter();
const selectedKeys = ref<string[]>(['/']);
const openKeys = ref<string[]>([])

// computed
const menuRouter = computed(() => {
	return store.state.routes.routes;
});
</script>
