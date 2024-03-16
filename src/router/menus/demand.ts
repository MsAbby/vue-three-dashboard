const demandManageRouter = {
  path: '/demand',
  name: 'demand',
  permission: "demand",
  meta: {
    title: '需求',
    icon: 'icon-code',
  },
  children: [
      {
        path: '/demand-manage',
        name: 'demand-manage',
        permission: "demand-manage",
        component: () => import('@/views/demand/demand-manage/index.vue'),
        meta: {
          title: '需求管理',
          icon: 'icon-code',
        },
      },
      {
        path: '/demand-category',
        name: 'demand-category',
        permission: "demand-category",
        component: () => import('@/views/demand/demand-category/index.vue'),
        meta: {
          title: '需求分类',
          icon: 'icon-code',
        },
      }
  ]
}

export default demandManageRouter