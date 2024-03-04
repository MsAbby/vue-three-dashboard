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

const hexToRgba = (hex, opacity) => {
  let rgbaColor = "";
  let reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
      "0x" + hex.slice(3, 5)
    )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
  }
  return rgbaColor;
};

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
				max: 10030,
				value: [
					{date: "2023-01-01", value: 100, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 200, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 5500, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 400, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 1030, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 630, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 530, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 530, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 530, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 530, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 530, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 530, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 530, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 10030, platfom: "gtsp", type: "项项合合代码"},
				]
			},
			{
				name: "排排B",
				max: 9910,
				value: [
					{date: "2023-01-01", value: 120, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 220, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 320, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 420, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 310, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 8130, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 630, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 510, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 510, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 510, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 510, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 510, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 510, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 510, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 9910, platfom: "ntsp", type: "项项合合代码"},
				]
			},
			{
				name: "排排排排排B1",
				max: 8880,
				value: [
					{date: "2023-01-01", value: 1230, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 230, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 430, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 230, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 930, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 130, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 330, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 8880, platfom: "gtsp", type: "项项合合代码"},
				]
			},
			{
				name: "排排排排排排排排B1234",
				max: 7770,
				value: [
					{date: "2023-01-01", value: 140, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 240, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 340, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 440, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 240, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 830, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 140, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 430, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 430, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 4230, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 430, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 430, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 430, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 430, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 7770, platfom: "gtsp", type: "项项合合代码"},
				]
			},
			{
				name: "排排排排排排排排Bdd",
				max: 2660,
				value: [
					{date: "2023-01-01", value: 150, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 250, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 350, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 250, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 5340, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 2660, platfom: "ntsp", type: "项项合合代码"},
				]
			},
			{
				name: "排排排排排排排排fss",
				max: 1660,
				value: [
					{date: "2023-01-01", value: 160, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 260, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 3460, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 460, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 260, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 960, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 630, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 3260, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 1660, platfom: "gtsp", type: "项项合合代码"},
				]
			},
			{
				name: "xings排排排lasdj",
				max: 8030,
				value: [
					{date: "2023-01-01", value: 170, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 270, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 370, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 4270, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 270, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 990, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 190, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 3230, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 8030, platfom: "ntsp", type: "项项合合代码"},
				]
			},
			{
				name: "排排排排排排排排AAAAAAA",
				max: 5340,
				value: [
					{date: "2023-01-01", value: 1150, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 2250, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 3250, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 5130, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 2150, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 5230, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 5230, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 5340, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 5310, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 5310, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 530, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 2660, platfom: "ntsp", type: "项项合合代码"},
				]
			},
			{
				name: "排排排排排排排排fBBBBBBBB",
				max: 3620,
				value: [
					{date: "2023-01-01", value: 1620, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 2620, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 3160, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 4620, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 2160, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 960, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 630, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 3620, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 3160, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 3260, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 3620, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 360, platfom: "gtsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 1660, platfom: "gtsp", type: "项项合合代码"},
				]
			},
			{
				name: "xings排排排CCCCCCC",
				max: 6330,
				value: [
					{date: "2023-01-01", value: 1701, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-02", value: 2701, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-03", value: 3701, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-04", value: 4270, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-05", value: 2701, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-06", value: 2990, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-07", value: 1290, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-08", value: 3230, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-09", value: 3360, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-10", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-11", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-12", value: 330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-13", value: 6330, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-14", value: 3230, platfom: "ntsp", type: "项项合合代码"},
					{date: "2023-01-15", value: 1030, platfom: "ntsp", type: "项项合合代码"},
				]
			},
		],
		description: "SUCCESS",
	};
	if (res.code === "000000") {
		proxy.$emit("searchEnd");
		if (res.data) {
			// 排序
			const result = res.data.sort((a, b) => {
				return b.max - a.max;
			})
			result.map((item, index) => {
				if(index === 0) {
					xList = item.value.map(item => {
						return item.date
					})
				}
				legendList.push(item.name);
				xxdList.push(`${item.name} : ${item.max}`);
				let obj = {
					name: item.name,
					type: "line",
					data: item.value,
					smooth: true,
					showSymbol: false,
					itemStyle: {
						color: colors[index],
					},
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
									color: hexToRgba(colors[index], 0.5)
								}, {
									offset: 1,
									color: "rgba(255, 255, 255, 0)",
								}],
							},
							opacity: 0.5
						}
					}
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
			right: 0 ,
			orient:"vertical",
			icon: 'rect',
			itemWidth: 10,
			itemHeight: 10,
			top: 0,
			data: legendList,
			width: 130,
			textStyle: {
				color: "#8C8B8C",
			},
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
			},
			// item 图形触发， axis 坐标轴触发， none 不触发
			trigger: "item",
			formatter: (params) => {
				const str = `<strong>${params.data.date}</strong></br>
				<p>${params.data.type}： ${params.seriesName}</p>
				<p>索索平台：${params.data.platfom}</p>
				<p>峰峰在在车车数：${params.data.value}</p>
							`;
				return str;
			},
		},
		// 图示空白间距
		grid: {
			top: "10",
			left: "0",
			right: "10%",
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
