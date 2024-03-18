
/**
 * 获取后端路由数组，动态挂载路由permission.ts
 */
import { usePermissionRouterStore } from "../store/router";
import { useUserInfoStore } from "../store/user";

// 引入进度条
import NProgress from 'nprogress';
import'nprogress/nprogress.css'

// 固定路径
const loginPath = "/login";

export const permission = (router => {
    // 路由跳转
    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        const permissionRouterStore = usePermissionRouterStore();
        const userInfoStore = useUserInfoStore();

        // 如果是登录
        if (to.path === loginPath) {
            next(loginPath);
            NProgress.done();
        }
        // 非登录
        else {
            try {
                // 获取接口路由
                const result: any = await userInfoStore.getUserInfo();
                const menus= result.permission.menus;
                // 获取最终权限路由
                const accessRoutes = await permissionRouterStore.setFilterRoutes(menus);

                // 动态挂载路由
                accessRoutes.forEach((item) => {
                    router.addRoute(item)
                })
                router.options.routes = accessRoutes
                
                console.log("+++++++---------", to, router)
                next({...to, replace:true})
            } catch (error) {
                console.log(error)
            }
        }
    });

    router.afterEach(() => {
        NProgress.done()
    })
})

