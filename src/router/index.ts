
import { permission } from './permission'
import { constantRouter } from './constant.router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { dynamicRoutes } from "./dynamic.router"

// 实例化路由
const router = createRouter({
	history: createWebHashHistory("/"),
	routes: constantRouter,
});

// 动态挂载路由
dynamicRoutes.forEach((item) => {
	router.addRoute(item)
})

permission(router);

export default router;
