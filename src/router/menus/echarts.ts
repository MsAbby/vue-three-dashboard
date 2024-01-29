
const echartsRouter = {
  path: '/echarts',
  name: 'echarts',
  meta: {
    title: '图表',
    icon: 'icon-code',
  },
  children: [
    {
      path: '/demo-one',
      name: 'echarts-demo-one',
      component: () => import('@/views/echarts/demo-one.vue'),
      meta: {
        title: '案例一',
        icon: 'icon-code',
      },
    },
    {
      path: '/cost',
      name: 'echarts-cost',
      component: () => import('@/views/echarts/cost/index.vue'),
      meta: {
        title: '案例二',
        icon: 'icon-code',
      },
    },
    {
      path: '/cost2',
      name: 'echarts-cost2',
      component: () => import('@/views/echarts/cost2/index.vue'),
      meta: {
        title: '案例三',
        icon: 'icon-code',
      },
    },
  ]
}

export default echartsRouter