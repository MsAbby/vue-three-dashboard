## I. mock 假数据

> 模拟后台返回的权限列表

### 第一步： 安装需要的插件

```js
npm  i mockjs  vite-plugin-mock
yarn add mockjs  vite-plugin-mock
```






### 第二步： 在 vite.config.ts 文件中配置 vite-plugin-mock

```js
//导入插件
import { viteMockServe } from "vite-plugin-mock";

export default defineConfig({
	plugins: [
		vue(),
		viteMockServe({
			supportTs: false,
			logger: false,
			mockPath: "./mock/",
		}),
	],
});
```

> 问题 1： "vite-plugin-mock": "^3.0.1"， 配置 mock 数据时，vite.config.js 报错， “supportTs”不在类型“ViteMockOptions”中。ts(2353)<br />
> 解决方法：与 vite-plugin-mock 版本有关，新版本兼容不行，重新安装了 2.9.6 版本之后就不报错了。





### 第三步：创建 mock 文件夹

> 在根目录下创建 mock 文件夹 ，注意是根目录 ，新建文件 mock/index.js

```js

// mock数据
import Mock from 'mockjs'

const obj= Mock.mock({
    'list': [
        {
            'id':'@id',
            'name':'@cname',
            'title':'@ctitle(6,10)'
        }
    ]
})

export default [
    {
        url: "/api/stations",
        type: "get",
        response: () => {
            return obj.list
        }
    }
]
```




### 第四步： 在需要的页面调用

````js
//导入axios
import axios from axios
 
const getStationData = () => {
    axios.get("/api/stations").then(res => {
 
    const data = res.data
  })
}
 
//函数getStationData需要调用，如果不想调用可以直接把这个函数删掉
````
> 问题： Vue3解决：Mockjs 引入后并访问 404(Not Found) 的页面报错问题
````js
Uncaught (in promise) AxiosError {message: 'Request failed with status code 404', name: 'AxiosError', code: 'ERR_BAD_REQUEST', config: {…}, request: XMLHttpRequest, …}
````





## II. 分模块写假数据， 便于维护
> 在根目录下创建 mock 文件夹 ，注意是根目录 ，新建文件 mock/permission1.js

```js

// mock1 数据
import Mock from 'mockjs'

const obj= Mock.mock({
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
                    resourcesName: "管理",
                    resourcesUri: "/permissionName",
                    resourcesSort: 0,
                    resourcesType: "module",
                    sysSource: 0,
                    roleLevel: 1
                },
            ]
        }
    }
})

export default obj
```

> 在根目录下创建 mock 文件夹 ，注意是根目录 ，新建文件 mock/permission2.js
````js
// mock2数据： 后台返回的数据结构不一样
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
                    "userManage"
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
````



> 在根目录下创建 mock 文件夹 ，注意是根目录 ，新建文件 mock/index.js

````js
import permissionList1 from "./module/permission1";
import permissionList2 from "./module/permission2";

export default [
    {
        url: "/api/auth/queryUserPermission1",
        type: "get",
        response: () => {
            return permissionList1
        }
    },
    {
        url: "/api/auth/queryUserPermission2",
        type: "get",
        response: () => {
            return permissionList2
        }
    },
]
````

