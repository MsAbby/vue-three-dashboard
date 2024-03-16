import permissionList1 from "./module/permission1";
import permissionList2 from "./module/permission2";

export default [
    // 数组对象
    {
        url: "/api/auth/queryUserPermission1",
        type: "get",
        response: () => {
            return permissionList1
        }
    },
    // menu是数组字符串
    {
        url: "/api/auth/queryUserPermission2",
        type: "get",
        response: () => {
            return permissionList2
        }
    },
]