
const healthRouter = {
    path: '/health',
    name: 'health',
    meta: {
      title: '健康',
      icon: 'icon-code',
      permission: "health",
    },
    children: [
       {
            path: '/health-demo-one',
            name: 'health-demo-one',
            component: () => import('@/views/health/product/demo-one.vue'),
            meta: {
                title: '产品',
                icon: 'icon-code',
                permission: "health-demo-one",
            },
       }
    ]
}

export default healthRouter