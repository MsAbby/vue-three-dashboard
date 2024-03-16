/**
 * 控制路由权限
 */
import { defineStore } from 'pinia';
import { dynamicRoutes } from "@/router/dynamic.router"
import { constantRouter } from '@/router/constant.router'

export const usePermissionStore = defineStore('permissionStore', {
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
        setFilterRoutes(menus) {
            const filterRoutes = []
            // 路由权限匹配
            menus.forEach(key => {
                // 权限名 与 路由的 name 匹配
                console.log("1111", key, dynamicRoutes)
                permissionsRoutes.push(...dynamicRoutes.filter(item => item.name === key))
            })
            this.permissionsRoutes = [...constantRouter, ...filterRoutes]
        }
    },
});