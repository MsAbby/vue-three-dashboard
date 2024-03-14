
/**
 * 需要缓存的页面
 * tab切换时需要缓存，菜单切换不需要缓存
 * 本页面采用高级写法
 */
import { defineStore } from 'pinia';
import { useRouter } from "vue-router";

const router = useRouter();

export const useCacheMenuStore = defineStore('cacheMenu',{
    state: () => {
        return {
            // 需要缓存的页面
            includeList: []
        }
    },
    getters: {
        getCacheMenu: () => this.includeList
    },
    actions: {
        // 设置缓存页面
        setCacheMenu(routeName) {
            if (routeName && !this.includeList.includes(routeName)) {
                this.includeList.push(routeName)
            }
        },

        // 移除缓存页面
        removeCacheMenu(routeName) {
            const index = this.includeList.indexOf(routeName)
            index > -1 && this.includeList.splice(index, 1)
        }
    } 
})