# Vue 3 + TypeScript + Vite

+ vue3 + ts + vite
+ vue3需要nodeJS的版本最低是node14.18.0

## Recommended IDE Setup
+ npm i
+ nvm use 14.21.1
+ npm run serve

## 01. less

+ 自己集成



## 02. 组件
+ 引入即可

````js
// 使用
<SideBar></SideBar>

// 引入
import SideBar from './sidebar/index.vue'
````



## 03. router路由使用

````js
import { useRouter } from 'vue-router'
const router = useRouter()

router.push('/login')
````


## 04. 生命周期使用

````js
// 引入
import { onMounted } from 'vue'

// 使用
onMounted(() => {
    console.log(router)
})
````


## 05. store使用

````js
// main.ts
import store from './store'
app.use(store)

// 组件中
import { useStore } from 'vuex';
const store = useStore()

await store.dispatch('模块名/方法名');

````




## 06. 使用ui
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




## 07. vue2 data 数据 改写成vue3
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



## 08. vue3 props

````js
const props = defineProps({
    title: String,
    info: String,
    author: String,
});// 对象形式声明 props
````

## 09. vue3 监听
````js
// 监听单个数据ref
watch(count, (newValue, oldValue) => {
  console.log('值发生了变更', newValue, oldValue);
});


// 深度监听
const count = ref({
  a: 1,
  b: 2
});
const handleClick = function () {
 count.value.a = 5;
};
watch(count, (newValue, oldValue) => {
  console.log('值发生了变更', newValue, oldValue);
});

// watch监听 props 中的基本类型数据，需要通过 getter 函数返回值的形式（()=>props.xxx）才能监听
````



## 10 子传父事件
````js
const emit = defineEmits(["getValue"])
const transValue = () => {
  emit("getValue", value.value)
}
````
