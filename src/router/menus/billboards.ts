const billboardsRouter = {
  path: '/billboards',
  name: 'billboards',
  component: () => import('@/views/billboards/index.vue'),
}

export default billboardsRouter