
import axios from "axios";
import { Router, RouteRecordRaw } from "vue-router";
import { useRouterStore } from "../store/router";


// 权限验证
const loginPath = "/login";
const defaultPath = '/';

export const permission = (router: Router) => {
        // 路由跳转
        router.beforeEach(async (to, from, next) => {
            //   if (storage.get('token')) {

            // 如果是登录页面
            if (to.path === loginPath) {
                next(defaultPath);
            }
            // 非登录页面
            else {
                console.log("111mmm=========")
                // 1. 处理用户权限，筛选出需要添加的权限
                useRouterStore().setFilterRoutes(router);
                
                // 添加完动态路由之后，需要在进行一次主动跳转
                return next(to.path);
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
