
const healthRouter = {
    path: '/health',
    name: 'health',
    permission: "health",
    meta: {
      title: '健康',
      icon: 'icon-code',
    },
    children: [
       {
            path: '/health-demo-one',
            name: 'health-demo-one',
            permission: "health-demo-one",
            component: () => import('@/views/health/product/demo-one.vue'),
            meta: {
                title: '产品',
                icon: 'icon-code',
            },
       }
    ]
}

export default healthRouter