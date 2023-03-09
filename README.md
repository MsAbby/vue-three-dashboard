# Vue 3 + TypeScript + Vite

+ vue3 + ts + vite
+ vue3需要nodeJS的版本最低是node14.18.0

## Recommended IDE Setup
+ npm i
+ nvm use 14.21.1
+ npm run serve

## less

+ 自己集成

## 组件
+ 引入即可

````js
// 使用
<SideBar></SideBar>

// 引入
import SideBar from './sidebar/index.vue'
````

## 路由使用

````js
import { useRouter } from 'vue-router'
const router = useRouter()
````

## 生命周期使用

````js
// 引入
import { onMounted } from 'vue'

// 使用
onMounted(() => {
    console.log(router)
})
````

## store使用

````js
// main.ts
import store from './store'
app.use(store)

// 组件中
import { useStore } from 'vuex';
const store = useStore()

````