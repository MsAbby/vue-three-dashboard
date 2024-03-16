/**
 * 路由
 */
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('routerStore', {
    state: () => ({
        // 权限路由表
        permissionsRoutes: [],
    }),
    getters: {
        getFilterRoutes: () => this.permissionsRoutes,
    },
    actions: {
        /**
         * 根据权限筛选路由
         * 1. 获取所有路由
         * 2. 设置最终路由（拼接公共路由 + 权限路由）
         */
        setFilterRoutes(router) {
            // 1. 后台接口请求，获取menu
            axios.get("/api/auth/queryUserPermission2").then((res) => {
                const filterRoutes = [];
                const menus = res.data.permission.menu;
                // 2. 本地路由和接口获取的menu对比
                dynamicRoutes.forEach(item => {
                    if (item.permission && menus.includes(item.permission)) {
                        filterRoutes.push(item);
                        router.addRoute(item)
                    }
                })
                this.permissionsRoutes = [...constantRouter, ...filterRoutes]
            });
        }
    },
})