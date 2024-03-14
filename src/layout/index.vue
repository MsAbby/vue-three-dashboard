
<template>
	<div class="layout">
		<!-- 头部 -->
		<a-layout-header
			class="header"
			style="background: #fff;
			padding: 0"
		>
			<HeaderBar v-model:collapsed="collapsed" />
		</a-layout-header>
		<!-- 主体部分 -->
		<a-layout style="width: 100%; height: 100%; " theme="light">
			<!-- 左侧边栏 -->
			<a-layout-sider
				width="256"
				style="background: #F3F4F6;"
			 	v-model:collapsed="collapsed"
				:trigger="null"
				collapsible
			>
				<layout-sidebar :collapsed="collapsed" />
			</a-layout-sider>
			<!-- 右侧内容 -->
			<a-layout-content
				class="container"
				:style="{ margin: '24px 16px', minHeight: '280px' }"
			>	
				<!-- 面包屑 -->
				<Breadcrumb />
				<!-- 顶部tab -->
				<TabBar />
				<!-- 内容切换 -->
				<div class="main__container">
					{{ includeList }}
					<router-view v-slot="{ Component }">
						<keep-alive :include="includeList">
							<component :is="Component" />
						</keep-alive>
					</router-view>
				</div>
			</a-layout-content>
		</a-layout>
	</div>
</template>
<script setup lang="ts">
/*
 ** reactive:  只能 给对象、数组添加响应式
 **      ref:  给值类型添加响应式
 **    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
 */
import { reactive, computed, ref } from "vue";
import Breadcrumb from "./breadcrumb/index.vue";
import layoutSidebar from './sideBar/index.vue'
import HeaderBar from './headerBar/index.vue'
import TabBar from './tabBar/index.vue'
import { useCacheMenuStore } from "../store/keepAlive";

const cacheMenuStore = useCacheMenuStore();

// 缓存的路由页面
const includeList = computed(() => cacheMenuStore.includeList);

const collapsed = ref<boolean>(false);

</script>

<style scoped lang="less">
.layout {
	overflow: hidden;
	height: 100vh;
	.header {
	  background-color: #FFF;
	  padding: 0;
	}
	.container {
	  overflow-y: auto;
	  overflow-x: hidden;
	}
	&.container::-webkit-scrollbar {
	  width: 6px;
	}
	&.container::-webkit-scrollbar-thumb {
	  border-radius: 10px;
	  box-shadow: inset 0 0 5px #d8d8d8;
	  background: #C1C1C1;
	}
	&.container::-webkit-scrollbar-track {
	  box-shadow: inset 0 0 5px #d8d8d8;
	  background: #ededed;
	}
  }
</style>
<style lang="less">
.layout {

}
</style>
