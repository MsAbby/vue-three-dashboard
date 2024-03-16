// mock数据
import Mock from 'mockjs'

const permissionList1 = Mock.mock({
    response: {
        code: "000000",
        description: "SUCCESS",
        data: {
            accountId: 10983,
            accountName: "zs00333792",
            name: "张三",
            phone: "18888888888",
            deptName: "技术中心",
            deptId: 83,
            gender: 2,
            authResourcesList: [
                {
                    id: 64,
                    parentId: 60,
                    resourcesName: "账户管理",
                    resourcesUri: "/superSuPro/jurisdiction/admin",
                    resourcesSort: 0,
                    resourcesType: "module",
                    sysSource: 0,
                    roleLevel: 1
                },
                {
                    id: 65,
                    parentId: 60,
                    resourcesName: "角色管理",
                    resourcesUri: "/superSuPro/jurisdiction/role",
                    resourcesSort: 1,
                    resourcesType: "module",
                    sysSource: 0,
                    roleLevel: 1
                },
                {
                    id: 66,
                    parentId: 60,
                    resourcesName: "组织机构管理",
                    resourcesUri: "/superSuPro/jurisdiction/org",
                    resourcesSort: 0,
                    resourcesType: "module",
                    sysSource: 0,
                    roleLevel: 1
                },
                {
                    id: 3132,
                    parentId: 3050,
                    resourcesName: "信号库维护",
                    resourcesUri: "/ggp/vehicleSignal/library",
                    resourcesSort: 0,
                    resourcesType: "function",
                    sysSource: 0,
                    roleLevel: 1
                },
                {
                    id: 3133,
                    parentId: 3050,
                    resourcesName: "信号库维护-新增",
                    resourcesUri: "/ggp/vehicleSignal/library/add",
                    resourcesSort: 0,
                    resourcesType: "function",
                    sysSource: 0,
                    roleLevel: 1
                },
                {
                    id: 3134,
                    parentId: 3050,
                    resourcesName: "信号库维护-删除",
                    resourcesUri: "/ggp/vehicleSignal/library/delete",
                    resourcesSort: 0,
                    resourcesType: "function",
                    sysSource: 0,
                    roleLevel: 1
                }
            ]
        }
    }

})

export default permissionList1