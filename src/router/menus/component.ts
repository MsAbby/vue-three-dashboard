const componentRouter = {
  path: '/component',
  name: 'component',
  meta: {
    title: '组件',
    icon: 'icon-code',
    permission: "component",
  },
  children: [
    {
      path: '/date',
      name: 'date',
      permission: "date",
      component: () => import('@/views/component/date/index.vue'),
      meta: {
        title: '日期控件',
        icon: 'icon-code',
        permission: "date",
      },
    },
  ]
}

export default componentRouter