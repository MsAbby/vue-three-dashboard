
import axios from "axios";
import { Router, RouteRecordRaw } from "vue-router";
import { usePermissionStore } from "../store/permission";



// 权限验证
const loginPath = "/login";
const defaultPath = '/';



export const permission = (router: Router) => {
        // 路由跳转
        router.beforeEach(async (to, from, next) => {
            //   if (storage.get('token')) {
            if (to.path === "/login") {
                    next("/");
                } else {
                    console.log("111mmm=========")
                    // 若不存在用户信息，则需要获取用户信息
                    // if (!store.getters.hasUserInfo) {
                    axios.get("/api/auth/queryUserPermission2").then((res) => {
                        // 处理用户权限，筛选出需要添加的权限
                        usePermissionStore().setFilterRoutes(res.data.permission.menu);
                        // 利用 addRoute 循环添加
                        const filterRoutes = usePermissionStore().getFilterRoutes();
                        filterRoutes.forEach((item) => {
                            router.addRoute(item);
                        });
                    });
                    // 添加完动态路由之后，需要在进行一次主动跳转
                    return next(to.path);
                    // }
                    // next()
                }
        
            //   } else {
            //     if (whiteList.includes(to.path)) {
            //       next()
            //     } else {
            //       next({ path: loginPath, query: { redirect: to.fullPath } })
            //     }
            //   }
    });
};
