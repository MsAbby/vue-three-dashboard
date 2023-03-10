import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import allRoutes from './all-routers';

interface routerInterface {
	path: string,
	name: string,
	component: ()=>{}
}

const constantRoutes: Array<RouteRecordRaw> = [
	{ path: '/', redirect: '/login' },
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
]

const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/layout',
		name: 'layout',
		component: () => import('@/layout/index.vue'),
		children: [
			{
				path: '/welcome',
				name: 'welcome',
				component: () => import('@/views/welcome/index.vue'),
			},
		].concat(allRoutes)
	},
]

const routes: Array<RouteRecordRaw> = [
	...constantRoutes,
	...dynamicRoutes
]
const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export const initRouter = (app: App<Element>) => {
	app.use(router)
}

export default router;
