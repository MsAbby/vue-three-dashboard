const projectManageRouter = {
  path: '/project',
  name: 'project',
  permission: "project",
  meta: {
    title: '项目管理',
    icon: 'icon-code',
  },
  children: [
    {
      path: '/project-manage',
      name: 'project-manage',
      permission: "project-manage",
      component: () => import('@/views/project/project-manage/index.vue'),
      meta: {
        title: '项目管理',
        icon: 'icon-code',
      },
    },
    {
      path: '/pm-manage',
      name: 'pm-manage',
      permission: "pm-manage",
      component: () => import('@/views/project/pm-manage/index.vue'),
      meta: {
        title: 'PM管理',
        icon: 'icon-code',
      },
    },
    {
      path: '/product-manage',
      name: 'product-manage',
      permission: "product-manage",
      component: () => import('@/views/project/product-manage/index.vue'),
      meta: {
        title: '产品管理',
        icon: 'icon-code',
      },
    },
    {
      path: '/developer-manage',
      name: 'developer-manage',
      permission: "developer-manage",
      component: () => import('@/views/project/developer-manage/index.vue'),
      meta: {
        title: '开发人员管理',
        icon: 'icon-code',
      },
    },
    {
      path: '/tester-manage',
      name: 'tester-manage',
      permission: "tester-manage",
      component: () => import('@/views/project/tester-manage/index.vue'),
      meta: {
        title: '测试人员管理',
        icon: 'icon-code',
      },
    }
  ]
}

export default projectManageRouter