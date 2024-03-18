
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
        next();

        const permissionRouterStore = usePermissionRouterStore();
        const userInfoStore = useUserInfoStore();

        // 如果是登录
        if (to.path === loginPath) {
            NProgress.done();
            next(loginPath);
        }
        // // 非登录
        else {
            // 获取接口路由
            const result: any = await userInfoStore.getUserInfo();
            const menus= result.permission.menus;
            // 获取最终权限路由
            const accessRoutes = await permissionRouterStore.setFilterRoutes(menus);
            console.log("resultresultresult", accessRoutes)
            // 动态挂载路由
            accessRoutes.forEach((item) => {
                router.addRoute(item)
            })
            console.log("+++++++", to)
            next({...to, replace:true})
        }
    });

    router.afterEach(() => {
        NProgress.done()
    })
})

