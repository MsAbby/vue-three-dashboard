
/**
 * 需要缓存的页面
 * tab切换时需要缓存，菜单切换不需要缓存
 * 本页面采用高级写法
 */
import { defineStore } from 'pinia';

export const useCacheMenuStore = defineStore('cacheMenu',{
    state: () => {
        return {
            // 需要缓存的页面
            includeList: []
        }
    },
    getters: {
        getCacheMen: () => this.includeList
    },
    actions: {
        // 设置缓存页面
        setCacheMenu(routeName) {
            if (routeName && !this.includeList.includes(routeName)) {
                this.includeList.push(routeName)
            }
        }
    } 

})