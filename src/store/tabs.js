
/**
 * tab 栏路由列表
 */
import { defineStore } from 'pinia'

export const useTabRoutesStore = defineStore('tabRoutes', {
    state: () => {
        return {
            // tab列表
            tabRoutes: [],
        }
    },
    getters: {
        getTabRoutes() {
            return this.tabRoutes;
        },
    },
    actions: {
        /**
         * 1. 添加tab路由
         * 2. 现有tablist 匹配(传入的fullPath)，没有tab加入，有tab 不匹配，删除tablist
         * 3. $route.fullPath后面可以携带参数
         * 4. $route.path后面只是跟着地址
         */
        addTabRoutes(route) {
            let target = this.tabRoutes.find((item) => item.path === route.path);
            if (target) {
                if (route.fullPath !== target.fullPath) Object.assign(target, route);
                return;
            }
            this.tabRoutes.push(Object.assign({}, route))
            console.log("_______", this.tabRoutes);
        },

        /**
         * 1. 删除tab路由
         */
        deleteTabRoutes(route) {
            this.tabRoutes.forEach((item, index) => {
                if (item.path === route.path) this.tabRoutes.splice(index, 1);
            });
        },
    }
})