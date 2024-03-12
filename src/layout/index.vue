
<template>
	<div class="layout">
		<!-- 头部 -->
		<a-layout-header
			class="header"
			style="background: #fff;
			padding: 0"
		>
			<layout-header v-model:collapsed="collapsed" />
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
			<a-layout>
				<breadcrumb></breadcrumb>
				<!-- 内容 -->
                <a-layout-content
					class="container"
                    :style="{ margin: '24px 16px', minHeight: '280px' }"
                >
					<router-view ></router-view>
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
import { reactive, toRef, ref } from "vue";
import breadcrumb from "./breadcrumb/index.vue";
import layoutSidebar from './sidebar/index.vue'
// import layoutTabs from './tabs/tabs.vue'
import layoutHeader from './header/index.vue'

const collapsed = ref<boolean>(false);

const state = reactive({});

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
//   &.ant-layout-sider-children {
//     overflow-y: auto;
//     overflow-x: hidden;
//   }
//   &.ant-layout-sider-children::-webkit-scrollbar {
//     width: 4px;
//   }
//   &.ant-layout-sider-children::-webkit-scrollbar-thumb {
//     border-radius: 10px;
//     box-shadow: inset 0 0 5px #d8d8d8;
//     background: #535353;
//   }
//   &.ant-layout-sider-children::-webkit-scrollbar-track {
//     box-shadow: inset 0 0 5px #d8d8d8;
//     background: #ededed;
//   }
}
</style>
