import { appendFile } from 'fs';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

const routes: Array<RouteRecordRaw> = [
	{ path: '/', redirect: '/home' },
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/home/index.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
	},
];
const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export const initRouter = (app: App<Element>) => {
	app.use(router)
}
