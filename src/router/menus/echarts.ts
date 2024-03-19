
const echartsRouter = {
  path: '/echarts',
  name: 'echarts',
  component: () => import('@/layout/index.vue'),
  redirect: '/echarts/demo-one',
  meta: {
    title: '图表',
    icon: 'icon-code',
    permission: "echarts",
  },
  children: [
    {
        path: 'demo-one',
        name: 'echarts-demo-one',
        component: () => import('@/views/echarts/demo-one.vue'),
        meta: {
          title: '案例一',
          icon: 'icon-code',
          permission: "echarts-demo-one",
        }
      },
      {
        path: 'demo-one-1',
        name: 'echarts-demo-one-1',
        component: () => import('@/views/echarts/demo0.vue'),
        meta: {
          title: '案例二',
          icon: 'icon-code',
          permission: "echarts-demo-one",
        },
      },
    {
      path: '/cost',
      name: 'echarts-cost',
      permission: "echarts-cost",
      component: () => import('@/views/echarts/cost/index.vue'),
      meta: {
        title: '案例二',
        icon: 'icon-code',
        permission: "cost",
      },
    },
    {
      path: '/cost2',
      name: 'echarts-cost2',
      permission: "echarts-cost2",
      component: () => import('@/views/echarts/cost2/index.vue'),
      meta: {
        title: '案例三',
        icon: 'icon-code',
        permission: "echarts-cost2",
      },
    },
    {
      path: '/cost4',
      name: 'echarts-cost4',
      permission: "echarts-cost4",
      component: () => import('@/views/echarts/cost4/index.vue'),
      meta: {
        title: '案例四',
        icon: 'icon-code',
        permission: "echarts-cost2",
      },
    },
  ]
}

export default echartsRouter