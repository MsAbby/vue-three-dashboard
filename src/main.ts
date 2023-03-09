import { createApp } from 'vue'
import { initRouter } from './router'
import store from './store'
import './style.css'
import './assets/style/common.less'
import App from './App.vue'



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
app.mount('#app')
