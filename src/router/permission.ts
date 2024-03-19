
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
            // 跳出循环, 进入登录页面
            next();
            NProgress.done();
        }
        // 非登录
        else {
            try {
                // 先判断路由是否存在，防止重复加载，进入无限循环（很重要）
                const accessRoutesList = permissionRouterStore.getFilterRoutes;
                if (accessRoutesList === null || accessRoutesList.length === 0) {
                    // 获取接口路由
                    const result: any = await userInfoStore.getUserInfo();
                    const menus= result.permission.menus;
                    // 获取最终权限路由
                    const accessRoutes = await permissionRouterStore.setFilterRoutes(menus);
                    // 动态挂载路由: addRoute 每次加一个，加多个代表多个一级菜单
                    accessRoutes.forEach((item) => {
                        router.addRoute(item)
                    })
                    next({...to, replace:true})
                    NProgress.done();
                } else {
                    // 跳出循环, 进入对应页面
                    next();
                    NProgress.done();
                }
            } catch (error) {
                console.log(error)
            }
        }
    });

    router.afterEach(() => {
        NProgress.done()
    })
})

