
/**
 * 基础路由
 * RouteRecordRaw：属于类型定义， 是 Vue Router 4.x 中新增的类型，用于定义路由配置。它是一个 TypeScript 类型
 */
import { RouteRecordRaw } from "vue-router";

// 导出静态路由
export const constantRouter: RouteRecordRaw[] = [
	{ path: '/', redirect: '/login' },
	{
		path: "/login",
		name: "login",
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/views/errorPages/404.vue"),
	},
];

// 白名单(路径)
export const whiteRouterList = ["/login", "/404"];
