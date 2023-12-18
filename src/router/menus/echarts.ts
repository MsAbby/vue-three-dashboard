
const echartsRouter = {
  path: '/echarts',
  name: 'echarts',
  component: () => import('@/views/echarts/demo-one.vue'),
  meta: {
    title: '图表',
    icon: 'icon-code',
  },
  children: [
    {
      path: '/echarts/demo-one',
      name: 'echarts-demo-one',
      component: () => import('@/views/echarts/demo-one.vue'),
      meta: {
        title: '案例一',
        icon: 'icon-code',
      },
    },
  ]
}

export default echartsRouter