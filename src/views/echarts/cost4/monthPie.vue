<template>
	<div class="month-pie-box">
		<article class="flex-x-between title-area">
			<h3>哈哈方面月度数据使用</h3>
			<ul class="flex-x-between tabs-box">
				<li
					v-for="item in modelList"
					:key="item.value"
					:class="['tabs-item', mActive === item.value ? 'tabs-active' : '']"
					@click="changeModel(item)"
				>
					{{ item.label }}
				</li>
			</ul>
		</article>
		<a-row :gutter="0">
			<a-col :xxl="14" :xl="14" :md="24" :sm="24" :xs="24">
				<section class="month-cost-pie">
					<!-- content -->
					<article class="echart-father">
						<a-spin fix v-if="showPie" />
						<!-- <div class="empty-text" v-show="mData.length === 0">
							暂无数据
						</div>
						<div v-show="mData.length !== 0" style="width: 100%;"> -->
						<div class="echart" id="monthMChart" ref="monthMChart"></div>
						<!-- </div> -->
					</article>
				</section>
			</a-col>
			<a-col :xxl="10" :xl="10" :md="24" :sm="24" :xs="24">
				<section class="month-cost-pie">
					<!-- content -->
					<article class="echart-father" style="width: 80%;">
						<a-spin fix v-if="showPieDepart" />
						<!-- <div class="empty-text" v-show="dData.length === 0">
							暂无数据
						</div>
						<div v-show="dData.length !== 0" style="width: 100%;"> -->
						<div class="echart" id="monthDChart" ref="monthDChart" style="height: 240px; margin-top: 40px;"></div>
						<!-- </div> -->
					</article>
				</section>
			</a-col>
		</a-row>
	</div>
</template>
<script lang="ts" setup name="MonthBarThree">
import { getCurrentInstance, nextTick, watch, Ref, ref } from "vue";

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
	() => props.isSearch,
	(newVal) => {
		isSearchReactive.value = newVal;
		if (newVal) {
			init();
		}
	}
);

let option2 = {
	// 悬浮框
	tooltip: {
		show: true,
		// 让toolltip紧跟鼠标， 防止抖动
		transitionDuration: 0,
		// 鼠标是否可以进入悬浮框
		enterable: true,
		// 触发方式 mousemove, click, none, mousemove|click
		triggerOn: "click",
		// item 图形触发， axis 坐标轴触发， none 不触发
		trigger: "item",
		// 浮层隐藏的延迟
		hideDelay: 100,
		// 背景色
		backgroundColor: "rgba(255, 255, 255, 1)",
		// 边框颜色
		borderColor: "rgba(255, 255, 255, 1)",
		padding: 0,
	},
	// 图示空白间距
	grid: {
		top: "10",
		left: "0",
		right: "0",
		bottom: "10",
		containLabel: true,
	},
	// 饼图颜色
	color: [
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
	],
	title: {
		text: "一级涨涨占比",
		left: "center",
		top: "45%",
		textStyle:{
			color: "#000000",
			fontSize: 14,
			align: "center"
		}
	},
	series: [
		{
			name: "姓名",
			type: "pie",
			// avoidLabelOverlap: false,
			// 空心饼图
			radius: ["40%", "70%"],
			// 饼图中心坐标
			center: ["50%", "50%"],
			// left: "center",
			data: [],
			itemStyle: {
				// 间距
				borderColor: "#fff",
				borderWidth: 1,
			},
			// 指导线文字格式
			label: {
				// formatter: (params) => {
				// 	return params.data.name + "\n" + params.data.value + "%";
				// },
				// }
				formatter: "{b}: {c}  ({d}%)",
				lineHeight: 14,
			},
			// 引导线
			labelLine: {
				// 指导线长度1
				length: 10,
				// 指导线长度2
				length2: 20,
				minSurfaceAngle: 90,
				// lineStyle: {
				// 	// 指导线颜色
				// 	color: "#CECECE",
				// },
			},
			// 饼图中间显示配置/ hover 文字放大
			emphasis: {
				label: {
					show: true,
					fontSize: "14",
					scale: true,
					scaleSize: 36,
					fontWeight: "bold",
					formatter: "{b}\n（{d}%）",
				},
			},
		},
	],
};

// 不使用mixins ，逻辑复用可以使用“组合式函数”
// 1.总 2.带宽 3.存储
let mActive: number = 1;
let modelList: Array<any> = [
	{ label: "月总哈哈", value: 1 },
	{ label: "月带带哈哈", value: 2 },
];
let mData: Array<any> = [];
let dData: Array<any> = [];
let mChart: any = null;
let dChart: any = null;
let showPie: boolean = false;
let showPieDepart: boolean = false;

/**
 * @description: 初始化
 */
const init = () => {
	mActive = 1;
	initMData();
};

/**
 * @description: 初始化车型数据
 */
const initMData = async () => {
	try {
		showPie = true;
		const params = {
			month: props.month,
			costType: mActive,
			queryStatisticalType: 1,
		};
		// const res = await xxxxxxx(params);
		const res = {
			code: "000000",
			data: [
			{
				name: "网络不可用",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "异常断网",
						value: 1,
					},
					{
						name: "无线网络异常",
						value: 0,
					},
				],
			},
			{
				name: "登录异常",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "频繁登陆登出",
						value: 2,
					},
					{
						name: "长期未登陆",
						value:3,
					},
				],
			},
			{
				name: "Tttt不休眠",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "Tttt不休眠",
						value: 1,
					},
				],
			},
			{
				name: "Ccc通讯异常",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "Ccc通讯异常",
						value: 1,
					},
				],
			},
			{
				name: "短信唤醒",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "唤醒失败",
						value: 1,
					},
					{
						name: "响应未登陆",
						value: 1,
					},
					{
						name: "发送失败",
						value: 1,
					},
				],
			},
			{
				name: "远控故障",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "车况无法执行",
						value: 1,
					},
					{
						name: "远控指令受限",
						value: 1,
					},
					{
						name: "正在执行上一条指令",
						value: 1,
					},
					{
						name: "目标ECU执行失败",
						value: 1,
					},
					{
						name: "无效/不支持的指令",
						value: 1,
					},
				],
			},
			{
				name: "短信发送",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "短信数量超标",
						value: 1,
					},
				],
			},
			{
				name: "网络制式",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "网络制式异常",
						value: 1,
					},
				],
			},
			{
				name: "AAA状态",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "AAA状态异常",
						value: 1,
					},
				],
			},
			{
				name: "信号质量指数SQI",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "信号质量指数异常",
					},
				],
			},
			{
				name: "信号强度警控QQQ",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "强度强度异常",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-备用电池",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "电池寿命报警",
						value: 1,
					},
					{
						name: "备用电池低电压报警",
						value: 1,
					},
					{
						name: "备用电池充电状态异常",
						value: 1,
					},
					{
						name: "备用电池故障",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-蓄电池",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "蓄电池过压告警",
						value: 1,
					},
					{
						name: "蓄电池欠压告警",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-网络-移动网络",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "移动网络差",
						value: 1,
					},
					{
						name: "移动天线故障",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-网络-CCC网络",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "CCC收发器异常",
						value: 1,
					},

					{
						name: "CCC总总关闭故障",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-网络-以太网",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "以太网异常",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-系统报警",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "文件访问异常",
						value: 1,
					},
					{
						name: "存储异常",
						value: 1,
					},
					{
						name: "时间同步异常",
						value: 1,
					},
					{
						name: "MCU心跳异常",
						value: 1,
					},
					{
						name: "LLLL异常",
						value: 1,
					},
					{
						name: "SSSSSSSS异常",
						value: 1,
					},
					{
						name: "升级失败",
						value: 1,
					},
					{
						name: "唤醒异常",
						value: 1,
					},
					{
						name: "不休眠",
						value: 1,
					},
					{
						name: "异常唤醒",
						value: 1,
					},
					{
						name: "异常重启",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-安全报警",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "PPP证书异常",
						value: 1,
					},
					{
						name: "SESESEO异常",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-定位报警",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "RRR异常",
						value: 1,
					},
					{
						name: "GGG异常",
						value: 1,
					},
				],
			},
			{
				name: "主动警控-CCCCC",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "CCCCC异常",
					},
				],
			},
			{
				name: "主动警控-监控监控",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "业务异常",
						value: 1,
					},
				],
			},
			{
				name: "心里数量警控",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "心跳异常",
						value: 1,
					},
				],
			},
			{
				name: "数量警控1111",
				value: 12,
				percent: "10%",
				children: [
					{
						name: "心跳异常",
						value: 0.3,
					},
				],
			},
		],
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			mData = res.data;
			if (mData && mData.length > 0) {
				nextTick(() => {
					initEchartM();
					initDData(mData[0].children);
				});
			}
		} else {
			console.log("请求失败");
		}
	} catch (error) {
		console.log("捕获失败", error);
	} finally {
		showPie = false;
	}
};

/**
 * @description: 初始化二级数据
 */
const initDData = async (parmas) => {
	try {
		showPieDepart = true;
		dData = parmas;
		if (dData && dData.length > 0) {
			nextTick(() => {
				initEchartD();
			});
		}
	} catch (error) {
		console.log("捕获失败", error);
	} finally {
		showPieDepart = false;
	}
};

/**
 * @description: 饼图1
 */
const initEchartM = async () => {
	const modelDom = document.getElementById("monthMChart");
	mChart = proxy.$echarts.init(modelDom);
	const options = option2 as any;
	options.series[0].data = mData;
	options.title.text = "一级涨涨占比",
	options.title.textStyle.fontSize = 18
	options && mChart.setOption(options);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			mChart.resize();
		}, 500);
	});
	mChart.on("click", (parmas) => {
		initDData(parmas.data.children);
	});
};

/**
 * @description: 饼图2
 */
const initEchartD = async () => {
	const departDom = document.getElementById("monthDChart");
	dChart = proxy.$echarts.init(departDom);
	const options = option2 as any;
	options.series[0].data = dData;
	options.title.text = "二级涨涨占比",
	options.title.textStyle.fontSize = 14
	options.series[0].label = {
		formatter: "{b}: \n {c}  ({d}%)",
		lineHeight: 14,
	},
	options && dChart.setOption(options);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			dChart.resize();
		}, 500);
	});
	proxy.$emit("searchEnd");
};

/**
 * @description: 切换
 */
const changeModel = (item: any) => {
	mActive = item.value;
	initMData();
};

</script>
<style lang="less" scoped>
.month-pie-box {
	width: 100%;
	color: #000000;
	border-bottom: 10px solid #f2f2f2;
	background: #ffffff;

	.month-cost-pie {
		flex: 1;
		height: 427px;
		background: #fff;
		padding: 25px 30px 30px;
		margin-bottom: 20px;

		.title-area {
			h3 {
				height: 32px;
				line-height: 32px;
			}
		}

		.echart-father {
			width: 100%;
			position: relative;
			padding-top: 30px;
			.empty-text {
				text-align: center;
				line-height: 320px;
				color: #666666;
			}
			.echart {
				width: 100%;
				height: 360px;
			}
		}
		@media screen and (max-width: 1320px) {
			.title-area {
				h3 {
					font-size: 15px;
				}
				li {
					font-size: 12px;
				}
			}
		}
		@media screen and (max-width: 1240px) {
			.title-area {
				h3 {
					font-size: 14px;
				}
			}
		}

		@media screen and (max-width: 1199px) {
			.title-area {
				h3 {
					font-size: 16px;
				}
				li {
					font-size: 14px;
				}
			}
		}
	}

	.hover-chart {
		padding-top: 10px;
		max-width: 150px;
	}

	// tabs
	.tabs-box {
		height: 32px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		color: rgba(0, 0, 0, 0.45);
		padding: 4px;

		.tabs-item {
			margin-right: 16px;
			&:first-child {
				padding-left: 16px;
			}
			&:last-child {
				margin-right: 0px;
				padding-right: 16px;
			}
			&.tabs-active {
				border-radius: 4px;
				background: #e8e8e8;
				color: #000000;
				padding: 0 16px;
				line-height: 24px;
			}
		}
	}
}
</style>
