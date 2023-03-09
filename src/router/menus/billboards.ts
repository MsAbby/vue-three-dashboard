const billboardsRouter = {
  path: '/billboards',
  name: 'billboards',
  component: () => import('@/views/billboards/index.vue'),
  meta: {
    icon: 'icon-code',
  }
}

export default billboardsRouter