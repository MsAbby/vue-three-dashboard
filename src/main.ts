import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import setupAtnd from "./ant-design-vue/index";
// 引入路由
import router from "./router";
// 引入echarts
import echarts from "./plugins/echarts/index";
// 引入moment
import moment from "moment";
import "ant-design-vue/dist/reset.css";
import "./style.css";
import "./assets/style/index.less";

import VCalendar from "v-calendar";
import "v-calendar/style.css";

debugger

/*
 ** 写法： app.use(router)
 ** 解释： 以前是把router 引进来，再使用, 默认导出只能导出一个
 ** 写法： initRouter(app)
 ** 解释： 把 app 传进 router中, 导出可以导出多个
 */
const app = createApp(App);
// 创建 Pinia 实例
const pinia = createPinia();

// 挂载echarts
app.config.globalProperties.$echarts = echarts;
// 挂载moment
app.config.globalProperties.$moment = moment;

console.log("-----", 1)

setupAtnd(app)
app.use(pinia)
app.use(VCalendar, {})
// 使用路由
app.use(router)
// isReady不接受任何参数。若路由器完成了初始化导航，会立即解析Promise
router.isReady().then(() => app.mount("#app"))
