import permissionList1 from "./module/permission1";
import permissionList2 from "./module/permission2";
import relativeCharts from "./module/product/relative";
import relativeChartsChildren from "./module/product/relativeChildren";

export default [
    {
        url: "/api/queryRelativeChartsChildren",
        type: "get",
        response: () => {
            return relativeChartsChildren
        }
    },
    {
        url: "/api/queryRelativeCharts",
        type: "get",
        response: () => {
            return relativeCharts
        }
    },
    
    /**
     * @description 获取用户权限
     * 数组对象
     */
    {
        url: "/api/auth/queryUserPermission1",
        type: "get",
        response: () => {
            return permissionList1
        }
    },
    /**
     * @description 获取用户权限
     * menu是数组字符串
     */
    {
        url: "/api/auth/queryUserPermission2",
        type: "get",
        response: () => {
            return permissionList2
        }
    },
]