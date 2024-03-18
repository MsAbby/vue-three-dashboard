const demandManageRouter = {
  path: '/demand',
  name: 'demand',
  meta: {
    title: '需求',
    icon: 'icon-code',
    permission: "demand",
  },
  children: [
      {
        path: '/demand-manage',
        name: 'demand-manage',
        component: () => import('@/views/demand/demand-manage/index.vue'),
        meta: {
          title: '需求管理',
          icon: 'icon-code',
          permission: "demand-manage",
        },
      },
      {
        path: '/demand-category',
        name: 'demand-category',
        component: () => import('@/views/demand/demand-category/index.vue'),
        meta: {
          title: '需求分类',
          icon: 'icon-code',
          permission: "demand-category",
        },
      }
  ]
}


export default demandManageRouter