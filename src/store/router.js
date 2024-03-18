/**
 * 生成动态路由权限
 */
import { defineStore } from 'pinia'
// 引入静态路由
import { constantRouter } from '@/router/constant.router'
// 引入动态路由
import { dynamicRoutes } from '@/router/dynamic.router'

export const usePermissionRouterStore = defineStore('permissionRouterStore', {
    state: () => ({
        // 获取的全部路由
        routes: [],
        // 获取的权限路由
        permissionRoutes: [],
    }),
    getters: {
        getFilterRoutes: () => this.permissionRoutes,
    },
    actions: {
        /**
         * @description: 循环遍历本地写的动态路由，有权限的就记录
         * @param {*} routerList：前端本地写的动态路由
         * @param {*} apiRouterList： 后台返回的菜单权限列表
         * @returns 返回最后有权限的路由
         */
        mapRouterList(routerList, apiRouterList) {
            const finallyRoutes = [];
            routerList.forEach(item => {
                // 有权限
                if (item.meta.permission && apiRouterList.includes(item.meta.permission)) {
                    // 路由有children, 需要再次循环
                    if (item.children) {
                        item.children = this.mapRouterList(item.children, apiRouterList)
                    }
                    finallyRoutes.push(item);
                }
            })
            return finallyRoutes
        },
        /**
         * 根据权限筛选路由
         * 1. 得到api返回的菜单权限
         * 2. 过滤得到权限列表
         * 3. 设置最终路由（拼接公共路由 + 权限路由）
         */
        setFilterRoutes(routes) {
            return new Promise((resolve) => {
                let apiRouterList = JSON.parse(JSON.stringify(routes));
                // 进行递归解析, apiRouterList后端获取的权限列表["权限1", "权限2"]
                const res = this.mapRouterList(dynamicRoutes, apiRouterList);
                console.log("++++", res)
                // 得到权限路由
                this.permissionRoutes = res;
                // 得到所有路由
                this.routes = constantRouter.concat(res);
                console.log("this.permissionRoutes", this.permissionRoutes)
                resolve(res)
            })
        }
    },
})