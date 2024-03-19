const homeRouter = {
  path: '/home',
  component: () => import('@/layout/index.vue'),
  meta: {
    title: "总览",
    icon: "icon-code",
    permission: "home",
  },
  children: [{
      path: 'index',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '总览',
        icon: 'icon-code',
        permission: "home",
      }
  }],
}
export default homeRouter