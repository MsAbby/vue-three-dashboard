<template>
	<div class="common-layout">
		<a-layout style="width: 100%; height: 100%">
			<!-- 左侧边栏 -->
			<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
				<SideBar></SideBar>
			</a-layout-sider>
			<a-layout>
				<a-layout-header style="background: #fff; padding: 0">
					<menu-unfold-outlined
						v-if="collapsed"
						class="trigger"
						@click="() => (collapsed = !collapsed)"
					/>
					<menu-fold-outlined
						v-else
						class="trigger"
						@click="() => (collapsed = !collapsed)"
					/>
				</a-layout-header>
                <a-layout-content
                    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
                >
                   <router-view></router-view>
                </a-layout-content>
			</a-layout>
		</a-layout>
	</div>
</template>
<script setup lang="ts">
/*
 ** reactive:  只能 给对象、数组添加响应式
 **      ref:  给值类型添加响应式
 **    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
 */
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { reactive, toRef, ref } from "vue";
import SideBar from "./sidebar/index.vue";

const collapsed = ref<boolean>(false);

const state = reactive({});
</script>

<style scoped>
.common-layout {
	width: 100%;
	height: 100%;
}
</style>
