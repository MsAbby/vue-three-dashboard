/**
 * 路由
 */
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('routerStore', {
    state: () => {
        return {
            router: []
        }
    },
    getters: {
        getRoutes: () => this.router,
    },
    actions: {
        setRoutes(router) {
            this.router = router;
        },
    }
})