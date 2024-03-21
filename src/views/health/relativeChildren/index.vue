<template>
	<div class="relative-container">
		<div class="search flex-x-between">
			<p style="font-size: 18px">某某某欧名称</p>
			<a-button type="primary" class="search-btn">关闭</a-button>
		</div>
		<div class="bottom-container flex-x-between">
			<div class="left-container">
				<div class="flex-x-between">
					<div class="top-container flex-y-between-start">
						<div class="flex-x-between" style="width: 100%">
							<p style="flex: 1" class="flex-x-start">
								<img src="@/assets/image/icons/icon1.png" class="icons-img" />
								<span style="margin-right: 40px">产品关联书</span>
								<span>4</span>
							</p>
							<p style="flex: 1" class="flex-x-start">
								<img src="@/assets/image/icons/icon2.png" class="icons-img" />
								<span style="margin-right: 40px">业务平均想想是啊件</span>
								<span>3</span>
							</p>
						</div>
						<div class="flex-x-between" style="width: 100%">
							<p style="flex: 1" class="flex-x-start">
								<img src="@/assets/image/icons/icon3.png" class="icons-img" />
								<span style="margin-right: 40px">产品关联书</span>
								<span>1.3ms</span>
							</p>
						</div>
					</div>
					<div class="top-container flex-y-between-start">
						<div class="flex-x-between" style="width: 100%">
							<p style="flex: 1; margin-right: 80px" class="flex-x-start">
								<img src="@/assets/image/icons/icon4.png" class="icons-img" />
								<span style="margin-right: 40px">某某某某（季度）</span>
								<span>4</span>
							</p>
							<p style="flex: 1" class="flex-x-start">
								<img src="@/assets/image/icons/icon5.png" class="icons-img" />
								<span style="margin-right: 40px">季度环比</span>
								<span>3%</span>
							</p>
						</div>
						<div class="flex-x-between" style="width: 100%">
							<p style="flex: 1; margin-right: 80px" class="flex-x-start">
								<img src="@/assets/image/icons/icon1.png" class="icons-img" />
								<span style="margin-right: 40px">某某某某某某</span>
								<span>0.1ms</span>
							</p>
							<p style="flex: 1" class="flex-x-start">
								<img src="@/assets/image/icons/icon2.png" class="icons-img" />
								<span style="margin-right: 40px">某某测试</span>
								<span>3</span>
							</p>
						</div>
					</div>
				</div>
				<div class="relative-chart-box">
					<div id="relativeChart" class="relative-chart"></div>
					<div class="flex-x-start-start relative-parent-box">
						<a-tabs
							v-model:activeKey="activeKey"
							tab-position="left"
							:style="{ width: '100px', height: '100%' }"
							>
							<a-tab-pane v-for="item in treeNodeMenu" :key="item.value" :tab="item.label"></a-tab-pane>
						</a-tabs>
						<div
							id="relativeChartTree"
							class="relative-chart-tree"
							style="background-color: #fff"
						></div>
					</div>
				</div>
			</div>
			<div class="right-container">
				<div id="areaChart1" class="area-chart"></div>
				<div id="areaChart2" class="area-chart"></div>
				<a-card
					title="看看列表"
					:bordered="false"
					:headStyle="{
						borderBottom: '1px solid transparent',
						minHeight: '20px',
						padding: '16px 16px 0px',
						lineHeight: '20px',
					}"
					:bodyStyle="{ padding: '12px 16px 16px' }"
					class="card-module"
				>
					<template #extra>
						<div class="flex-x-end">
							<p>共计<span>28</span>个</p>
							<a-button type="primary" style="margin-left: 12px" size="small"
								>更多</a-button
							>
						</div>
					</template>
					<div class="table-container">
						<a-table
							:pagination="false"
							:dataSource="warningList"
							:columns="productList.columns2"
							:rowClassName="
								function (record, index) {
									return 'card-module-table-row';
								}
							"
						/>
					</div>
				</a-card>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick, getCurrentInstance, reactive } from "vue";
import { productList } from "./index.config";
import axios from "axios";

const { proxy }: any = getCurrentInstance();
let activeKey = ref(1)
let treeNodeMenu = ref([{ label: "", value: ""}]);
// 图例列表
let legendList: any = ref([]);

let warningList: any = ref([]);

// 面积图
let optionAreaOne = reactive({
	title: {
		text: "看看看看节点日活",
		left: "left",
		top: "top",
		textStyle: {
			color: "#000000",
		},
		subtextStyle: {
			color: "#000000",
		},
	},
	grid: {
		top: 50,
		bottom: 24,
	},
	xAxis: {
		type: "category",
		data: [],
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
			// 文字颜色
			color: "#666666",
			// 文字大小
			fontSize: 12,
		},
	},
	yAxis: {
		type: "value",
		// 中间区域，水平线条是"虚线"
		splitLine: {
			lineStyle: {
				//虚线
				type: "dashed",
				// 颜色
				// color: ["#F2F2F2 "],
				color: "rgba(229, 229, 229, 0.5)",
			},
			//隐藏
			show: true,
		},
	},
	series: [
		{
			data: [],
			type: "line",
			smooth: true,
			itemStyle: {
				color: "#3A78F2",
			},
			lineStyle: {
				width: 0,
			},
			showSymbol: false,
			areaStyle: {
				normal: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "rgba(70, 151, 242, 0.78)",
							},
							{
								offset: 1,
								color: "rgba(70, 151, 242, 0.18)",
							},
						],
					},
					opacity: 0.8,
				},
			},
		},
	],
});

let optionAreaTwo = reactive({
	title: {
		text: "看看看看节点月活",
		left: "left",
		top: "top",
		textStyle: {
			color: "#000000",
		},
		subtextStyle: {
			color: "#000000",
		},
	},
	grid: {
		top: 50,
		bottom: 24,
		right: 20,
	},
	xAxis: {
		type: "category",
		boundaryGap: [20, 20],
		data: [],
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
			// 文字颜色
			color: "#666666",
			// 文字大小
			fontSize: 12,
		},
	},
	yAxis: {
		type: "value",
		// 中间区域，水平线条是"虚线"
		splitLine: {
			lineStyle: {
				//虚线
				type: "dashed",
				// 颜色
				// color: ["#F2F5F8 "],
				color: "rgba(229, 229, 229, 0.5)",
			},
			//隐藏
			show: true,
		},
	},
	series: [
		{
			data: [],
			type: "line",
			smooth: true,
			itemStyle: {
				color: "#3A78F2",
			},
			lineStyle: {
				width: 0,
			},
			showSymbol: false,
			areaStyle: {
				normal: {
					color: {
						type: "linear",
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: "rgba(70, 151, 242, 0.78)",
							},
							{
								offset: 1,
								color: "rgba(70, 151, 242, 0.18)",
							},
						],
					},
					opacity: 0.8,
				},
			},
		},
	],
});
// 关系图的options
let options = reactive({
	title: {
		text: "关系产品图",
		left: "left",
		top: "top",
		textStyle: {
			color: "#000000",
		},
		subtextStyle: {
			color: "#000000",
		},
	},
	tooltip: {},
	legend: [
		{
			data: legendList.value.map(function (a) {
				return a.name;
			}),
		},
	],
	animationDurationUpdate: 1500,
	animationEasingUpdate: "quinticInOut",
	series: [
		{
			name: "Les Miserables",
			type: "graph",
			layout: "circular",
			circular: {
				rotateLabel: true,
			},
			data: [],
			links: [],
			categories: legendList,
			roam: true,
			label: {
				position: "right",
				formatter: "{b}",
			},
			lineStyle: {
				color: "source",
				curveness: 0.3,
			},
		},
	],
});

let optionParent = reactive({
	// 图示空白间距
	grid: {
		top: "10",
		left: "0",
		right: "20%",
		bottom: "20%",
		containLabel: true,
	},
	series: [
		{
			type: "tree",
			data: [],
			top: '4%',
			left: '7%',
			bottom: '1%',
			right: '20%',
			symbolSize: 7,
			// 意思待定
			roam:true,
			label: {
				position: 'top',
				verticalAlign: 'middle',
				align: 'right',
				fontSize: 9,
				formatter: function (params) {
					console.log(params)
					if (params.data.selected) {
						console.log(params.data.selected)
						let str = "当前:";
						return `{box|${str}${params.data.name}}`;
					} else {
						return `${params.data.name}`;
					}
				},
				rich: {
					box: {
						color: "#3FA7DC",
						background: "#3FA7DC",
					},
				},
			},
			
			//   itemStyle: {
			// 	color: "#5AD8A6"
			//   },
			lineStyle: {
				color: "rgba(229, 229, 229, 1)",
			},
			leaves: {
				label: {
				position: 'right',
				verticalAlign: 'middle',
				align: 'left'
				}
			},
			emphasis: {
				focus: "relative",
			},
			// 节点多时是否折叠
			expandAndCollapse: false,
			animationDuration: 550,
			animationDurationUpdate: 750,
		},
	],
});
onMounted(() => {
	getChartData();
});

/**
 * @description:获取接口
 */
const getChartData = async () => {
	const res = await axios.get("/api/queryRelativeChartsChildren");
	const result = res.data.response;
	if (result.code === "000000") {
		legendList.value = result.data.categories;
		warningList.value = result.data.warningList;
		treeNodeMenu.value = result.data.treeNodeMenu;
		// 面积图1
		const areaData1X = result.data.areaData.map((item) => {
			return item.name;
		});
		optionAreaOne.series[0].data = result.data.areaData;
		optionAreaOne.xAxis.data = areaData1X;

		// 面积图2
		const areaData2X = result.data.areaDataMonth.map((item) => {
			return item.name;
		});
		optionAreaTwo.series[0].data = result.data.areaDataMonth;
		optionAreaTwo.xAxis.data = areaData2X;

		// 关系图
		options.series[0].data = result.data.nodes;
		options.series[0].links = result.data.links;
		options.series[0].categories = result.data.categories;

		// 父子节点图
		console.log(result.data.treeNode)
		optionParent.series[0].data = result.data.treeNode;
		nextTick(() => {
			initChart();
			initChartParent();
			initChartArea1();
			initChartArea2();
		});
	}
};

// 关系图
const initChart = () => {
	const chartDom = document.getElementById(
		"relativeChart"
	) as HTMLCanvasElement;
	let myChart = proxy.$echarts.init(chartDom);
	options && myChart.setOption(options);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			myChart.resize();
		}, 500);
	});
};

// 父子关系图
const initChartParent = () => {
	const chartDom = document.getElementById("relativeChartTree") as HTMLCanvasElement;
	let myChart = proxy.$echarts.init(chartDom);
	optionParent && myChart.setOption(optionParent);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			myChart.resize();
		}, 500);
	});
};

// 面积图1
const initChartArea1 = () => {
	const chartDom = document.getElementById("areaChart1") as HTMLCanvasElement;
	let myChart = proxy.$echarts.init(chartDom);
	optionAreaOne && myChart.setOption(optionAreaOne);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			myChart.resize();
		}, 500);
	});
};

// 面积图2
const initChartArea2 = () => {
	const chartDom = document.getElementById("areaChart2") as HTMLCanvasElement;
	let myChart = proxy.$echarts.init(chartDom);
	optionAreaTwo && myChart.setOption(optionAreaTwo);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			myChart.resize();
		}, 500);
	});
};

</script>
<style scoped lang="less">
@import "@/assets/style/variable.less";

.relative-container {
	width: 100%;
	// height: calc(100% - 120px);
	height: calc(100% - 62px);
	padding: 16px;
	.left-container {
		flex: 1;
		height: 100%;
		overflow: hidden;
	}

	.search {
		background: #ffffff;
		padding: 4px 16px;
	}

	.bottom-container {
		margin-top: 16px;
		// width: 100%;
		// height: calc(100% - 96px);
		height: calc(100% - 54px);

		.top-container {
			flex: 1;
			height: 80px;
			background: #ffffff;
			margin-bottom: 16px;
			margin-right: 16px;
			border-radius: 10px;
			padding: 16px;
			.icons-img {
				width: 20px;
				margin-right: 10px;
			}
		}
		.relative-chart-box {
			height: calc(100% - 96px);
		}

		.relative-parent-box {
			height: 350px;
			background: #ffffff;
			padding: 16px 16px 16px 0;
			border-radius: 10px;
			.relative-chart-tree {
				height: 100%;
				flex: 1;
				margin-left: 16px;
			}
		}
		.relative-chart {
			height: 350px;
			background: #ffffff;
			padding: 16px;
			margin-right: 16px;
			border-radius: 10px;
			margin-bottom: 16px;
		}

		.right-container {
			height: 100%;
			width: 600px;

			.area-chart {
				width: 100%;
				height: 260px;
				background: #ffffff;
				margin-bottom: 16px;
				border-radius: 10px;
				padding: 16px;
			}
			.card-module {
				margin-bottom: 16px;
				&:last-child {
					margin-bottom: 0;
				}
			}
			.table-container {
				background: rgba(247, 247, 247, 1);
				padding: 0 16px 6px;
			}
		}
	}
}
</style>
<style lang="less">
// 表格头部
.custom-header {
	padding: 10px 16px !important;
}
// 表格行
.card-module-table-row {
	height: 10px;
	background: rgba(247, 247, 247, 1);
	td {
		padding: 4px !important;
		font-size: 12px !important;
		&:first-child {
			color: rgba(42, 130, 228, 1);
		}
	}
	&:last-child {
		td {
			border-bottom: 1px solid transparent !important;
		}
	}
}
</style>
