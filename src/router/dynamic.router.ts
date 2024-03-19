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
export const dynamicRoutes: Array<RouteRecordRaw> = [
	...[homeRouter],
	...[billboardsRouter],
	...[projectManageRouter],
	...[demandManageRouter],
	...[componentRouter],
	...[echartsRouter],
	...[tableRouter],
	...[healthRouter]
]


// 格式如下： 
/**
 * const router = [
 * {
 * 菜单一：
 * 		path: "/父路径",
 * 		component: () => import('@/layout/index.vue'), // layout
 * 		meta: {}
 * 		children: [{
 * 			path: 'billboards1',
 *  		name: 'billboards1',
 * 			component: () => import('@/views/billboards/index.vue'),
 * 			meta: {}
 * 		}]
 * },
 * 菜单一：
 * {    path: "/父路径",
 * 		component: () => import('@/layout/index.vue'), // layout
 * 		meta: {}
 * 		children: [{
 * 			path: 'billboards2',
 *  		name: 'billboards3',
 * 			component: () => import('@/views/billboards/index2.vue'),
 * 			meta: {}
 *		 },{
 * 			path: 'billboards2',
 *  		name: 'billboards3',
 * 			component: () => import('@/views/billboards/index2.vue'),
 * 			meta: {}
 *		 }]
 * }
 * 
 **/
