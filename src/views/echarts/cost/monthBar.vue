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
let option: any = {};
let xList: Array<any> = [];
let yList: Array<any> = [];
let dataList: Array<any> = [];

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
					name: "ABCD",
					value: 71,
				},
				{
					name: "ABCDEFG",
					value: 35,
				},
				{
					name: "ABCDEFG ABCDEFG",
					value: 25,
				},
				{
					name: "ABCDEFGG",
					value: 18,
				},
				{
					name: "ABCDEFGG1",
					value: 18,
				},
				{
					name: "ABCDEFGG56",
					value: 18,
				},
				{
					name: "ABCDEFGG56SDS",
					value: 17,
				},
				{
					name: "ABCDEFGG56SDSASDASD",
					value: 17,
				},
				{
					name: "AD",
					value: 17,
				},
				{
					name: "ABCDEFGG56SDSASDASD121",
					value: 16,
				},
				{
					name: "ABCDEFGG56SASD",
					value: 15,
				},
				{
					name: "ABCDRTERT",
					value: 15,
				},
				{
					name: "ABCDRTERT1",
					value: 14,
				},
				{
					name: "ABCDRTT",
					value: 13,
				},
				{
					name: "ABCDRTERTDGFDGFDG",
					value: 13,
				},
				{
					name: "ABCDRT",
					value: 12,
				},
				{
					name: "ABCDRTERTHEV",
					value: 11,
				},
				{
					name: "ABCDRTERT",
					value: 10,
				},
				{
					name: "ABCDRTERT121",
					value: 9,
				},
				{
					name: "ABCDRTERT76567",
					value: 8,
				},
				{
					name: "ABCDRTERTAS1",
					value: 7,
				},
				{
					name: "ABCDRTEQWE",
					value: 6,
				},
				{
					name: "ABVFG",
					value: 6,
				},
				{
					name: "ABCDRTERT545",
					value: 6,
				},
				{
					name: "ABCDR000",
					value: 6,
				},
				{
					name: "A07",
					value: 5,
				},
				{
					name: "ABCD090",
					value: 5,
				},
				{
					name: "ABCD090DASDSDSGHGH",
					value: 4,
				},
				{
					name: "ABCD090DASDSDSGHGH788",
					value: 4,
				},
				{
					name: "ABCD090DASD12",
					value: 4,
				},
				{
					name: "ASSDSDSDS",
					value: 3,
				},
				{
					name: "DFGDFGDFGF",
					value: 3,
				},
				{
					name: "434DFGSDDDSFDSF1",
					value: 3,
				},
				{
					name: "FGJGJGSD",
					value: 3,
				},
				{
					name: "RWXCVCGERFSFFD",
					value: 3,
				},
				{
					name: "DFDS234",
					value: 3,
				},
				{
					name: "SDFSFSGSD32",
					value: 3,
				},
				{
					name: "SDFSFDSFDSFGHFGJHGJH",
					value: 3,
				},
				{
					name: "DSF",
					value: 2,
				},
				{
					name: "FSDSDFTR6546",
					value: 2,
				},
				{
					name: "DFGFDGGHJ87697",
					value: 2,
				},
				{
					name: "SDSADAS23424",
					value: 2,
				},
				{
					name: "DFSF67876HGHFGH",
					value: 2,
				},
				{
					name: "SDFSDGHJJH345FFF",
					value: 2,
				},
				{
					name: "12FDF5TS",
					value: 2,
				},
				{
					name: "FDGDJHKJOFBVCBVBBXCV",
					value: 2,
				},
				{
					name: "DSFDSF2",
					value: 2,
				},
				{
					name: "SDF5YB",
					value: 2,
				},
				{
					name: "FGJGHKJHKYDFG",
					value: 2,
				},
				{
					name: "WQEVCXVNH",
					value: 2,
				},
				{
					name: "DFG GHYTDF",
					value: 2,
				},
				{
					name: "345VBVFCBV DF",
					value: 1,
				},
				{
					name: "SDFVC GHJKGF",
					value: 1,
				},
				{
					name: "SDFSDF3SV  FGHFGGFDGF",
					value: 1,
				},
				{
					name: "长SDFVBH p06",
					value: 1,
				},
				{
					name: "WDSFFD F PHEV",
					value: 1,
				},
				{
					name: "拉DSFDFDR1",
					value: 1,
				},
				{
					name: "343 SDF45",
					value: 1,
				},
				{
					name: "DSFDSJK",
					value: 1,
				},
				{
					name: "WSDFEY SDFDFDSF",
					value: 1,
				},
				{
					name: "323 SDASDSADS-HJH",
					value: 1,
				},
				{
					name: "565FGX DFD FSDF",
					value: 1,
				},
				{
					name: "SDF-DSFNHJH",
					value: 1,
				},
				{
					name: "DFFD",
					value: 1,
				},
				{
					name: "SDFSDSGSG GDFGF",
					value: 1,
				},
				{
					name: "P04",
					value: 1,
				},
				{
					name: "SDFKJKHG-23",
					value: 1,
				},
				{
					name: "HGHKJHGHJFDFG 23",
					value: 1,
				},
				{
					name: "FSGHJH",
					value: 1,
				},
				{
					name: "HKLCVX D",
					value: 1,
				},
				{
					name: "SDF SDFD",
					value: 1,
				},
				{
					name: "DFSF  FDV VV5",
					value: 1,
				},
				{
					name: "PIKJHCVSC",
					value: 1,
				},
				{
					name: "ASD 343",
					value: 1,
				},
			],
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			proxy.$emit("searchEnd");
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
