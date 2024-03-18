1. 修改ant-design-vue菜单颜色
方案： 直接重写了类名样式，个人觉得不太友好，后期看看有没有更合适的方案

2. 增加面包屑
3. 增加tab标签（切换tab需要有缓存）



4. vue3中keep-alive使用include不生效
每个组件都要写name
+ 原因： Vue3的setup语法糖，导致无法自定义组件name，使用keep-alive是需要name的，所以include不生效。
解决这个问题通常有两种方式

+ 方式一：是通过写两个script标签来解决，一个使用setup，一个不使用
+ 方式二：借助vite-plugin-vue-setup-extend插件
````js
npm install vite-plugin-vue-setup-extend --save

配置vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ]
})
<!-- 组件中使用 -->
<script setup name='testAddName'></script>
````

5. vue3 ant-design a-button icon 自定义svg

6.vue3 ant-design 全局主题色修改,
+ layout文件中修改
````js

<template>
	<div class="app-content" id="add">
		<a-config-provider :theme="theme">
			<router-view></router-view>
		</a-config-provider>
	</div>
</template>

<script lang="ts" setup>
const theme = {
	token: {
		colorPrimary: "#CE0D2D",
	}
};
````

7. 配置mock数据时，vite.config.js报错
> "vite-plugin-mock": "^3.0.1", 对象字面量只能指定已知属性，并且“supportTs”不在类型“ViteMockOptions”中。ts(2353)
+ 解决方法：与vite-plugin-mock版本有关，新版本兼容不行，重新安装了2.9.6版本之后就不报错了。


8. pinia 和store一样刷新就没了


9. 关于 vue-router 和main.js 和app.vue 的关系
> 在Vue.js项目中，vue-router是用来管理单页面应用中视图的路由系统。main.js是项目的入口文件，通常会在这个文件中配置Vue实例以及相关的全局配置，如插件、路由等。App.vue是一个Vue组件，通常作为应用的根组件，包含了整个应用的页面结构。

+ 关系概述：

+ + main.js 中通过 new Vue() 创建Vue实例，并引入 vue-router 实例。

+ + main.js 中还会注册全局组件，如 App.vue。

+ + App.vue 包含了顶级布局和其他页面组件的插槽，用来渲染当前路由对应的视图。

10. vue-router 4.x 没有hidden属性

11. 报错： pinia.js?v=e5cb783a:1455 Uncaught Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
> 在setup()中，你可以随便使用useStore，隐含意思就是在js或别的文件中，就不能随便用了
+ 如果没有SSR, 在使用app.use(pinia)安装pinia插件后，任何useStore调用都起作用。 倒入顺序很重要，
````

import { usePermissionRouterStore } from "../store/router";
import { useUserInfoStore } from "../store/user";

const permissionRouterStore = usePermissionRouterStore();
const userInfoStore = useUserInfoStore();

<!-- 以上会报错 -->



router.beforeEach(async (to, from, next) => {
	NProgress.start();
	const permissionRouterStore = usePermissionRouterStore();
	const userInfoStore = useUserInfoStore();
})

````


12. addRouter动态添加的路由存在内存里面的（就像vue的根实例，axios的实例,router的实例），刷新就没了，所以刷新后必须要重新执行添加路由。
> 解决方法：
+ 1、如果保持以过滤路由是否存在作为判断，那过滤路由就不能存在session里，而是存在js的某个变量里（比如vux的state），使得刷新页面后一起重新来过。
+ 2、或者定义个变量标记来判断


<!-- yarn: 安装忽略版本：yarn config set ignore-engines true  -->




