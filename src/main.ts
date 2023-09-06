import { createApp } from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import store from './store'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'element-plus/dist/index.css'

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
// 初始化路由
initRouter(app)
app.use(store)
app.use(ElementPlus, { locale })
app.mount('#app')
