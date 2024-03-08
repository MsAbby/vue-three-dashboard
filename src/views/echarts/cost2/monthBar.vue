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
let legendList: Array<any> = [];
let resultList = [] as any;

const handelData = () => {
	console.log("monthReactive", props.month);
	xList = [];
	yList = [];
	legendList = [];
	resultList = [];
	let res = {
		code: "000000",
		data: {},
		description: "",
	};
	res = {
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
			name: "xings排排排asdsadasdsd",
			max: 8030,
			value: [
				{date: "2023-01-01", value: 1170, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-02", value: 2270, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-03", value: 3170, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-04", value: 270, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-05", value: 2730, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-06", value: 990, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-07", value: 1190, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-08", value: 3230, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-09", value: 3330, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-10", value: 3130, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-11", value: 3330, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-12", value: 3630, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-13", value: 3230, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-14", value: 3230, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-15", value: 8030, platfom: "ntsp", type: "项项合合代码"},
			]
		},
		{
			name: "xings排排排lasdjasaccc",
			max: 8030,
			value: [
				{date: "2023-01-01", value: 1701, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-02", value: 2702, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-03", value: 3702, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-04", value: 4070, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-05", value: 2710, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-06", value: 990, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-07", value: 1910, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-08", value: 3310, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-09", value: 330, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-10", value: 3130, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-11", value: 3030, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-12", value: 330, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-13", value: 330, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-14", value: 3230, platfom: "ntsp", type: "项项合合代码"},
				{date: "2023-01-15", value: 8030, platfom: "ntsp", type: "项项合合代码"},
			]
		},
	],
		description: "",
	}
	

	if (res.code === "000000") {
		const list = JSON.parse(JSON.stringify(res.data));
		proxy.$emit("searchEnd");
		if (list) {
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
				legendList.push({name: item.name, value: item.value});
				let obj = {
					name: item.name,
					type: "bar",
					data: item.value,
					stack: "a",
				};
				resultList.push(obj);
			})
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
		color: [
			"#3A78F2",
			"#FF953D",
			"#D80000",
			"#EE66FF",
			"#70008F",
			"#B9A5A3",
			"#36CE9E",
			"#FFC005",
			"#EE6666",
			"#8B5CFF",
			"#00CA69",
			"#15CE87",
			"#C7E317",
			"#47D468",
		],
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
			trigger: "item",
			formatter: (params) => {
				console.log(params)
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
