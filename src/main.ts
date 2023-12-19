
import { createApp } from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import store from './store'
import setupAtnd from './ant-design-vue/index'
// 引入echarts
import echarts from "./plugins/echarts/index";
import 'ant-design-vue/dist/reset.css';
import './style.css'
import './assets/style/reset.less'
import './assets/style/common.less'


/*
** 写法： app.use(router)
** 解释： 以前是把router 引进来，再使用, 默认导出只能导出一个
** 写法： initRouter(app)
** 解释： 把 app 传进 router中, 导出可以导出多个
*/
const app = createApp(App)

// 挂载echarts
app.config.globalProperties.$echarts = echarts;
// 初始化路由
initRouter(app)
setupAtnd(app)
app.use(store)
app.mount('#app')
