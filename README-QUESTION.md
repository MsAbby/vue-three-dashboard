1. 修改ant-design-vue菜单颜色
方案： 直接重写了类名样式，个人觉得不太友好，后期看看有没有更合适的方案

2. 增加面包屑
3. 增加tab标签（切换tab需要有缓存）



4. vue3中keep-alive使用include不生效
每个组件都要写name
+ 原因： Vue3的setup语法糖，导致无法自定义组件name，使用keep-alive是需要name的，所以include不生效。
解决这个问题通常有两种方式

+ 方式一：是通过写两个script标签来解决，一个使用setup，一个不使用
+ 方式二：借助vite-plugin-vue-setup-extend插件
````js
npm install vite-plugin-vue-setup-extend --save

配置vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ]
})
<!-- 组件中使用 -->
<script setup name='testAddName'></script>
````

5. vue3 ant-design a-button icon 自定义svg

6.vue3 ant-design 全局主题色修改
+ 在Vue 3中修改Ant Design的主题色，你可以使用Ant Design Vue提供的ConfigProvider组件和theme属性

