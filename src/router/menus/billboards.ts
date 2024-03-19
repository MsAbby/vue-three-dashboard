const billboardsRouter = {
    path: "/billboards",
    component: () => import('@/layout/index.vue'),
    redirect: '/billboards/index',
    meta: {
      title: "首页",
      icon: "icon-code",
      permission: "billboards",
    },
    children: [{
        path: 'index',
        name: 'Billboards',
        component: () => import('@/views/billboards/index.vue'),
        meta: {
          title: '看板',
          icon: 'icon-code',
          permission: "billboards",
        }
      }],
}

export default billboardsRouter
