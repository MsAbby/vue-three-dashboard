<template>
	<div class="line-container">
		<h3>月度数据</h3>
		<div class="bar-box">
			<div class="canvas-box" id="lineChart"></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, nextTick, defineProps, watch, ref, Ref } from "vue";

const { proxy }: any = getCurrentInstance();

// prop
const props = defineProps({
	month: String,
	isSearch: Boolean,
});

// Define a reactive variable to store the prop value
const isSearchReactive: Ref<boolean> = ref(props.isSearch);

// watch
watch(() => props.isSearch, (newVal) => {
	isSearchReactive.value = newVal;
	if (newVal) {
		handelData()
	}
});

let myChart: any = null;
let isShow: boolean = false;
let xList: Array<any> = [];
let typeList: Array<any> = [];
let resultList = {
	"A": [],
	"B": [],
	"C": [],
	"D": [],
	"E": [],
	"F": [],
} as any;
let dataList: Array<any> = [];

const handelData = () => {
	isShow = true;
	xList = [];
	typeList = [];
	try {
		// const res = await xxxxxxxx({month});
		const res = {
			code: "000000",
			data: [
				{
					date: "2023-01-01",
					"A": 100,
					"B": 200,
					"C": 300,
					"D": 400,
					"E": 500,
					"F": 600,
				},
				{
					date: "2023-01-02",
					"A": 1200,
					"B": 2200,
					"C": 3200,
					"D": 4200,
					"E": 5200,
					"F": 6200
				},
				{
					date: "2023-01-03",
					"A": 700,
					"B": 800,
					"C": 40,
					"D": 200,
					"E": 200,
					"F": 1200
				},
				{
					date: "2023-01-04",
					"A": 1700,
					"B": 1800,
					"C": 640,
					"D": 4200,
					"E": 7200,
					"F": 13200,
				},
				{
					date: "2023-01-05",
					"A": 300 ,
					"B": 800,
					"C": 6440,
					"D": 1200,
					"E": 200,
					"F": 3200
				},
				{
					date: "2023-01-06",
					"A": 1300,
					"B": 8200,
					"C": 1440,
					"D": 700 ,
					"E": 400,
					"F": 600
				},
				{
					date: "2023-01-07",
					"A": 3000,
					"B": 3200,
					"C": 440,
					"D": 1700,
					"E": 4300,
					"F": 6000
				},
				{
					date: "2023-01-08",
					"A": 4000,
					"B": 2200,
					"C": 1440,
					"D": 1800,
					"E": 1300,
					"F": 600
				},
				{
					date: "2023-01-09",
					"A": 4300,
					"B": 2200,
					"C": 6440,
					"D": 1100,
					"E": 1000,
					"F": 6000
				},
			],
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			proxy.$emit("searchEnd");
			dataList = res.data;
			if (dataList && dataList.length > 0) {
				let typeList = Object.keys(dataList[0]).filter((key) => key !== 'date');
				// 循环
				dataList.forEach((item) => {
					xList.push(item.date);
					typeList.map(key => {
						resultList[key].push(item[key])
						return key
					})
				});
				console.log("++++", typeList)
				nextTick(() => {
					initEcharts(typeList);
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
		isShow = false;
	}
};
const initEcharts = (list) => {
	const chartDom = document.getElementById("lineChart");
	myChart = proxy.$echarts.init(chartDom);
	console.log("11", list, resultList)
	const data = list.map(item => {
		return {
			name: item,
			type: "line",
			stack: 'Total',
			areaStyle: {},
			data: resultList[item]
		};
	})
	const option = {
		legend: {
			data: list,
			right:0 ,
			orient:"vertical"
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			formatter: (params) => {
				const str = `<strong>${params[0].name}</strong></br>
							`;
				return str;
			},
		},
		// 图示空白间距
		grid: {
			top: "10",
			left: "0",
			right: "20",
			bottom: "20%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: xList,
				boundaryGap: [20, 20],
				// 坐标轴刻度线
				axisTick: {
					show: false,
				},
				// 坐标轴线
				axisLine: {
					show: true,
					// 坐标轴和字体颜色
					lineStyle: {
						color: "#DEDEDE ",
					},
				},
				// 坐标轴文字
				axisLabel: {
					rotate: "-60",
					// 文字颜色
					color: "#666666",
					// 文字大小
					fontSize: 12,
				},
			},
		],
		yAxis: [
			{
				type: "value",
				// 坐标轴刻度线
				axisTick: {
					show: false,
				},
				// 坐标轴线
				axisLine: {
					show: true,
					lineStyle: {
						// 坐标轴和字体颜色
						color: "#DEDEDE ",
					},
				},
				// 坐标轴文字
				axisLabel: {
					// 文字颜色
					color: "#666666",
					// 文字大小
					fontSize: 12,
				},
				// 中间区域，水平线条是"虚线"
				splitLine: {
					lineStyle: {
						//虚线
						type: "dashed",
						// 颜色
						color: ["#F2F2F2 "],
					},
					//隐藏
					show: true,
				},
			},
		],
		series: data,
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
.line-container {
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
