<template>
	<div class="bar-container">
		<h3>数据三三三</h3>
		<div class="bar-box">
			<div class="canvas-box" id="barChart1"></div>
		</div>
	</div>
</template>
<script lang="ts" setup name="monthBarSecond">
import {
	getCurrentInstance,
	nextTick,
	defineProps,
	watch,
	ref,
	Ref,
} from "vue";

const { proxy }: any = getCurrentInstance();

// prop
const props = defineProps({
	month: String,
	isSearch: Boolean,
});

// Define a reactive variable to store the prop value
const isSearchReactive: Ref<boolean> = ref(props.isSearch);

// watch
watch(
	() => props.month,
	(newVal) => {
		if (newVal) {
			handelData();
		}
	}
);
watch(
	() => props.isSearch,
	(newVal) => {
		isSearchReactive.value = newVal;
		if (newVal) {
			handelData();
		}
	}
);

let myChart: any = null;
let resultList = [] as any;

const handelData = () => {
	resultList = [];
	let res = {
		code: "000000",
		data: {} as any,
		description: "",
	};
	res = {
		code: "000000",
		data: {
			name: "flare",
			children: [
			{
					name: "analytics-轻武器恶趣味",
					value: 10000,
					children: [
						{
							name: "cluster",
							value: 3938
						},
					],
				},
				{
					name: "analytics-1212",
					value: 10000,
					children: [
						{
							name: "cluster",
							value: 3938,
							symbolSize: 5, 
						},
						{
							name: "cluster",
							value: 3938,
							symbolSize: 5, 
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
					],
				},
				{
					name: "analytics-是对的",
					value: 10000,
					children: [
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
					],
				},
				{
					name: "analytics",
					value: 10000,
					children: [
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
						{
							name: "cluster",
							value: 3938
						},
					],
				},
				{
					name: "data",
					value: 10000,
					children: [
						{ name: "DataField", value: 1759 },
					]
				},
				{
					name: "physics",
					value: 10000,
					children: [
						{ name: "DragForce", value: 1082 },
						{ name: "GravityForce", value: 1336 },
					],
				},
				{
					name: "query",
					value: 10000,
					children: [
						{ name: "And", value: 1027 },
						{ name: "Arithmetic", value: 3891 },
						{ name: "BinaryExpression", value: 2893 },
					],
				},
				{
					name: "主动鲍勃",
					value: 10000,
					children: [
						{
							name: "cluster",
							value: 1027
						},
						{
							name: "graph",
							value: 3534
						},
					],
				},
				{
					name: "此洞鲍勃",
					value: 10000,
					children: [
						{
							name: "cluster",
							value: 1027
						},
					],
				},
				{
					name: "鲍勃--撒上熟的",
					value: 1000,
					children: [
						{
							name: "cluster",
							value: 1027
						},
					],
				},
			],
		},
		description: "",
	} as any;

	if (res.code === "000000") {
		const list = JSON.parse(JSON.stringify(res.data));
		proxy.$emit("searchEnd");
		if (list) {
			resultList = res.data
			nextTick(() => {
				initEcharts();
			});
		} else {
			myChart && myChart.dispose();
		}
	}
};
const initEcharts = () => {
	const chartDom = document.getElementById("barChart1");
	myChart = proxy.$echarts.init(chartDom);

	const option = {
		// 图示空白间距
		grid: {
			top: "10",
			left: "0",
			right: "20%",
			bottom: "20%",
			containLabel: true,
		},
		series: [
        {
          type: 'tree',
          data: [resultList],
          top: '1%',
          left: '7%',
          bottom: '50',
          right: '20%',
        //   symbolSize: 8,
          label: {
            position:"bottom",
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 12,
			formatter: (params) => {
				if (params.value) {
					return `${params.name}  ${params.value}`
				} else {
					return `${params.name}`
				}
			}
          },
		//   itemStyle: {
		// 	color: "#5AD8A6"
		//   },
		  lineStyle: {
			color: "#5AD8A6"
		  },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          emphasis: {
            focus: 'descendant'
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
        }
      ]
	};
	option && myChart.setOption(option);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			myChart.resize();
		}, 500);
	});
};
</script>
<style lang="less" scoped>
.bar-container {
	width: 100%;
	height: 550px;
	background: #fff;
	color: #000000;
	padding: 30px;
	border-bottom: 10px solid #f2f2f2;

	.bar-box {
		position: relative;
	}

	h3 {
		padding-bottom: 20px;
	}
	.canvas-box {
		width: 100%;
		height: 400px;
	}

	.empty {
		text-align: center;
		line-height: 320px;
		color: #666666;
	}
}
</style>
