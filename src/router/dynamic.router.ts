/*
 * @description: 动态路由
 * RouteRecordRaw：属于类型定义， 是 Vue Router 4.x 中新增的类型，用于定义路由配置。它是一个 TypeScript 类型
 */

import { RouteRecordRaw } from "vue-router";
import homeRouter from './menus/home'
import billboardsRouter from './menus/billboards'
import projectManageRouter from './menus/project'
import demandManageRouter from './menus/demand'
import componentRouter from './menus/component'
import echartsRouter from './menus/echarts'
import tableRouter from './menus/table'
import healthRouter from './menus/health'

// ...[homeRouter]： 为了解决ts语法报错（必须具有返回迭代器的 Symbol.iterator 方法”）
let allRoutes = [
  ...[homeRouter],
  ...[billboardsRouter],
  ...[projectManageRouter],
  ...[demandManageRouter],
  ...[componentRouter],
  ...[echartsRouter],
  ...[tableRouter],
  ...[healthRouter]
]

// 导出动态路由
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('@/layout/index.vue'),
		meta: {
            title: '首页',
            icon: "Home",
			permission: "dashboard",
        },
		children: [
			{
				path: '/welcome',
				name: 'welcome',
				permission: "welcome",
				component: () => import('@/views/welcome/index.vue'),
				meta: {
					title: '欢迎页',
					icon: 'icon-code',
					permission: "welcome",
				},
			},
		].concat(allRoutes)
	},
]