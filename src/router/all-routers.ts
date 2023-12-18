
import homeRouter from './menus/home'
import billboardsRouter from './menus/billboards'
import projectManageRouter from './menus/project'
import demandManageRouter from './menus/demand'
import componentRouter from './menus/component'
import echartsRouter from './menus/echarts'

// ...[homeRouter]： 为了解决ts语法报错（必须具有返回迭代器的 Symbol.iterator 方法”）
let allRoutes = [
  ...[homeRouter],
  ...[billboardsRouter],
  ...[projectManageRouter],
  ...[demandManageRouter],
  ...[componentRouter],
  ...[echartsRouter]

]
export default allRoutes