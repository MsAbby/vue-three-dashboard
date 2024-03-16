const billboardsRouter = {
  path: '/billboards',
  name: 'billboards',
  permission: "billboards",
  component: () => import('@/views/billboards/index.vue'),
  meta: {
    title: '看板',
    icon: 'icon-code',
  }
}

export default billboardsRouter