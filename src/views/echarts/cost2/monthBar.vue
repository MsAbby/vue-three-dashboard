<template>
	<div class="bar-container">
		<h3>月度数据</h3>
		<div class="bar-box">
			<div class="canvas-box" id="barChart1"></div>
		</div>
	</div>
</template>
<script lang="ts" setup name="monthBarSecond">
import { getCurrentInstance, nextTick, defineProps, watch, ref, Ref, onMounted } from "vue";

const { proxy }: any = getCurrentInstance();

// prop
const props = defineProps({
	month: String,
	isSearch: Boolean,
});

// Define a reactive variable to store the prop value
const isSearchReactive: Ref<boolean> = ref(props.isSearch);

// watch
watch(() => props.month, (newVal) => {
	if (newVal) {
		handelData()
	}
});
watch(() => props.isSearch, (newVal) => {
	isSearchReactive.value = newVal;
	if (newVal) {
		handelData()
	}
});

onMounted(() => {
	console.log("hhhhhhhhhh",isSearchReactive)
})
let myChart: any = null;
let xList: Array<any> = [];
let yList: Array<any> = [];
let typeList: Array<any> = [];
let resultList = [] as any;

const handelData = () => {
	console.log("monthReactive", props.month);
	xList = [];
	yList = [];
	typeList = [];
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
						{ date: "2023-01-09", value: 100 },
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
					"牌牌B": [
						{ date: "2023-01-01", value: "200" },
						{ date: "2023-01-02", value: "200" },
						{ date: "2023-01-03", value: "200" },
						{ date: "2023-01-04", value: "200" },
						{ date: "2023-01-05", value: "200" },
						{ date: "2023-01-06", value: "200" },
						{ date: "2023-01-07", value: "200" },
						{ date: "2023-01-08", value: "200" },
						{ date: "2023-01-09", value: 100 },
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
					"牌牌c": [
						{ date: "2023-01-01", value: "300" },
						{ date: "2023-01-02", value: "300" },
						{ date: "2023-01-03", value: "300" },
						{ date: "2023-01-04", value: "300" },
						{ date: "2023-01-05", value: "300" },
						{ date: "2023-01-06", value: "300" },
						{ date: "2023-01-07", value: "300" },
						{ date: "2023-01-08", value: "300" },
						{ date: "2023-01-09", value: 100 },
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
					"牌牌d": [
						{ date: "2023-01-01", value: "400" },
						{ date: "2023-01-02", value: "400" },
						{ date: "2023-01-03", value: "400" },
						{ date: "2023-01-04", value: "400" },
						{ date: "2023-01-05", value: "400" },
						{ date: "2023-01-06", value: "400" },
						{ date: "2023-01-07", value: "400" },
						{ date: "2023-01-08", value: "400" },
						{ date: "2023-01-09", value: 100 },
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
					"牌牌e": [
						{ date: "2023-01-01", value: "500" },
						{ date: "2023-01-02", value: "500" },
						{ date: "2023-01-03", value: "500" },
						{ date: "2023-01-04", value: "500" },
						{ date: "2023-01-05", value: "500" },
						{ date: "2023-01-06", value: "500" },
						{ date: "2023-01-07", value: "500" },
						{ date: "2023-01-08", value: "500" },
						{ date: "2023-01-09", value: 100 },
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
					"牌牌f": [
						{ date: "2023-01-01", value: "530" },
						{ date: "2023-01-02", value: "50" },
						{ date: "2023-01-03", value: "520" },
						{ date: "2023-01-04", value: "520" },
						{ date: "2023-01-05", value: "520" },
						{ date: "2023-01-06", value: "520" },
						{ date: "2023-01-07", value: "520" },
						{ date: "2023-01-08", value: "520" },
						{ date: "2023-01-09", value: 100 },
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
					"牌牌g": [
						{ date: "2023-01-01", value: "630" },
						{ date: "2023-01-02", value: "60" },
						{ date: "2023-01-03", value: "620" },
						{ date: "2023-01-04", value: "620" },
						{ date: "2023-01-05", value: "620" },
						{ date: "2023-01-06", value: "620" },
						{ date: "2023-01-07", value: "620" },
						{ date: "2023-01-08", value: "620" },
						{ date: "2023-01-09", value: 100 },
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
					typeList.push(key);
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
	const chartDom = document.getElementById("barChart1");
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
				return name + "：" + max
			},
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			formatter: (params) => {
				const str = `<strong>${params[0].name}</strong></br>
								<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#3A78F2;"></span>
								月度数据： ${params[0].value}
							`;
				return str;
			},
		},
		// 图示空白间距
		grid: {
			top: "10",
			left: "0",
			right: "20%",
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
