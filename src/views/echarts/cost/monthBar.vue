<template>
	<div class="bar-container">
		<h3>月度数据</h3>
		<div class="bar-box">
			<a-spin fix v-if="isShow" />
			<div class="empty" v-show="dataList.length === 0 && !isShow">
				暂无数据
			</div>
			<div class="canvas-box" id="barChart" v-show="dataList.length"></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, getCurrentInstance, nextTick, defineProps, watch, ref, Ref } from "vue";

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
	console.log("-------", newVal)
	isSearchReactive.value = newVal;
	if (newVal) {
		handelData()
	}
});

let myChart: any = null;
let isShow: boolean = false;
let option: any = {};
let xList: Array<any> = [];
let yList: Array<any> = [];
let dataList: Array<any> = [];

onMounted(() => {
	handelData();
})

const handelData = () => {
	console.log("monthReactive", props.month);
	isShow = true;
	xList = [];
	yList = [];
	try {
		// const res = await xxxxxxxx({month});
		const res = {
			code: "000000",
			data: [
				{
					name: "哈弗大狗",
					value: 71,
				},
				{
					name: "哈弗A07",
					value: 35,
				},
				{
					name: "WEY C01 DHT-PHEV",
					value: 25,
				},
				{
					name: "P11乘用版",
					value: 18,
				},
				{
					name: "B07测试",
					value: 18,
				},
				{
					name: "哈弗B26",
					value: 18,
				},
				{
					name: "哈弗B16",
					value: 17,
				},
				{
					name: "坦克 坦克 300",
					value: 17,
				},
				{
					name: "B07",
					value: 17,
				},
				{
					name: "欧拉ES11",
					value: 16,
				},
				{
					name: "WEY V71 PHEV",
					value: 15,
				},
				{
					name: "哈弗初恋",
					value: 15,
				},
				{
					name: "欧拉闪电猫",
					value: 14,
				},
				{
					name: "哈弗 A08",
					value: 13,
				},
				{
					name: "坦克 坦克700 Hi4-T",
					value: 13,
				},
				{
					name: "哈弗第三代H6",
					value: 12,
				},
				{
					name: "WEY C01 DHT-3-PHEV",
					value: 11,
				},
				{
					name: "哈弗B01-3",
					value: 10,
				},
				{
					name: "坦克 坦克500",
					value: 9,
				},
				{
					name: "坦克 坦克700",
					value: 8,
				},
				{
					name: "哈弗F7x",
					value: 7,
				},
				{
					name: "哈弗枭龙MAX",
					value: 6,
				},
				{
					name: "欧拉EC31",
					value: 6,
				},
				{
					name: "WEY DE09",
					value: 6,
				},
				{
					name: "欧拉EC24",
					value: 6,
				},
				{
					name: "A07",
					value: 5,
				},
				{
					name: "哈弗F5",
					value: 5,
				},
				{
					name: "坦克 坦克 400",
					value: 4,
				},
				{
					name: "长城皮卡长城炮-乘用皮卡",
					value: 4,
				},
				{
					name: "WEY M81PHEV",
					value: 4,
				},
				{
					name: "哈弗H6",
					value: 3,
				},
				{
					name: "哈弗B06",
					value: 3,
				},
				{
					name: "灵魂 旅行三箱CCS001",
					value: 3,
				},
				{
					name: "WEY M83",
					value: 3,
				},
				{
					name: "哈弗H6国潮版F",
					value: 3,
				},
				{
					name: "哈弗A01",
					value: 3,
				},
				{
					name: "欧拉ES22",
					value: 3,
				},
				{
					name: "长城皮卡长城炮-山海炮",
					value: 3,
				},
				{
					name: "B16哈弗",
					value: 2,
				},
				{
					name: "哈弗神兽",
					value: 2,
				},
				{
					name: "灵魂 巡航CCS001",
					value: 2,
				},
				{
					name: "哈弗枭龙PHEV",
					value: 2,
				},
				{
					name: "欧拉ES14",
					value: 2,
				},
				{
					name: "欧拉ES11GT",
					value: 2,
				},
				{
					name: "WEY V71",
					value: 2,
				},
				{
					name: "长城皮卡长城炮-越野皮卡",
					value: 2,
				},
				{
					name: "哈弗F7",
					value: 2,
				},
				{
					name: "CCS001",
					value: 2,
				},
				{
					name: "欧拉 EC02白猫",
					value: 2,
				},
				{
					name: "欧拉ES13",
					value: 2,
				},
				{
					name: "哈弗赤兔",
					value: 2,
				},
				{
					name: "哈弗H6国潮版",
					value: 1,
				},
				{
					name: "灵魂 旅行两箱CCS001",
					value: 1,
				},
				{
					name: "哈弗枭龙",
					value: 1,
				},
				{
					name: "长城皮卡 p06",
					value: 1,
				},
				{
					name: "WEY P02 PHEV",
					value: 1,
				},
				{
					name: "欧拉R1",
					value: 1,
				},
				{
					name: "WEY V61DHT",
					value: 1,
				},
				{
					name: "新哈弗H9",
					value: 1,
				},
				{
					name: "WEY 玛奇朵",
					value: 1,
				},
				{
					name: "WEY 拿铁DHT-PHEV",
					value: 1,
				},
				{
					name: "WEY D03 PHEV",
					value: 1,
				},
				{
					name: "长城皮卡长城炮-商用皮卡",
					value: 1,
				},
				{
					name: "哈弗酷狗",
					value: 1,
				},
				{
					name: "红标哈弗H2",
					value: 1,
				},
				{
					name: "P04",
					value: 1,
				},
				{
					name: "长城皮卡长城炮-乘用雨棚",
					value: 1,
				},
				{
					name: "哈弗第三代H6 PHEV",
					value: 1,
				},
				{
					name: "哈弗H6S",
					value: 1,
				},
				{
					name: "欧拉iQ",
					value: 1,
				},
				{
					name: "欧拉 KEC01黑猫",
					value: 1,
				},
				{
					name: "WEY VV5",
					value: 1,
				},
				{
					name: "哈弗H6运动版",
					value: 1,
				},
				{
					name: "WEY P8",
					value: 1,
				},
			],
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			dataList = res.data;
			if (dataList && dataList.length > 0) {
				dataList.forEach((item) => {
					xList.push(item.name);
					yList.push(item.value);
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
		isShow = false;
	}
};
const initEcharts = () => {
	const chartDom = document.getElementById("barChart");
	myChart = proxy.$echarts.init(chartDom);

	const option = {
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
		series: [
			{
				name: "Direct",
				type: "bar",
				barWidth: "16",
				background: "#3A78F2",
				data: yList,
				itemStyle: {
					color: "#3A78F2", // 定义柱子颜色
				},
			},
		],
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
		],
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
