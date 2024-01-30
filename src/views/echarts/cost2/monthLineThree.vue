<template>
	<div class="line-container">
		<h3>月度数据</h3>
		<div class="bar-box">
			<div class="canvas-box" id="lineChartThree"></div>
		</div>
	</div>
</template>
<script lang="ts" setup name="monthLineThree">
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
let typeList: Array<any> = [];
let resultList = [] as any;

const handelData = () => {
	xList = [];
	typeList = [];
	try {
		// const res = await xxxxxxxx({month});
		const res = {
			code: "000000",
			data: {
				"系别A": [
					{date: "2023-01-01", value: "100"},
					{date: "2023-01-02", value: "100"},
					{date: "2023-01-03", value: "100"},
					{date: "2023-01-04", value: "100"},
					{date: "2023-01-05", value: "100"},
					{date: "2023-01-06", value: "100"},
					{date: "2023-01-07", value: "100"},
					{date: "2023-01-08", value: "100"}
				],
				"系别B": [
					{date: "2023-01-01", value: "200"},
					{date: "2023-01-02", value: "200"},
					{date: "2023-01-03", value: "200"},
					{date: "2023-01-04", value: "200"},
					{date: "2023-01-05", value: "200"},
					{date: "2023-01-06", value: "200"},
					{date: "2023-01-07", value: "200"},
					{date: "2023-01-08", value: "200"}
				],
				"系别C": [
					{date: "2023-01-01", value: "300"},
					{date: "2023-01-02", value: "300"},
					{date: "2023-01-03", value: "300"},
					{date: "2023-01-04", value: "300"},
					{date: "2023-01-05", value: "300"},
					{date: "2023-01-06", value: "300"},
					{date: "2023-01-07", value: "300"},
					{date: "2023-01-08", value: "300"}
				],
				"系别D": [
					{date: "2023-01-01", value: "400"},
					{date: "2023-01-02", value: "400"},
					{date: "2023-01-03", value: "400"},
					{date: "2023-01-04", value: "400"},
					{date: "2023-01-05", value: "400"},
					{date: "2023-01-06", value: "400"},
					{date: "2023-01-07", value: "400"},
					{date: "2023-01-08", value: "400"}
				],
				"系别E": [
					{date: "2023-01-01", value: "500"},
					{date: "2023-01-02", value: "500"},
					{date: "2023-01-03", value: "500"},
					{date: "2023-01-04", value: "500"},
					{date: "2023-01-05", value: "500"},
					{date: "2023-01-06", value: "500"},
					{date: "2023-01-07", value: "500"},
					{date: "2023-01-08", value: "500"}
				],
				"系别F": [
					{date: "2023-01-01", value: "530"},
					{date: "2023-01-02", value: "50"},
					{date: "2023-01-03", value: "520"},
					{date: "2023-01-04", value: "520"},
					{date: "2023-01-05", value: "520"},
					{date: "2023-01-06", value: "520"},
					{date: "2023-01-07", value: "520"},
					{date: "2023-01-08", value: "520"}
				],
				"系别G": [
					{date: "2023-01-01", value: "630"},
					{date: "2023-01-02", value: "60"},
					{date: "2023-01-03", value: "620"},
					{date: "2023-01-04", value: "620"},
					{date: "2023-01-05", value: "620"},
					{date: "2023-01-06", value: "620"},
					{date: "2023-01-07", value: "620"},
					{date: "2023-01-08", value: "620"}
				]
			},
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			proxy.$emit("searchEnd");
			if (res.data) {
				// 获取系别
				let typeList = Object.keys(res.data);
				// 对象循环
				for	(let key in res.data) {
					const result = [] as any
					xList = [];
					res.data[key].map((item) => {
						result.push(item.value)
						xList.push(item.date);
					})
					let obj = {
						name: key,
						type: "line",
						stack: 'Total',
						areaStyle: {},
						data: result
					}
					resultList.push(obj)
				}
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
	}
};
const initEcharts = (list) => {
	const chartDom = document.getElementById("lineChartThree");
	myChart = proxy.$echarts.init(chartDom);
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
