<template>
	<div class="month-cost-pie-box">
		<Row :gutter="0">
			<Col :xxl="12" :xl="12" :md="24" :sm="24" :xs="24" style="border-right: 10px solid #F2F2F2">
				<section class="month-cost-pie">
					<article class="h-flex h-flex-between h-align-center title-area">
						<h3>哈哈方面月度数据使用</h3>
						<ul class="h-flex h-flex-between h-align-center tabs-box">
							<li
								v-for="item in modelList"
								:key="item.value"
								:class="[
									'tabs-item',
									modelActive === item.value ? 'tabs-active' : '',
								]"
								@click="changeModel(item)"
							>
								{{ item.label }}
							</li>
						</ul>
					</article>
					<!-- content -->
					<article class="echart-father">
						<a-spin fix v-if="showPie"/>
						<div class="empty-text" v-show="modelData.length === 0">
							暂无数据
						</div>
						<div
							v-show="modelData.length !== 0"
							class="echart"
							id="monthModelCostChart"
							ref="monthModelCostChart"
						></div>
					</article>
					
				</section>
			</Col>
			<Col :xxl="12" :xl="12" :md="24" :sm="24" :xs="24">
				<section class="month-cost-pie">
					<article class="h-flex h-flex-between h-align-center title-area">
						<h3>公司方面月度数据使用</h3>
						<ul class="h-flex h-flex-between h-align-center tabs-box">
							<li
								v-for="item in departmentList"
								:key="item.value"
								:class="[
									'tabs-item',
									departmentActive === item.value ? 'tabs-active' : '',
								]"
								@click="changeDepartment(item)"
							>
								{{ item.label }}
							</li>
						</ul>
					</article>
					<!-- content -->
					<article class="echart-father">
						<a-spin fix v-if="showPieDepart"/>
						<div class="empty-text" v-show="departmentData.length === 0">
							暂无数据
						</div>
						<div
							v-show="departmentData.length !== 0"
							class="echart"
							id="monthDepartmentCostChart"
							ref="monthDepartmentCostChart"
						></div>
					</article>
				</section>
			</Col>
		</Row>
	</div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, nextTick } from "vue";
import { getCommonOptions, deepClone } from "./usePieEChartsOptions";

const { proxy }: any = getCurrentInstance();

// 不使用mixins ，逻辑复用可以使用“组合式函数”
let month: number = 1;
// 1.月总数据 2.月带宽数据 3.月存储数据
let modelActive: number = 1;
// 1.月总数据 2.月带宽数据 3.月存储数据
let departmentActive: number = 1;
let modelList: Array<any> = [
	{ label: "月总数据", value: 1 },
	{ label: "月带宽数据", value: 2 },
	{ label: "月存储数据", value: 3 },
];
let departmentList: Array<any> = [
	{ label: "月总数据", value: 1 },
	{ label: "月带宽数据", value: 2 },
	{ label: "月存储数据", value: 3 },
];
let modelData: Array<any> = [];
let departmentData:  Array<any> = [];
let modelChart: any = null;
let departmentChart: any = null;
let showPie: boolean = false;
let showPieDepart: boolean = false;

/**
 * @description: 初始化
 */		
const init = (month) => {
	month = month;
	modelActive = 1;
	departmentActive = 1;
	initModelData();
	initDepartmentData();
}
	
/**
 * @description: 初始化车型数据
 */		
const initModelData = async () => {
	try {
		showPie = true;
		const params = {
			month: month,
			costType: modelActive,
			queryStatisticalType: 1,
		};
		// const res = await xxxxxxx(params);
		const res = {
			code: "000000",
			data: [],
		}
		if (res.code === "000000") {
			modelData = res.data;
			if (modelData && modelData.length > 0) {
				nextTick(() => {
					initEchartModel();
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
}

/**
 * @description: 初始化部门数据
 */		
const initDepartmentData = async () => {
	try {
		showPieDepart = true;
		const params = {
			month: month,
			costType: departmentActive,
			queryStatisticalType: 2,
		};
		// const res = await getCostPieChart(params);
		const res = {
			code: "000000",
			data: [],
		}
		if (res.code === "000000") {
			departmentData = res.data;
			if (departmentData && departmentData.length > 0) {
				nextTick(() => {
					initEchartDepartment();
				});
			}
		} else {
			console.log("请求失败")
		}
	} catch (error) {
		console.log("捕获失败", error);
	} finally {
		showPieDepart = false;
	}
}

/**
 * @description: 车型饼图
 */		
const initEchartModel = async () => {
	const modelDom = document.getElementById("monthModelCostChart");
	modelChart = proxy.$echarts.getInstanceByDom(modelDom);
	if (modelChart) {
		modelChart.dispose();
	}
	modelChart = modelDom && proxy.$echarts.init(modelDom);
	const options = deepClone(getCommonOptions.options);
	// console.log(this.modelData, modelDom, this.modelChart);
	options.series[0].data = modelData;
	options && modelChart.setOption(options);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			modelChart.resize();
		}, 500);
	});
}
		
/**
 * @description: 部门饼图
 */		
 const initEchartDepartment = async () => {
	const departDom = document.getElementById("monthDepartmentCostChart");
	departmentChart = proxy.$echarts.getInstanceByDom(departDom);
	if (departmentChart) {
		departmentChart.dispose();
	}
	departmentChart = departDom && proxy.$echarts.init(departDom);
	const options = deepClone(getCommonOptions.options);
	options.series[0].data = departmentData;
	options && departmentChart.setOption(options);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			departmentChart.resize();
		}, 500);
	});
}

/**
 * @description: 车型饼图切换
 */		
const changeModel = (item: any)  => {
	modelActive = item.value;
	initModelData();
}

/**
 * @description: 部门饼图切换
 */		
const changeDepartment = (item) => {
	departmentActive = item.value;
	initDepartmentData();
}
</script>
<style lang="less" scoped>
.month-cost-pie-box {
	width: 100%;
	color: #000000;
	border-bottom: 10px solid #F2F2F2;

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
}
</style>
