# Vue 3 + TypeScript + Vite + antd
[demo](http://www.lelebk.com/docs/guide/#%E5%8A%9F%E8%83%BD)

+ vue3 + ts + vite
+ vue3需要nodeJS的版本最低是node14.18.0
+ npm install ant-design-vue --save // 全局引入不推荐

## vite按需加载
vite.config.js文件
```js
import ViteComponents, {
  AntDesignVueResolver
} from 'vite-plugin-components';
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    /* ... */
    vue(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()],
    }),
  ],
};
```
## Recommended IDE Setup
+ npm i
+ nvm use 14.21.1
+ npm run dev

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
// 组件
const emit = defineEmits(["getValue"]) 
const transValue = () => {
  emit("getValue", value.value)
}

// js中
setup(props, context) {
  onMounted(() => {
    nextTick(() => {
        context.emit('initParams', { ...qData.params });
    })
  })

````

## 11. vue2之this.$refs.xxx(标签写ref)可拿到dom元素
````js
const form = ref(null)
form.value.validate(valid => {
    if (!valid) return;
    this.$emit('search', {...this.params});
});
````

## 12. nextTick
````js
import { reactive, toRef, ref, nextTick } from 'vue'
await nextTick()
nextTick(()=>{
  otherParam.showA = true
})
````

## 13. 关于vue 的 h 函数
### h函数
+ vue 的render函数中无法渲染element组件库的标签， 原样输出的
+ 缺点： h 函数，可处理动态性更高的场景。但如果是复杂的场景，h 函数写起来就显得非常繁琐，需要自己把所有的属性都转变成对象。并且组件嵌套的时候，对象也会变得非常复杂

````vue
<template>
  <Btn></Btn>
</template>

<script lang='ts' setup>
import { h} from 'vue'
const Btn = (props: Props, ctx: any) => {
    return h('div', {
        class: 'p-2.5 text-white bg-green-500 rounded shadow-lg w-20 text-center inline m-1',
    }, h('el-button', { type: "primary"}, '添加'))
}
</script>
````

## 14. vite中， computed 写法
````js
  import { computed, toRef, reactive } from "vue";
 
  let person = reactive({ name: "老天师", age: 123, like: "雷法" });
 
  const { name, age, like } = toRef(person);
  
  const names = computed(() => {
    return `${age.value}岁的${name.value}熟练使用无敌的${like.value}`;
  });

````

### jsx语法
+ 解决方案： render函数中解析组件库的标签要使用jsx语法
+ 默认的情况下，vue3+vite的项目不支持jsx，如果想支持jsx，需要安装插件@vitejs/plugin-vue-jsx

````js
// 安装
npm i @vitejs/plugin-vue-jsx -D


// vite.config.js
import vueJsx from "@vitejs/plugin-vue-jsx"; // 配置vue使用jsx
export default defineConfig({plugins: [vue(), vueJsx()]});

// 组件使用
<script lang="jsx">
  import { ref } from "vue";
  export default {
    setup() {
      const count = ref(100);
      return () => <div>测试文件</div>
    }
  }
</script> 

// jsx 文件中使用  index.jsx
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => <div>jsx文件</div>
  }
}) 
````

## vue3中没有mixin，也不需要mixin ，使用函数式组件

````js
// App.vue
<template>
  <hello name="tom">欢迎</hello>
</template>
<script lang="ts">
import { defineComponent,h } from "vue";
 
const Hello = (props:any,context:any)=>{
  return h('h1',props,context.slots)
};
 
Hello.props = ['name']
 
export default defineComponent({
  components:{
    Hello
  }
});
</script>

````


### 按需引入echarts


yarn add echarts --S

main.js 要注入
import echarts from "./plugins/echarts/index";
app.config.globalProperties.$echarts = echarts;


visualMap visualMap-piecewise 可以自定义tooltips


