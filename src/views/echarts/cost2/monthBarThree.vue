<template>
	<div class="bar-container">
		<h3>月度数据</h3>
		<div class="bar-box">
			<div class="canvas-box" id="barChartthree"></div>
		</div>
		<a-modal
			v-model:open="visible"
			title="Basic Modal"
			width="60%"
			:mask="true"
			:footer="null"
			>
			<div class="bar-box" style="width: 100%; height: 600px;">
				<div  style="width: 100%; height: 550px;" id="barChartModal"></div>
			</div>
		</a-modal>
	</div>
</template>
<script lang="ts" setup name="MonthBarThree">
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
let visible = ref(false);
let myChart: any = null;
let modalChart: any = null;
let xList: Array<any> = [];
let	modalxList: Array<any> = [];
let	modalSerisList: Array<any> = [];
let yList: {
	a: [],
	b: [],
	c: []
};
let zList: {
	a: [],
	b: [],
	c: []
};
let dataList: Array<any> = [];

const handelData = () => {
	xList = [];
	yList = {
		a: [],
		b: [],
		c: []
	};
	zList = {
		a: [],
		b: [],
		c: []
	};
	try {
		const res = {
			code: "000000",
			data: [
				{
					dept: "部门01111111111",
					value:[
						{name: "a", ntsp: 100, gtsp: 200},
						{name: "b", ntsp: 200, gtsp: 300},
						{name: "c", ntsp: 300, gtsp: 400},
					],
				},
				{
					dept: "部门02222222222222",
					value:[
						{name: "a", ntsp: 120, gtsp: 220},
						{name: "b", ntsp: 220, gtsp: 320},
						{name: "c", ntsp: 320, gtsp: 420},
					],
				},
				{
					dept: "部门033333333333333",
					value:[
						{name: "a", ntsp: 220, gtsp: 420},
						{name: "b", ntsp: 200, gtsp: 120},
						{name: "c", ntsp: 420, gtsp: 420},
					],
				},
				{
					dept: "部门044444444444444444",
					value:[
						{name: "a", ntsp: 260, gtsp: 820},
						{name: "b", ntsp: 450, gtsp: 120},
						{name: "c", ntsp: 220, gtsp: 520},
					],
				},
				{
					dept: "部门055555555555555555",
					// 或者： {name: "a", value: [600, 1000]},}
					value:[
						{name: "a", ntsp: 260, gtsp: 1220},
						{name: "b", ntsp: 2150, gtsp: 120},
						{name: "c", ntsp: 2020, gtsp: 520},
					],
				},
				{
					dept: "部门066666666666666666",
					value:[
						{name: "a", ntsp: 260, gtsp: 120},
						{name: "b", ntsp: 1250, gtsp: 1210},
						{name: "c", ntsp: 1020, gtsp: 220},
					],
				},
				{
					dept: "部门077777777777777777",
					value:[
						{name: "a", ntsp: 260, gtsp: 820},
						{name: "b", ntsp: 450, gtsp: 120},
						{name: "c", ntsp: 220, gtsp: 520},
					],
				},
				{
					dept: "部门08888888888888888",
					value:[
						{name: "a", ntsp: 260, gtsp: 820},
						{name: "b", ntsp: 450, gtsp: 120},
						{name: "c", ntsp: 220, gtsp: 520},
					],
				},
				{
					dept: "部门08888883343438888888888",
					value:[
						{name: "a", ntsp: 260, gtsp: 820},
						{name: "b", ntsp: 450, gtsp: 120},
						{name: "c", ntsp: 220, gtsp: 520},
					],
				},
				{
					dept: "部门asd08888883343438888888888",
					value:[
						{name: "a", ntsp: 260, gtsp: 820},
						{name: "b", ntsp: 450, gtsp: 120},
						{name: "c", ntsp: 220, gtsp: 520},
					],
				},
			],
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			proxy.$emit("searchEnd");
			dataList = res.data;
			if (dataList && dataList.length > 0) {
				dataList.forEach((item) => {
					xList.push(item.dept);
					item.value.map(child => {
						yList[child.name].push(child.ntsp)
						zList[child.name].push(child.gtsp)
					})
				});
				nextTick(() => {
					initEcharts();
				});
			} else {
				myChart && myChart.dispose();
			}
		} else {
			proxy.$Notice.error({ title: "请求失败", desc: res.description });
		}
	} catch (error) {
		proxy.$Notice.error({ title: "捕获错误", desc: error });
	} finally {
	}
};

const initEcharts = () => {
	const chartDom = document.getElementById("barChartthree");
	myChart = proxy.$echarts.init(chartDom);

	const seriesLabel = {
		show: true,
		fontSize: 10,
	};
	const option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: "shadow",
				shadowStyle: {
					color: "rgba(57, 127, 243, 0.1)"
				},
			},
			// 触发方式 mousemove, click, none, mousemove|click
			triggerOn: "mousemove",
			// item 图形触发， axis 坐标轴触发， none 不触发
			// trigger: "item",
			formatter: (params) => {
				const str = `<strong>${params.name}</strong></br>
							<p>NTSP</p>
							<p>${params[0].seriesName} ： ${params[0].value}</p>
							<p>${params[2].seriesName} ： ${params[2].value}</p>
							<p>${params[4].seriesName} ： ${params[4].value}</p>
							<p>GTSP</p>
							<p>${params[1].seriesName} ： ${params[1].value}</p>
							<p>${params[3].seriesName} ： ${params[3].value}</p>
							<p>${params[5].seriesName} ： ${params[5].value}</p>
							`;
				return str;
			},
		},
		grid: {
			top: "0",
			left: "10%",
			right: "20",
			bottom: "20%",
			containLabel: true,
		},
		xAxis: {
			type: "value",
		},
		yAxis: {
			type: "category",
			inverse: true,
			data: xList,
		},
		dataZoom: [
			{	
				// 垂直方向
				orient: 'vertical',
				// 是否显示下滑块
				show: true,
				// 是否展示滚动条两边显示的信息
				showDetail: false,
				// 下滑块手柄的高度调节
				height: 300,
				// 类型, 滑动块插件
				type: "slider",
				// 选择的x轴
				yAxisIndex: [0, 1],
				// 初始数据显示多少
				start: 0,
				// 初始数据最多显示多少
				end: 25,
				filterMode: "empty",
				// 距离右边
				left: 3,
				top: 0,
			},
			{
				type: 'inside',
				yAxisIndex: 0,
				zoomOnMouseWheel: false,  //滚轮是否触发缩放
				moveOnMouseMove: true,  //鼠标滚轮触发滚动
				moveOnMouseWheel: true
			}
		],
		series: [
			{
				name: "总成本",
				type: "bar",
				data: yList.a,
				stack: '总成本',
				label: seriesLabel,
				barMaxWidth: "16",
				barMinWidth: "8",
				itemStyle: {
					color: "#91CC74",
				},
			},
			// gtsp
			{
				name: "总成本",
				type: "bar",
				data: zList.a,
				stack: '总成本',
				label: seriesLabel,
				barMaxWidth: "16",
				barMinWidth: "8",
				itemStyle: {
					color: "#EE6666",
				},
			},
			{
				name: "呆呆成本",
				type: "bar",
				label: seriesLabel,
				stack: '呆呆成本',
				data: yList.b,
				barMaxWidth: "16",
				barMinWidth: "8",
				itemStyle: {
					color: "#3A78F2"
				}
			},
			// gtsp
			{
				name: "呆呆成本",
				type: "bar",
				data: zList.b,
				stack: '呆呆成本',
				label: seriesLabel,
				barMaxWidth: "16",
				barMinWidth: "8",
				itemStyle: {
					color: "#FF953D",
				}
			},
			{
				name: "村村成本",
				type: "bar",
				stack: '村村成本',
				label: seriesLabel,
				data: yList.c,
				barMaxWidth: "16",
				barMinWidth: "8",
				itemStyle: {
					color: "#FFCC58",
				}
			},
			// gtsp
			{
				name: "村村成本",
				type: "bar",
				stack: '村村成本',
				label: seriesLabel,
				data: zList.c,
				barMaxWidth: "16",
				barMinWidth: "8",
				itemStyle: {
					color: "#FDE105",
				}
			},
		],
	};

	option && myChart.setOption(option);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			myChart.resize();
		}, 500);
	});

	myChart.on("click", (params) => {
		visible.value = true;
		modalxList = [];
		modalSerisList = [];
		
			const resModal = [
				{
					name: "总",
					value: [
						{name: "车车01111111111", value: 120},
						{name: "车车02222222222222", value: 220},
						{name: "车车033333333333333", value: 120},
						{name: "车车4444444444", value: 120},
						{name: "车车5555555555", value: 120},
						{name: "车车9999999999", value: 420},
						{name: "车车100000000", value: 220},
						{name: "车车1000000002323", value: 220},
						{name: "车车1000000002323", value: 1220},
					]
				},
				{
					name: "呆阿呆",
					value: [
						{name: "车车01111111111", value: 220},
						{name: "车车02222222222222", value: 220},
						{name: "车车033333333333333", value: 120},
						{name: "车车4444444444", value: 1330},
						{name: "车车5555555555", value: 120},
						{name: "车车9999999999", value: 420},
						{name: "车车100000000", value: 220},
						{name: "车车1000000002323", value: 220},
						{name: "车车1000000002323", value: 1220},
					]
				},
				{
					name: "村村",
					value: [
						{name: "车车01111111111", value: 2120},
						{name: "车车02222222222222", value: 220},
						{name: "车车033333333333333", value: 120},
						{name: "车车4444444444", value: 1330},
						{name: "车车5555555555", value: 1120},
						{name: "车车9999999999", value: 420},
						{name: "车车100000000", value: 1120},
						{name: "车车1000000002323", value: 220},
						{name: "车车1000000002323", value: 1220},
					]
				},
			];
			resModal.map((item, index) => {
				if (index === 0) {
					modalxList = item.value.map(child => {
						return child.name;
					}) 
				}
				const obj = {
					name: item.name,
					type: 'bar',
					data: item.value,
					barGap: 0,
					barWidth: 8,
					emphasis: {
						focus: 'series'
					},
				}
				modalSerisList.push(obj)
			});
			nextTick(() => {
				setTooltipEchart(params)
			});
	})
};

const setTooltipEchart = async (parmas) => {
	const chartDom = document.getElementById("barChartModal");
	modalChart = proxy.$echarts.init(chartDom);
	console.log(modalChart, "----")
	const seriesLabel = {
		show: true,
		fontSize: 10,
	};
	console.log(modalSerisList)
	const options = {
		// tooltip: {
		// 	trigger: 'axis',
		// 	axisPointer: {
		// 		type: "shadow",
		// 		shadowStyle: {
		// 			color: "rgba(57, 127, 243, 0.1)"
		// 		},
		// 	},
		// 	triggerOn: "mousemove",
		// 	// item 图形触发， axis 坐标轴触发， none 不触发
		// 	// trigger: "item",
		// },
		grid: {
			top: "100",
			left: "10%",
			right: "20",
			bottom: "20%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			data: modalxList,
			axisLabel: {
				rotate: "-60",
				// 文字颜色
				color: "#666666",
				// 文字大小
				fontSize: 12,
			},

		},
		yAxis: {
			type: "value",
		},
		dataZoom: [
			{	
				// 是否显示下滑块
				show: true,
				// 是否展示滚动条两边显示的信息
				showDetail: false,
				// 下滑块距离x轴底部的距离
				bottom: 20,
				// 下滑块手柄的高度调节
				height: 20,
				// 类型, 滑动块插件
				type: "slider",
				// 选择的x轴
				xAxisIndex: [0],
				// 初始数据显示多少
				start: 0,
				// 初始数据最多显示多少
				end: xList.length > 35 ? 25 : 100,
			},
			{
				type: 'inside',
				yAxisIndex: 0,
				zoomOnMouseWheel: false,  //滚轮是否触发缩放
				moveOnMouseMove: true,  //鼠标滚轮触发滚动
				moveOnMouseWheel: true
			}
		],
		series: modalSerisList
	};

	options && modalChart.setOption(options);
	// 随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		modalChart.resize();
	});
};
</script>
<style lang="less" scoped>
.bar-container {
	width: 100%;
	height: 460px;
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
		height: 360px;
	}

	.empty {
		text-align: center;
		line-height: 360px;
		color: #666666;
	}
}
</style>
