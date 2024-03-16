
import { permission } from './permission'
import { constantRouter } from './constant.router'
import { createRouter, createWebHashHistory } from 'vue-router'

// 实例化路由
const router = createRouter({
	history: createWebHashHistory("/"),
	routes: constantRouter
});

console.log("-----", 2)

permission(router)

export default router;
