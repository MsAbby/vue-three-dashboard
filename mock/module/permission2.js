
// mock数据
import Mock from 'mockjs'

const permissionList2 = Mock.mock({
    response: {
        code: "000000",
        description: "SUCCESS",
        data: {
            // 头像
            avatar: "",
            id: "987978798797998979",
            userName: "张三",
            userCount: "zs00123122",
            permission: {
                menus: [
                    "dashboard",
                    "welcome",
                    "home",
                    "echarts",
                    "echarts-demo-one",
                    "echarts-demo-one-1",
                    "echarts-cost",
                    "echarts-cost2",
                    "echarts-cost4",
                    "health",
                    "health-demo-one",
                    "tables",
                    "tables-demo-one",
                    "cost",
                    "echarts-cost2"
                ]
            },
            role: {
                id: "1",
                title: "超级管理员"
            }
        }
    }
})

export default permissionList2