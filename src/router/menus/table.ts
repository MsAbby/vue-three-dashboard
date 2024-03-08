
const tableRouter = {
    path: '/tables',
    name: 'tables',
    meta: {
      title: '表格',
      icon: 'icon-code',
    },
    children: [
      {
        path: '/demo-one',
        name: 'tables-demo-one',
        component: () => import('@/views/table/table1/index.vue'),
        meta: {
          title: '案例一',
          icon: 'icon-code',
        },
      },
    ]
  }
  
  export default tableRouter