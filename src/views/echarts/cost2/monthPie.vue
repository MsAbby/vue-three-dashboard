<template>
	<div class="month-pie-box">
		<a-row :gutter="0">
			<a-col
				:xxl="12"
				:xl="12"
				:md="24"
				:sm="24"
				:xs="24"
				style="border-right: 10px solid #f2f2f2"
			>
				<section class="month-cost-pie">
					<article class="flex-x-between title-area">
						<h3>哈哈方面月度数据使用</h3>
						<ul class="flex-x-between tabs-box">
							<li
								v-for="item in modelList"
								:key="item.value"
								:class="[
									'tabs-item',
									mActive === item.value ? 'tabs-active' : '',
								]"
								@click="changeModel(item)"
							>
								{{ item.label }}
							</li>
						</ul>
					</article>
					<!-- content -->
					<article class="echart-father">
						<a-spin fix v-if="showPie" />
						<!-- <div class="empty-text" v-show="mData.length === 0">
							暂无数据
						</div>
						<div v-show="mData.length !== 0" style="width: 100%;"> -->
							<div
								class="echart"
								id="monthMChart"
								ref="monthMChart"
							></div>
						<!-- </div> -->
					</article>
				</section>
			</a-col>
			<a-col :xxl="12" :xl="12" :md="24" :sm="24" :xs="24">
				<section class="month-cost-pie">
					<article class="flex-x-between title-area">
						<h3>嘟嘟方面月度数据使用</h3>
						<ul class="flex-x-between tabs-box">
							<li
								v-for="item in departmentList"
								:key="item.value"
								:class="[
									'tabs-item',
									dActive === item.value ? 'tabs-active' : '',
								]"
								@click="changeDepartment(item)"
							>
								{{ item.label }}
							</li>
						</ul>
					</article>
					<!-- content -->
					<article class="echart-father">
						<a-spin fix v-if="showPieDepart" />
						<!-- <div class="empty-text" v-show="dData.length === 0">
							暂无数据
						</div>
						<div v-show="dData.length !== 0" style="width: 100%;"> -->
							<div
								class="echart"
								id="monthDChart"
								ref="monthDChart"
							></div>
						<!-- </div> -->
					</article>
				</section>
			</a-col>
		</a-row>
	</div>
</template>
<script lang="ts" setup name="monthPieSecond">
import { getCurrentInstance, nextTick, watch, Ref, ref } from "vue";
import usePieEChartsOptions from "./usePieEChartsOptions";

const { proxy }: any = getCurrentInstance();
const usePieECharts = usePieEChartsOptions();

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

// 不使用mixins ，逻辑复用可以使用“组合式函数”
// 1.总 2.带宽 3.存储
let mActive: number = 1;
// 1.总 2.带宽 3.存储
let dActive: number = 1;
let modelList: Array<any> = [
	{ label: "月总哈哈", value: 1 },
	{ label: "月带带哈哈", value: 2 },
	{ label: "月存存哈哈", value: 3 },
];
let departmentList: Array<any> = [
	{ label: "月总哈哈", value: 1 },
	{ label: "月带带哈哈", value: 2 },
	{ label: "月存存哈哈", value: 3 },
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
	dActive = 1;
	initMData();
	initDData();
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
					deptId: null,
					level: "root",
					name: "哈哈哈哈哈26",
					sort: 1,
					value: "6.30",
				},
			],
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			mData = res.data;
			if (mData && mData.length > 0) {
				nextTick(() => {
					initEchartM();
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
 * @description: 初始化部门数据
 */
const initDData = async () => {
	try {
		showPieDepart = true;
		const params = {
			month: props.month,
			costType: dActive,
			queryStatisticalType: 2,
		};
		// const res = await xxxxx(params);
		const res = {
			code: "000000",
			data: [
				{
					deptId: "43",
					level: "root",
					name: "部门B",
					sort: 1,
					value: "8.64",
				},
				{
					deptId: "42",
					level: "root",
					name: "部门A",
					sort: 2,
					value: "8.58",
				},
			],
			description: "SUCCESS",
		};
		if (res.code === "000000") {
			dData = res.data;
			if (dData && dData.length > 0) {
				nextTick(() => {
					initEchartD();
				});
			}
		} else {
			console.log("请求失败");
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
	const options = usePieECharts.getCommonOptions().option;
	options.series[0].data = mData;
	options && mChart.setOption(options);
	console.log("000000", mChart);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			mChart.resize();
		}, 500);
	});
};

/**
 * @description: 饼图2
 */
const initEchartD = async () => {
	const departDom = document.getElementById("monthDChart");
	dChart = proxy.$echarts.init(departDom);
	const options = usePieECharts.getCommonOptions().option;
	options.series[0].data = dData;
	options && dChart.setOption(options);
	console.log("99999", dChart);
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

/**
 * @description: 切换
 */
const changeDepartment = (item) => {
	dActive = item.value;
	initDData();
};
</script>
<style lang="less" scoped>
.month-pie-box {
	width: 100%;
	color: #000000;
	border-bottom: 10px solid #f2f2f2;

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
				line-height: 300px;
				color: #666666;
			}
			.echart {
				width: 100%;
				height: 300px;
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
