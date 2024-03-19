
const healthRouter = {
    path: '/health',
    name: 'health',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '健康',
      icon: 'icon-code',
      permission: "health",
    },
    children: [
       {
            path: 'health-demo-one',
            name: 'health-demo-one',
            component: () => import('@/views/health/product/demo-one.vue'),
            meta: {
                title: '产品',
                icon: 'icon-code',
                permission: "health-demo-one",
            },
       },
       {
        path: 'health-demo-one',
        name: 'health-demo-two',
        component: () => import('@/views/health/product/demo-two.vue'),
        meta: {
            title: '产品2',
            icon: 'icon-code',
            permission: "health-demo-one",
        },
      }
    ]
}

export default healthRouter