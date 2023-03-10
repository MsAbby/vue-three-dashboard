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

## router路由使用

````js
import { useRouter } from 'vue-router'
const router = useRouter()

router.push('/login')
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

await store.dispatch('模块名/方法名');

````

## 使用ui
````js
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
````

## vue2 data 数据 改写成vue3
````js
// vue2
data() {
    return {
        expland: true,
        btnLoading: false
    }
},

// vue3
import { defineComponent, h, ref, reactive } from 'vue' 
const expland = ref(true)
const btnLoading = ref(false)

````