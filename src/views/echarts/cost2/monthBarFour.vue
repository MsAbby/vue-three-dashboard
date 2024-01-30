<template>
	<div class="bar-container">
		<h3 @click="change">月度数据</h3>
		<div class="bar-box">
			<div class="canvas-box" id="barChartFour"></div>
		</div>
	</div>
</template>
<script lang="ts" setup name="MonthBarFour">
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
let two = ref(true);

let myChart: any = null;
let xList: Array<any> = [];
let resultList = [] as any;

const change = () => {
	two.value = !two.value;
	console.log("11111")
	handelData();
};
const handelData = () => {
	xList = [];
	resultList = [];
	console.log("++++", two.value)
	try {
		let res = {
			code: "000000",
			data: {},
			description: "",
		};
			res = {
				code: "000000",
				data: {
					"牌牌A": [
						{ date: "2023-01-01", value: "100" },
						{ date: "2023-01-02", value: "100" },
						{ date: "2023-01-03", value: "100" },
						{ date: "2023-01-04", value: "100" },
						{ date: "2023-01-05", value: "100" },
						{ date: "2023-01-06", value: "100" },
						{ date: "2023-01-07", value: "100" },
						{ date: "2023-01-08", value: "100" },
					],
					"牌牌B": [
						{ date: "2023-01-01", value: "200" },
						{ date: "2023-01-02", value: "200" },
						{ date: "2023-01-03", value: "200" },
						{ date: "2023-01-04", value: "200" },
						{ date: "2023-01-05", value: "200" },
						{ date: "2023-01-06", value: "200" },
						{ date: "2023-01-07", value: "200" },
						{ date: "2023-01-08", value: "200" },
					],
					"牌牌c": [
						{ date: "2023-01-01", value: "300" },
						{ date: "2023-01-02", value: "300" },
						{ date: "2023-01-03", value: "300" },
						{ date: "2023-01-04", value: "300" },
						{ date: "2023-01-05", value: "300" },
						{ date: "2023-01-06", value: "300" },
						{ date: "2023-01-07", value: "300" },
						{ date: "2023-01-08", value: "300" },
					],
					"牌牌d": [
						{ date: "2023-01-01", value: "400" },
						{ date: "2023-01-02", value: "400" },
						{ date: "2023-01-03", value: "400" },
						{ date: "2023-01-04", value: "400" },
						{ date: "2023-01-05", value: "400" },
						{ date: "2023-01-06", value: "400" },
						{ date: "2023-01-07", value: "400" },
						{ date: "2023-01-08", value: "400" },
					],
					"牌牌e": [
						{ date: "2023-01-01", value: "500" },
						{ date: "2023-01-02", value: "500" },
						{ date: "2023-01-03", value: "500" },
						{ date: "2023-01-04", value: "500" },
						{ date: "2023-01-05", value: "500" },
						{ date: "2023-01-06", value: "500" },
						{ date: "2023-01-07", value: "500" },
						{ date: "2023-01-08", value: "500" },
					],
					"牌牌f": [
						{ date: "2023-01-01", value: "530" },
						{ date: "2023-01-02", value: "50" },
						{ date: "2023-01-03", value: "520" },
						{ date: "2023-01-04", value: "520" },
						{ date: "2023-01-05", value: "520" },
						{ date: "2023-01-06", value: "520" },
						{ date: "2023-01-07", value: "520" },
						{ date: "2023-01-08", value: "520" },
					],
					"牌牌g": [
						{ date: "2023-01-01", value: "630" },
						{ date: "2023-01-02", value: "60" },
						{ date: "2023-01-03", value: "620" },
						{ date: "2023-01-04", value: "620" },
						{ date: "2023-01-05", value: "620" },
						{ date: "2023-01-06", value: "620" },
						{ date: "2023-01-07", value: "620" },
						{ date: "2023-01-08", value: "620" },
					],
				},
				description: "SUCCESS",
			};
			// res = {
			// 	code: "000000",
			// 	data: {
			// 		"ggggggggggg": [
			// 			{ date: "2023-01-01", value: "100" },
			// 			{ date: "2023-01-02", value: "100" },
			// 			{ date: "2023-01-03", value: "100" },
			// 			{ date: "2023-01-04", value: "100" },
			// 			{ date: "2023-01-05", value: "100" },
			// 			{ date: "2023-01-06", value: "100" },
			// 			{ date: "2023-01-07", value: "100" },
			// 			{ date: "2023-01-08", value: "100" },
			// 		],
			// 		"nnnnnnnnnnnn": [
			// 			{ date: "2023-01-01", value: "200" },
			// 			{ date: "2023-01-02", value: "200" },
			// 			{ date: "2023-01-03", value: "200" },
			// 			{ date: "2023-01-04", value: "200" },
			// 			{ date: "2023-01-05", value: "200" },
			// 			{ date: "2023-01-06", value: "200" },
			// 			{ date: "2023-01-07", value: "200" },
			// 			{ date: "2023-01-08", value: "200" },
			// 		],
			// 	},
			// 	description: "SUCCESS",
			// };

		if (res.code === "000000") {
			const list = JSON.parse(JSON.stringify(res.data));
			proxy.$emit("searchEnd");
			if (list) {
				console.log("2222", res.data)
				// 对象循环
				for (let key in res.data) {
					const result = [] as any;
					xList = [];
					res.data[key].map((item) => {
						result.push(item.value);
						xList.push(item.date);
					});
					let obj = {
						name: key,
						type: "bar",
						data: result,
						stack: "total",
						markLine: {
							symbolSize: 0, // 不显示标记点
							label: {
								show: true,
								position: 'end',
								formatter: '{c}', // 格式化标记线文本
								textStyle: {
									color: '#000',
									fontWeight: 'bold'
								}
							},
							lineStyle: {
								normal: {
									width: 2,
									type: 'solid',
									color: '#ff0000' // 红色
								}
							},
							data: [{
								name: 'Y 轴值为 100 的水平线',
								yAxis: 300
							}]
						}
					};
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
	console.log("1212", resultList)
	const chartDom = document.getElementById("barChartFour");
	myChart = proxy.$echarts.init(chartDom);

	const option = {
		tooltip: {
			trigger: "axis",
		},
		grid: {
			top: "0",
			left: "0",
			right: "20",
			bottom: "20%",
			containLabel: true,
		},
		xAxis: {
			type: "category",
			data: xList,
		},
		yAxis: {
			type: "value",
		},
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
