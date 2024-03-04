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
					name: "analytics",
					value: 10000,
					children: [
						{
							name: "cluster",
							children: [
								{ name: "AgglomerativeCluster", value: 3938 },
								{ name: "CommunityStructure", value: 3812 },
							],
						},
						{
							name: "graph",
							children: [
								{ name: "BetweennessCentrality", value: 3534 },
								{ name: "LinkDistance", value: 5731 },
								{ name: "MaxFlowMinCut", value: 7840 },
							],
						},
						{
							name: "optimization",
							children: [{ name: "AspectRatioBanker", value: 7074 }],
						},
					],
				},
				{
					name: "data",
					value: 10000,
					children: [
						{
							name: "converters",
							children: [
								{ name: "Converters", value: 721 },
								{ name: "DelimitedTextConverter", value: 4294 },
								{ name: "GraphMLConverter", value: 9800 },
								{ name: "IDataConverter", value: 1314 },
								{ name: "JSONConverter", value: 2220 },
							],
						},
						{ name: "DataField", value: 1759 },
						{ name: "DataSchema", value: 2165 },
						{ name: "DataSet", value: 586 },
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
						{ name: "AggregateExpression", value: 1616 },
						{ name: "And", value: 1027 },
						{ name: "Arithmetic", value: 3891 },
						{ name: "Average", value: 891 },
						{ name: "BinaryExpression", value: 2893 },
						{ name: "Comparison", value: 5103 },
						{ name: "CompositeExpression", value: 3677 },
						{ name: "Count", value: 781 },
						{ name: "DateUtil", value: 4141 },
						{ name: "Distinct", value: 933 },
						{ name: "Expression", value: 5130 },
						{ name: "ExpressionIterator", value: 3617 },
						{ name: "Fn", value: 3240 },
						{ name: "If", value: 2732 },
						{
							name: "methods",
							value: 10000,
							children: [
								{ name: "add", value: 593 },
								{ name: "and", value: 330 },
								{ name: "average", value: 287 },
								{ name: "count", value: 277 },
								{ name: "distinct", value: 292 },
								{ name: "div", value: 595 },
								{ name: "eq", value: 594 },
								{ name: "fn", value: 460 },
								{ name: "gt", value: 603 },
								{ name: "gte", value: 625 },
								{ name: "iff", value: 748 },
								{ name: "isa", value: 461 },
								{ name: "lt", value: 597 },
								{ name: "lte", value: 619 },
								{ name: "max", value: 283 },
								{ name: "min", value: 283 },
								{ name: "mod", value: 591 },
								{ name: "mul", value: 603 },
								{ name: "neq", value: 599 },
								{ name: "not", value: 386 },
								{ name: "or", value: 323 },
								{ name: "orderby", value: 307 },
								{ name: "range", value: 772 },
								{ name: "select", value: 296 },
								{ name: "stddev", value: 363 },
								{ name: "sub", value: 600 },
								{ name: "sum", value: 280 },
								{ name: "update", value: 307 },
								{ name: "variance", value: 335 },
								{ name: "where", value: 299 },
								{ name: "xor", value: 354 },
								{ name: "-", value: 264 },
							],
						},
						{ name: "Minimum", value: 843 },
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
          bottom: '1%',
          right: '20%',
          symbolSize: 15,
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
		height: 450px;
	}

	.empty {
		text-align: center;
		line-height: 360px;
		color: #666666;
	}
}
</style>
