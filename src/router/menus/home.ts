const homeRouter = {
  path: '/home',
  name: 'home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    title: '总览',
    icon: 'icon-code',
  }
}
export default homeRouter