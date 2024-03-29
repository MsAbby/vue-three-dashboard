const tableRouter = {
	path: "/tables",
	name: "tables",
	component: () => import('@/layout/index.vue'),
	meta: {
		title: "表格",
		icon: "icon-code",
		permission: "tables",
	},
	children: [
		{
			path: "/demo-one",
			name: "tables-demo-one",
			component: () => import("@/views/table/table1/index.vue"),
			meta: {
				title: "案例一",
				icon: "icon-code",
				permission: "tables-demo-one",
			},
		},
	],
};

export default tableRouter;
