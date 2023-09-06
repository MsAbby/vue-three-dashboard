const componentRouter = {
  path: '/component',
  name: 'component',
  meta: {
    title: '组件',
    icon: 'icon-code',
  },
  children: [
    {
      path: '/date',
      name: 'date',
      component: () => import('@/views/component/date/index.vue'),
      meta: {
        title: '日期控件',
        icon: 'icon-code',
      },
    },
  ]
}

export default componentRouter