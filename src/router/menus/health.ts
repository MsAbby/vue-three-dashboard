
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
        path: 'relative',
        name: 'Relative',
        component: () => import('@/views/health/relative/index.vue'),
        meta: {
            title: '关系树',
            icon: 'icon-code',
            permission: "health-demo-one",
        },
      }
    ]
}

export default healthRouter