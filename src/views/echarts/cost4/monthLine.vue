<template>
	<div class="line-container">
		<h3>折线图-01</h3>
		<div class="bar-box">
			<div class="canvas-box" id="lineChart"></div>
		</div>
	</div>
</template>
<script lang="ts" setup name="monthLineSecond">
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
let xList: Array<any> = [];
let xxdList: Array<any> = [];
let resultList = [] as any;
let legendList = [] as any;

const handelData = () => {
	xList = [];
	xxdList = [];
	legendList = [] as any;
	const colors = [
		"#397FF3",
		"#9EBFFF",
		"#4BC7E6",
		"#C7F4FF",
		"#82E4BB",
		"#FFCC58",
		"#FD904B",
		"#AA8FFF",
		"#D6C9FF",
		"#7189B5",
	];
	const res = {
		code: "000000",
		data: [
			{
				name: "排排排排排排排排A",
				value: [
					{date: "2023年01月", value: 1100},
					{date: "2023年02月", value: 200},
					{date: "2023年03月", value: 5500},
					{date: "2023年04月", value: 400},
					{date: "2023年05月", value: 3320},
					{date: "2023年06月", value: 1030},
					{date: "2023年07月", value: 630},
					{date: "2023年08月", value: 530},
					{date: "2023年09月", value: 530},
					{date: "2023年10月", value: 530},
					{date: "2023年11月", value: 530},
					{date: "2023年12月", value: 530},
				]
			},
			{
				name: "排排B",
				value: [
					{date: "2023年01月", value: 1100},
					{date: "2023年02月", value: 2200},
					{date: "2023年03月", value: 5100},
					{date: "2023年04月", value: 4200},
					{date: "2023年05月", value: 3230},
					{date: "2023年06月", value: 1230},
					{date: "2023年07月", value: 6130},
					{date: "2023年08月", value: 5230},
					{date: "2023年09月", value: 5230},
					{date: "2023年10月", value: 5330},
					{date: "2023年11月", value: 5340},
					{date: "2023年12月", value: 5230},
				]
			},
			{
				name: "排排排排排B1",
				value: [
					{date: "2023年01月", value: 1500},
					{date: "2023年02月", value: 2500},
					{date: "2023年03月", value: 2500},
					{date: "2023年04月", value: 4500},
					{date: "2023年05月", value: 3530},
					{date: "2023年06月", value: 1730},
					{date: "2023年07月", value: 6330},
					{date: "2023年08月", value: 5130},
					{date: "2023年09月", value: 1530},
					{date: "2023年10月", value: 5230},
					{date: "2023年11月", value: 2530},
					{date: "2023年12月", value: 3530},
				]
			},
			{
				name: "排排排排排排排排B1234",
				value: [
					{date: "2023年01月", value: 1200},
					{date: "2023年02月", value: 2300},
					{date: "2023年03月", value: 1500},
					{date: "2023年04月", value: 4200},
					{date: "2023年05月", value: 3730},
					{date: "2023年06月", value: 1630},
					{date: "2023年07月", value: 630},
					{date: "2023年08月", value: 1530},
					{date: "2023年09月", value: 2530},
					{date: "2023年10月", value: 3530},
					{date: "2023年11月", value: 4530},
					{date: "2023年12月", value: 6530},
				]
			},
			
			
			{
				name: "xings排排排lasdj",
				value: [
					{date: "2023年01月", value: 3400},
					{date: "2023年02月", value: 2200},
					{date: "2023年03月", value: 3500},
					{date: "2023年04月", value: 1200},
					{date: "2023年05月", value: 2330},
					{date: "2023年06月", value: 2030},
					{date: "2023年07月", value: 1230},
					{date: "2023年08月", value: 4530},
					{date: "2023年09月", value: 2530},
					{date: "2023年10月", value: 2530},
					{date: "2023年11月", value: 2530},
					{date: "2023年12月", value: 5130},
				]
			},
			{
				name: "排排排排排排排排AAAAAAA",
				value: [
					{date: "2023年01月", value: 1020},
					{date: "2023年02月", value: 2030},
					{date: "2023年03月", value: 5500},
					{date: "2023年04月", value: 4030},
					{date: "2023年05月", value: 3330},
					{date: "2023年06月", value: 1630},
					{date: "2023年07月", value: 6310},
					{date: "2023年08月", value: 5322},
					{date: "2023年09月", value: 5312},
					{date: "2023年10月", value: 5320},
					{date: "2023年11月", value: 5300},
					{date: "2023年12月", value: 5310},
				]
			},
			{
				name: "排排排排排排排排fBBBBBBBB",
				value: [
					{date: "2023年01月", value: 1200},
					{date: "2023年02月", value: 2030},
					{date: "2023年03月", value: 1000},
					{date: "2023年04月", value: 4200},
					{date: "2023年05月", value: 330},
					{date: "2023年06月", value: 1230},
					{date: "2023年07月", value: 6320},
					{date: "2023年08月", value: 530},
					{date: "2023年09月", value: 3530},
					{date: "2023年10月", value: 4530},
					{date: "2023年11月", value: 530},
					{date: "2023年12月", value: 530},
				]
			},
			{
				name: "xings排排排CCCCCCC",
				value: [
					{date: "2023年01月", value: 1200},
					{date: "2023年02月", value: 2300},
					{date: "2023年03月", value: 5080},
					{date: "2023年04月", value: 4800},
					{date: "2023年05月", value: 3830},
					{date: "2023年06月", value: 1830},
					{date: "2023年07月", value: 2830},
					{date: "2023年08月", value: 5830},
					{date: "2023年09月", value: 5830},
					{date: "2023年10月", value: 5830},
					{date: "2023年11月", value: 1030},
					{date: "2023年12月", value: 3030},
				]
			},
		],
		description: "SUCCESS",
	};
	if (res.code === "000000") {
		proxy.$emit("searchEnd");
		if (res.data) {
			res.data.map((item, index) => {
				if(index === 0) {
					xList = item.value.map(item => {
						return item.date
					})
				}
				
				legendList.push(item.name);
				xxdList.push(`${item.name}`);
				let obj = {
					name: item.name,
					type: "line",
					data: item.value,
					smooth: true,
					showSymbol: false,
					itemStyle: {
						color: colors[index],
					},
				};
				resultList.push(obj);
			})
		}
		nextTick(() => {
			initEcharts();
		});
	} else {
		myChart && myChart.dispose();
	}
};

const initEcharts = () => {
	const chartDom = document.getElementById("lineChart");
	myChart = proxy.$echarts.init(chartDom);
	const option = {
		legend: {
			icon: 'rect',
			itemWidth: 10,
			itemHeight: 10,
			top: 0,
			data: legendList,
			textStyle: {
				color: "#8C8B8C",
			},
			formatter:(params) => {
				console.log(params)
				let name = params
				if (params.length > 6) { 
					name = params.substring(0, 6) + '...'
				}
				return name
			}
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			// item 图形触发， axis 坐标轴触发， none 不触发
			// trigger: "item",
			// formatter: (params) => {
			// 	const str = `<strong>${params.data.date}</strong></br>
			// 	<p>${params.data.type}： ${params.seriesName}</p>
			// 	<p>索索平台：${params.data.platfom}</p>
			// 	<p>峰峰在在车车数：${params.data.value}</p>
			// 				`;
			// 	return str;
			// },
		},
		// 图示空白间距
		grid: {
			top: "40",
			left: "0",
			right: "10",
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
					show: true,
					alignWithLabel: true
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
		series: resultList,
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
