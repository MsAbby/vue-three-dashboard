<template>
	<div class="relative-container">
        <div class="search flex-x-start">
            <div class="right flex-x-end" style="margin-right: 30px;">
                <a-tree-select
                    v-model:value="searchValue"
                    style="width: 248px"
                    :tree-data="treeData"
                    tree-checkable
                    allow-clear
                    :show-checked-strategy="true"
                    placeholder="请选择"
                    tree-node-filter-prop="label"
                />
                <a-button type="primary" class="search-btn">查询</a-button>
            </div>
            <div class="left flex-x-start">
                <div class="left-item item-one flex-x-start">
                    <CheckCircleFilled class="icon-filled"/>
                    铲铲时图
                </div>
                <div class="left-item item-two flex-x-start">
                    <CheckCircleFilled class="icon-filled" />
                    拂拂时图
                </div>
            </div>
        </div>
        <div class="bottom-container flex-x-between">
            <div class="left-container">
                <div id="relativeChart" class="relative-chart"></div>
            </div>
            <div class="right-container">
                <a-card
                    title="看看看看看板"
                    :bordered="false"
                    :headStyle="{borderBottom: '1px solid transparent', minHeight: '20px', padding: '16px 16px 0px', lineHeight: '20px'}"
                    :bodyStyle="{padding: '12px 16px 16px'}"
                    class="card-module"
                >
                    <div class="card-data-box grid-three-start">
                        <div class="data-box flex-y-between-start">
                            <div class="flex-x-start data-box-text">
                                <img src="@/assets/image/product/kopie-green.png" class="data-box-img" />
                                <p class="span-title">长联路数</p>
                            </div>
                            <div class="content flex-x-between">
                                <span class="span-number">3</span>
                                <span class="span-percent">10%</span>
                            </div>
                        </div>
                        <div class="data-box flex-y-between-start">
                            <div class="flex-x-start data-box-text">
                                <img src="@/assets/image/product/kopie-blue.png" class="data-box-img" />
                                <p class="span-title">节电数最大值</p>
                            </div>
                            <div class="content flex-x-between">
                                <span class="span-number">3</span>
                                <span class="span-percent">10%</span>
                            </div>
                        </div>
                        <div class="data-box flex-y-between-start">
                            <div class="flex-x-start data-box-text">
                                <img src="@/assets/image/product/kopie3.png" class="data-box-img" />
                                <p class="span-title">副无总数</p>
                            </div>
                            <div class="content flex-x-between">
                                <span class="span-number">3</span>
                                <span class="span-percent">10%</span>
                            </div>
                        </div>
                        <div class="data-box flex-y-between-start">
                            <div class="flex-x-start data-box-text">
                                <img src="@/assets/image/product/snake.png" class="data-box-img" />
                                <p class="span-title">SDF利用率</p>
                            </div>
                            <div class="content flex-x-between">
                                <span class="span-percent">70%</span>
                            </div>
                        </div>
                        <div class="data-box flex-y-between-start">
                            <div class="flex-x-start data-box-text">
                                <img src="@/assets/image/product/domino.png" class="data-box-img" />
                                <p class="span-title">某某两/某某用户数</p>
                            </div>
                            <div class="content flex-x-between">
                                <span class="span-number">3</span>
                            </div>
                        </div>
                    </div>
                </a-card>
                <a-card
                    title="看看看看节点"
                    :bordered="false"
                    :headStyle="{borderBottom: '1px solid transparent', minHeight: '20px', padding: '16px 16px 0px', lineHeight: '20px'}"
                    :bodyStyle="{padding: '12px 16px 16px'}"
                    class="card-module"
                >
                    <template #extra>
                        <div class="flex-x-end">
                            <p>共计<span>28</span>个</p>
                            <RightOutlined style="margin-left: 12px;" />
                        </div>
                    </template>
                    <div class="table-container">
                        <a-table
                            :pagination="false"
                            :dataSource="couplingList"
                            :columns="productList.columns"
                            :rowClassName="function(record, index) {return 'card-module-table-row'}"
                        />
                    </div>
                </a-card>
                <a-card
                    title="看看列表" 
                    :bordered="false"
                    :headStyle="{borderBottom: '1px solid transparent', minHeight: '20px', padding: '16px 16px 0px', lineHeight: '20px'}"
                    :bodyStyle="{padding: '12px 16px 16px'}"
                    
                    class="card-module"
                >
                    <template #extra>
                        <div class="flex-x-end">
                            <p>共计<span>28</span>个</p>
                            <a-button type="primary" style="margin-left: 12px;" size="small">更多</a-button>
                        </div>
                    </template>
                    <div class="table-container">
                        <a-table
                            :pagination="false"
                            :dataSource="warningList"
                            :columns="productList.columns2"
                            :rowClassName="function(record, index) {return 'card-module-table-row'}"
                        />
                    </div>
                </a-card>
            </div>
        </div>
	</div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick, getCurrentInstance, reactive} from "vue";
import { CheckCircleFilled, RightOutlined } from '@ant-design/icons-vue';
import { productList } from "./index.config";
import { TreeSelect } from 'ant-design-vue';
import axios from "axios";

const { proxy }: any = getCurrentInstance();
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

let searchValue: any = ref([]);

let treeData: any = ref([]);
// 图例列表
let legendList: any = ref([]);

let serviceInfo: any = reactive({});

let couplingList: any = ref([]);

let warningList: any = ref([]);

// 关系图的options
let options = reactive({
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
})

onMounted(() => {
    getChartData()
})

/**
 * @description:获取接口
 */
const getChartData = async () => {
    const res = await axios.get('/api/queryRelativeCharts');
    const result = res.data.response;
    if (result.code === "000000") {
        legendList.value = result.data.categories;
        serviceInfo = result.data.serviceInfo;
        couplingList.value = result.data.couplingList;
        warningList.value = result.data.warningList;
        treeData.value = result.data.searchTree;
        options.series[0].data = result.data.nodes;
        options.series[0].links = result.data.links;
        options.series[0].categories = result.data.categories;
        nextTick(() => {
            initChart();
        })
    }
}

const initChart = () => {
    const chartDom = document.getElementById('relativeChart') as HTMLCanvasElement
    let myChart = proxy.$echarts.init(chartDom);
    options && myChart.setOption(options);
    //随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			myChart.resize();
		}, 500);
	});
}


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
        padding: 16px;
        border-radius: 8px;
        .left {
            .left-item {
                width: 240px;
                // height: 46px;
                height: 40px;
                padding: 12px 20px;
                font-size: 16px;
                border-radius: 6px;
                margin-right: 30px;
                .icon-filled {
                    font-size: 24px;
                    margin-right: 30px;
                }
                &.item-one {
                    background:rgba(42, 130, 228, 0.2);
                    color: rgba(92, 105, 120, 1);
                    .icon-filled {
                        color: rgba(145, 174, 207, 1);
                    }
                }
                &.item-two {
                    background: rgba(255, 141, 26, 0.24);
                    color: rgba(145, 74, 7, 1);
                    .icon-filled {
                        color: rgba(255, 141, 26, 1);
                    }
                }
            }
        }
        .right {
            .search-btn {
                margin-left: 12px;
            }
        }
    }

    .bottom-container {
        margin-top: 16px;
        // width: 100%;
        // height: calc(100% - 96px);
        height: calc(100% - 94px);
        .relative-chart {
            height: 100%;
            background: #ffffff;
            padding: 16px;
            margin-right: 16px;
            border-radius: 10px;
        }

        .right-container {
            height: 100%;
            width: 510px;
            .grid-three-start {
                display: grid;
                /* 这里有三个数据，就说明grid的分布图为3列形式，这里都相等表示均分剩余空间 */
                grid-template-columns: 1fr 1fr 1fr;
                gap: 8px;
            }
            .card-module {
                margin-bottom: 16px;
                &:last-child {
                    margin-bottom: 0;
                }
                .data-box {
                    height: 80px;
                    border-radius: 6px;
                    padding: 16px;
                    div {
                        width: 100%;
                    }
                    .content {
                        padding-left: 20px;
                    }
                    .data-box-img {
                        width: 15px;
                        margin-right: 6px;
                    }
                    .span-title {
                        font-size: 12px;
                    }
                    .span-number {
                        font-size: 24px;
                    }
                    .span-percent {
                        font-size: 20px;
                    }
                    &:first-child {
                        background: rgba(26, 213, 152, 0.2);
                        .span-number {
                            color: rgba(26, 213, 152, 1);
                        }
                    }
                    &:nth-child(2) {
                        background: rgba(0, 144, 255, 0.2);
                        .span-number {
                            color: rgba(0, 144, 255, 1);
                        }
                    }
                    &:nth-child(3) {
                        background: rgba(137, 91, 241, 0.2);
                        .span-number {
                            color: rgba(137, 91, 241, 1);
                        }
                    }
                    &:nth-child(4) {
                        background: rgba(165, 214, 63, 0.2);
                        .span-percent {
                            color: rgba(165, 214, 63, 1);
                        }
                    }
                    &:nth-child(5) {
                        background: rgba(249, 175, 26, 0.2);
                        .span-number {
                            color: rgba(249, 175, 26, 1);
                        }
                    }
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
