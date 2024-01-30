<template>
	<div class="line-container">
		<h3>月度数据</h3>
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
let resultList = [] as any;
let typeList = [] as any;

const handelData = () => {
	xList = [];
	typeList = [] as any;
	let colors = [
		"#3A78F2",
		"#FF953D",
		"#FFCC58",
		"#FDE105",
		"#FB7C6C",
		"#618CFF",
		"#63C3FE",
		"#15CE87",
		"#C7E317",
		"#47D468",
	]
	try {
		// const res = await xxxxxxxx({month});
		// const res = {
		// 	code: "000000",
		// 	data: {
		// 			"组合A": [
		// 				{ date: "2023-01-01", value: "100" },
		// 				{ date: "2023-01-02", value: "100" },
		// 				{ date: "2023-01-03", value: "100" },
		// 				{ date: "2023-01-04", value: "100" },
		// 				{ date: "2023-01-05", value: "100" },
		// 				{ date: "2023-01-06", value: "100" },
		// 				{ date: "2023-01-07", value: "100" },
		// 				{ date: "2023-01-08", value: "100" },
		// 			],
		// 			"组合B": [
		// 				{ date: "2023-01-01", value: "200" },
		// 				{ date: "2023-01-02", value: "200" },
		// 				{ date: "2023-01-03", value: "200" },
		// 				{ date: "2023-01-04", value: "200" },
		// 				{ date: "2023-01-05", value: "200" },
		// 				{ date: "2023-01-06", value: "200" },
		// 				{ date: "2023-01-07", value: "200" },
		// 				{ date: "2023-01-08", value: "200" },
		// 			],
		// 			"组合c": [
		// 				{ date: "2023-01-01", value: "300" },
		// 				{ date: "2023-01-02", value: "300" },
		// 				{ date: "2023-01-03", value: "300" },
		// 				{ date: "2023-01-04", value: "300" },
		// 				{ date: "2023-01-05", value: "300" },
		// 				{ date: "2023-01-06", value: "300" },
		// 				{ date: "2023-01-07", value: "300" },
		// 				{ date: "2023-01-08", value: "300" },
		// 			],
		// 			"组合d": [
		// 				{ date: "2023-01-01", value: "400" },
		// 				{ date: "2023-01-02", value: "400" },
		// 				{ date: "2023-01-03", value: "400" },
		// 				{ date: "2023-01-04", value: "400" },
		// 				{ date: "2023-01-05", value: "400" },
		// 				{ date: "2023-01-06", value: "400" },
		// 				{ date: "2023-01-07", value: "400" },
		// 				{ date: "2023-01-08", value: "400" },
		// 			],
		// 			"组合e": [
		// 				{ date: "2023-01-01", value: "500" },
		// 				{ date: "2023-01-02", value: "500" },
		// 				{ date: "2023-01-03", value: "500" },
		// 				{ date: "2023-01-04", value: "500" },
		// 				{ date: "2023-01-05", value: "500" },
		// 				{ date: "2023-01-06", value: "500" },
		// 				{ date: "2023-01-07", value: "500" },
		// 				{ date: "2023-01-08", value: "500" },
		// 			],
		// 			"组合f": [
		// 				{ date: "2023-01-01", value: "530" },
		// 				{ date: "2023-01-02", value: "50" },
		// 				{ date: "2023-01-03", value: "520" },
		// 				{ date: "2023-01-04", value: "520" },
		// 				{ date: "2023-01-05", value: "520" },
		// 				{ date: "2023-01-06", value: "520" },
		// 				{ date: "2023-01-07", value: "520" },
		// 				{ date: "2023-01-08", value: "520" },
		// 			],
		// 			"组合g": [
		// 				{ date: "2023-01-01", value: "630" },
		// 				{ date: "2023-01-02", value: "60" },
		// 				{ date: "2023-01-03", value: "620" },
		// 				{ date: "2023-01-04", value: "620" },
		// 				{ date: "2023-01-05", value: "620" },
		// 				{ date: "2023-01-06", value: "620" },
		// 				{ date: "2023-01-07", value: "620" },
		// 				{ date: "2023-01-08", value: "620" },
		// 			],
		// 		},
		// 	description: "SUCCESS",
		// };
		const res = {
			code: "000000",
			data: {
					"Abcd swewer ewr12": [
						{ date: "2023-01-01", value: 100 },
						{ date: "2023-01-02", value: 100 },
						{ date: "2023-01-03", value: 100 },
						{ date: "2023-01-04", value: 100 },
						{ date: "2023-01-05", value: 100 },
						{ date: "2023-01-06", value: 100 },
						{ date: "2023-01-07", value: 100 },
						{ date: "2023-01-08", value: 100},
						{ date: "2023-01-09", value: 1000 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 1000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 1000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1000 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1000 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1880 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
					"排排排排排排排排B": [
						{ date: "2023-01-01", value: 200},
						{ date: "2023-01-02", value: 200},
						{ date: "2023-01-03", value: 200},
						{ date: "2023-01-04", value: 200},
						{ date: "2023-01-05", value: 200},
						{ date: "2023-01-06", value: 200},
						{ date: "2023-01-07", value: 200},
						{ date: "2023-01-08", value: 200},
						{ date: "2023-01-09", value: 100 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 1000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 1000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1000 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1900 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1000 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
					"排排排排排排排排c": [
						{ date: "2023-01-01", value: 300},
						{ date: "2023-01-02", value: 300},
						{ date: "2023-01-03", value: 300},
						{ date: "2023-01-04", value: 300},
						{ date: "2023-01-05", value: 300},
						{ date: "2023-01-06", value: 300},
						{ date: "2023-01-07", value: 300},
						{ date: "2023-01-08", value: 300},
						{ date: "2023-01-09", value: 100 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 1000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 1000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1000 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1600 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1000 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
					"排排排排排排排排d": [
						{ date: "2023-01-01", value: 400},
						{ date: "2023-01-02", value: 400},
						{ date: "2023-01-03", value: 400},
						{ date: "2023-01-04", value: 400},
						{ date: "2023-01-05", value: 400},
						{ date: "2023-01-06", value: 400},
						{ date: "2023-01-07", value: 400},
						{ date: "2023-01-08", value: 400},
						{ date: "2023-01-09", value: 100 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 1000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 1000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1000 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1300 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1000 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
					"排排排排排排排排e": [
						{ date: "2023-01-01", value: 500},
						{ date: "2023-01-02", value: 500},
						{ date: "2023-01-03", value: 500},
						{ date: "2023-01-04", value: 500},
						{ date: "2023-01-05", value: 500},
						{ date: "2023-01-06", value: 500},
						{ date: "2023-01-07", value: 500},
						{ date: "2023-01-08", value: 500},
						{ date: "2023-01-09", value: 100 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 1000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 1000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1100 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1000 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1000 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
					"排排排排排排排排f": [
						{ date: "2023-01-01", value: 530 },
						{ date: "2023-01-02", value: 50 },
						{ date: "2023-01-03", value: 520 },
						{ date: "2023-01-04", value: 520 },
						{ date: "2023-01-05", value: 520 },
						{ date: "2023-01-06", value: 520 },
						{ date: "2023-01-07", value: 520 },
						{ date: "2023-01-08", value: 520 },
						{ date: "2023-01-09", value: 1000 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 2000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 1000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1000 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1000 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1000 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
					"排排排排排排排排g": [
						{ date: "2023-01-01", value: 630 },
						{ date: "2023-01-02", value: 60 },
						{ date: "2023-01-03", value: 620 },
						{ date: "2023-01-04", value: 620 },
						{ date: "2023-01-05", value: 620 },
						{ date: "2023-01-06", value: 620 },
						{ date: "2023-01-07", value: 620 },
						{ date: "2023-01-08", value: 620 },
						{ date: "2023-01-09", value: 1000 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 1000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 3000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1000 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1000 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1000 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
					"排排排排排排排排gg": [
						{ date: "2023-01-01", value: 630 },
						{ date: "2023-01-02", value: 60 },
						{ date: "2023-01-03", value: 620 },
						{ date: "2023-01-04", value: 620 },
						{ date: "2023-01-05", value: 620 },
						{ date: "2023-01-06", value: 620 },
						{ date: "2023-01-07", value: 620 },
						{ date: "2023-01-08", value: 620 },
						{ date: "2023-01-09", value: 1000 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 1000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 3000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1000 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1000 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1000 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
					"排排排排排排排排ggg": [
						{ date: "2023-01-01", value: 130 },
						{ date: "2023-01-02", value: 60 },
						{ date: "2023-01-03", value: 620 },
						{ date: "2023-01-04", value: 620 },
						{ date: "2023-01-05", value: 620 },
						{ date: "2023-01-06", value: 620 },
						{ date: "2023-01-07", value: 620 },
						{ date: "2023-01-08", value: 620 },
						{ date: "2023-01-09", value: 1000 },
						{ date: "2023-01-10", value: 1000 },
						{ date: "2023-01-11", value: 1000 },
						{ date: "2023-01-12", value: 1000 },
						{ date: "2023-01-13", value: 1000 },
						{ date: "2023-01-14", value: 1000 },
						{ date: "2023-01-15", value: 3000 },
						{ date: "2023-01-16", value: 1000 },
						{ date: "2023-01-17", value: 100 },
						{ date: "2023-01-18", value: 1000 },
						{ date: "2023-01-19", value: 1000 },
						{ date: "2023-01-20", value: 1000 },
						{ date: "2023-01-21", value: 1000 },
						{ date: "2023-01-22", value: 1000 },
						{ date: "2023-01-23", value: 1000 },
						{ date: "2023-01-24", value: 1000 },
						{ date: "2023-01-25", value: 1000 },
						{ date: "2023-01-26", value: 1000 },
						{ date: "2023-01-27", value: 1000 },
						{ date: "2023-01-28", value: 1000 },
						{ date: "2023-01-29", value: 1000 },
						{ date: "2023-01-30", value: 1000 },
					],
				},
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			proxy.$emit("searchEnd");
			if (res.data) {
				// 对象循环
				let i = 0;
				for (let key in res.data) {
					const result = [] as any;
					xList = [];
					typeList.push(key);
					res.data[key].map((item) => {
						result.push(item.value);
						xList.push(item.date);
					});
					let obj = {
						name: key,
						type: "line",
						data: result,
						stack: "total",
						smooth: true,
						areaStyle: {
						normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: 'rgba(0, 255, 255, 1)'
									}, {
										offset: 1,
										color: colors[i]
									}],
								},
								opacity: 0.5
							}
						}
					};
					i++;
					resultList.push(obj);
				}
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
	const chartDom = document.getElementById("lineChart");
	myChart = proxy.$echarts.init(chartDom);
	const option = {
		legend: {
			data: typeList,
			right: 0 ,
			orient:"vertical",
			icon: 'rect',
			itemWidth: 10,
			itemHeight: 10,
			top: 0,
			textStyle: {
				color: "#8C8B8C",
			},
			formatter: (name) => {
				let max = 0
				resultList.map(item => {
					if (item.name === name) {
						max = Math.max(...item.data);
					}
				})
				return name + "最大值：" + max
			},
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
			right: "25%",
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
