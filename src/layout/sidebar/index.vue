<template>
	<a-menu
		mode="inline"
		v-model:selectedKeys="selectedKeys"
		class="el-menu-vertical-demo"
	>
		<SidebarItem
			v-for="route in routes"
			:key="route.path"
			:route="route"
		/>
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
import SidebarItem from "../component/sidebar-item.vue";

const router = useRouter();
const store = useStore();
const selectedKeys = ref<string[]>(['/']);

let state = reactive({});

const routes = computed(() => {
	return store.state.routes.routes;
});
</script>
