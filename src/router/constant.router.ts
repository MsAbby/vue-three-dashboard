
/**
 * 基础路由
 * RouteRecordRaw：属于类型定义， 是 Vue Router 4.x 中新增的类型，用于定义路由配置。它是一个 TypeScript 类型
 */
import { RouteRecordRaw, _RouteRecordBase } from "vue-router";

// 解决 RouteRecordRaw 没有hidden属性
declare module 'vue-router'{
    interface _RouteRecordBase {
        hidden?: boolean
    }
}
  
// 导出静态路由
export const constantRouter: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "Login",
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: "登录"
		},
		hidden: true
	},
	{
		path: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/welcome',
		children: [{
			path: 'welcome',
			name: 'Welcome',
			component: () => import('@/views/welcome/index.vue'),
			meta: {
				title: '欢迎页',
				icon: 'icon-code',
			},
		}]
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/errorPages/404.vue"),
		hidden: true
	},
	// {
	// 	// 此写法解决动态路由页面刷新的 warning 警告
    //     path: '/:pathMatch(.*)*',
    //     component: () => import('@/views/errorPages/404.vue'),
    //     hidden: true
    // },
];
