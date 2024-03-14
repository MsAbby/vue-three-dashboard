# vue3 状态管理工具-pinia

## 0. 前言
使用 Pinia，即使在小型单页应用中，你也可以获得如下功能：<br />

+ Devtools 支持
+ + 追踪 actions、mutations 的时间线
+ + 在组件中展示它们所用到的 Store
+ + 让调试更容易的 Time travel
+ 热更新
+ + 不必重载页面即可修改 Store
+ + 开发时可保持当前的 State
+ 插件：可通过插件扩展 Pinia 功能
+ 为 JS 开发者提供适当的 TypeScript 支持以及自动补全功能。
+ 支持服务端渲染



## 1. 安装

```js
npm install pinia -S
yarn add pinia
```




## 2. 创建 pinia 实例, 并挂载到 vue 中

> main.ts 文件中

```js
import {createPinia} from ‘pinia’
// 创建 Pinia 实例
const pinia = createPinia();
// 创建 Vue 实例
const app = createApp(App);
// 挂载到 Vue 根实例
app.use(pinia)
```




## 3. 创建 store

> 在 src 文件下创建一个 store 文件夹，并添加 index.ts

- store/index.ts

```js
import { defineStore } from "pinia";

/**
 * @description: 1. 定义容器defineStore、导出容器useMainStore
 * @param: 参数1：容器的ID("main")，必须是唯一的，后面Pinia会把所有的容器挂载到根容器
 * @param: 参数2：一些选项对象，也就是state、getter和action
 * @return: 返回值：一个函数，调用即可得到容器实例
 */
export const useTodoStore = defineStore("todo", {
	/**
	 * 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
	 * 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
	 * 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
	 */
	state: () => ({
		todo: [],
		filter: "all",
		nextId: 0,
	}),
	getters: {
		finishedTodo(state) {
			// 自动补全！
			return state.todo.filter((todo) => todo.isFinished);
		},
		unfinishedTodo(state) {
			return state.todo.filter((todo) => !todo.isFinished);
		},
		filteredTodo(state) {
			if (this.filter === "finished") {
				return this.finishedTodos;
			} else if (this.filter === "unfinished") {
				return this.unfinishedTodo;
			}
			return this.todo;
		},
	},
    // 同步异步皆可
	actions: {
		// 接受任何数量的参数，返回一个 Promise 或不返回
		addTodo(text) {
			this.todo.push({ text, id: this.nextId++, isFinished: false });
		},
	},
});
```





## 4. 高级写法
[参考案例](https://www.cnblogs.com/mcayear/p/17711313.html)
````js
// 为实现更多高级用法，你甚至可以使用一个函数 (与组件 setup() 类似) 来定义一个 Store：

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return { count, increment }
})
````






## 5.模块化概念

> 一般在 store 中创建多个文件，分别代表不同的模块

```js
// defineStore: 定义的模块(router)
export const useRouterStore = defineStore('router', {
    state: () => {
        return {
            router: “pinia 可以使用”
        }
    },
    // 通过 getter 修改 state
    getters: {},
    // 同步和异步操作
    actions: {}
})
```

```js
// defineStore: 定义的模块(user)
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: “pinia 可以使用”
        }
    },
    // 通过 getter 修改 state
    getters: {},
    // 同步和异步操作
    actions: {}
})
```

```js
// defineStore: 定义的模块(counter)
export const useCounterStore = defineStore('counter', {
    state: () => {
        return {
            // 使用的值
            counter: “pinia 可以使用”
        }
    },
    // 通过 getter 修改 state
    getters:{},
    // 同步和异步操作
    actions:{}
})
```

## 组件中使用

1. 引入使用的模块
2. 调用

```js
import {useCounterStore} from ‘@/store/counter';
const counterStore = useCounterStore();

console.log(counterStore.counter)

```
