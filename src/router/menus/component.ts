const componentRouter = {
  path: '/component',
  name: 'component',
  component: () => import('@/views/component/index.vue'),
  meta: {
    title: '组件',
    icon: 'icon-code',
  }
}

export default componentRouter