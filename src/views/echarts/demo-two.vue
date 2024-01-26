<template>
    <div class="tbox-warning-type">
        <!-- 搜索条件 -->
        <SearchForm
            ref="searchFormRef"
            :form-configs="formConfigs"
            @search="handleSearch"
            @reset="handleSearch"
        />
        <!-- 按钮区域 -->
        <div class="btn-area">
            <Button type="primary" @click="handleDownload">批量导出</Button>
        </div>
        <!-- 折线图 -->
        <div>
            <Spin fix v-if="showLineBar"></Spin>
			<div class="empty-text" v-show="yListLineBar.length === 0 && !showLineBar">
				暂无数据
			</div>
            <div v-show="yListLineBar.length !== 0" class="line-echart" id="lineChart"></div>
        </div>
        <!-- 饼状图 -->
        <div>
            <!-- <Spin fix v-if="showPie"></Spin>
			<div class="empty-text" v-show="yListLineBar.length === 0 && !showPie">
				暂无数据
			</div> -->
            <div class="pie-echart" id="pieChart"></div>
        </div>
    </div>
</template>
<script>
import { SearchFormHoc } from "@/components/configComponents";
import { config } from "./index.config";
import { api } from "@/api/equipmentAPI";
import TagGroup from "@/components/common/warnType.vue";
import modelFourCar from "@/components/common/modelFourCar.vue";
import moment from "moment";

const SearchForm = SearchFormHoc({ TagGroup, modelFourCar });

export default {
    data() {
        return {
            // 预警类型一级下拉列表
            warningTypeList: [],
            // 折线图或矩状图loading,
            showLineBar: false,
            // 折线图或矩状图echarts
            firstEchartsDom: null,
            // 折线图或矩状图options
            firstOptions: {},
            // 饼状图echarts
            pieEchartsDom: null,
            // 饼状图loading
            showPie: false,
            // 时间粒度
            defaultTimer: 0,
            // 上表x轴坐标数据
            xListLineBar: [],
            // 上表y轴坐标数据
            yListLineBar: [1],
        };
    },
    computed: {
        // 搜索表
        formConfigs() {
            return config.searchForm({ vm: this });
        },
    },
    components: {
        SearchForm,
    },
    mounted() {
        this.getWarningTypeList();
        this.$nextTick(() => {
            this.handleSearch();
        });
    },
    methods: {
        handleSearch() {
            const condition = this.$refs.searchFormRef.params;
            const a = moment(condition.warningTime[0]).format("YYYY-MM-DD")
            console.log(">>", a)
            // this.showLineBar = true;
            // 1. 如果时间粒度为： 日， 展示折线图，数据赋值，标题修改
            if (this.defaultTimer === 0) {
                this.firstOptions = config.optionLine;
                this.xListLineBar = ["2023-11-11", "2023-11-10", "2023-11-9", "2023-11-8", "2023-11-7", "2023-11-6", "2023-12-30", "2023-12-27"];
                this.yListLineBar = [100, 200, 200, 100, 400, 100, 300, 550];
                this.firstOptions.xAxis.data = this.xListLineBar;
                this.firstOptions.series[0].data = this.yListLineBar;
                this.firstOptions.title.text = "预警上报日趋势图";
                if (this.xListLineBar.length > 8) {
                    this.firstOptions.xAxis.axisLabel.rotate = "90";
                } else {
                    this.firstOptions.xAxis.axisLabel.rotate = "0";
                }
              
            }
            // 2. 如果时间粒度为： 周， 展示矩状图，数据赋值
            else if (this.defaultTimer === 1) {
                this.firstOptions = config.optionBar;
                this.xListLineBar = ["2023第43周", "2023第44周", "2023第45周", "2023第46周", "2023第47周"];
                this.yListLineBar = [100, 200, 200, 100, 400];
                this.firstOptions.xAxis[0].data = this.xListLineBar;
                this.firstOptions.series[0].data = this.yListLineBar;
                this.firstOptions.title.text = "预警上报周趋势图";
            }
            // 3. 如果时间粒度为：月， 展示矩状图，数据赋值
            else {
                this.firstOptions = config.optionBar;
                this.xListLineBar = ["2023年01月", "2023年02月", "2023年03月", "2023年04月", "2023年05月", "2023年06月", "2023年07月", "2023年08月", "2023年09月", "2023年10月", "2023年11月", "2023年12月", "2023年01月"];
                this.yListLineBar = [100, 200, 200, 100, 400, 100, 300, 550, 300, 400, 550, 120, 340];
                this.firstOptions.xAxis[0].data = this.xListLineBar;
                this.firstOptions.series[0].data = this.yListLineBar;
                this.firstOptions.title.text = "预警上报月趋势图";
            }
            const searchParams = this.$refs.searchFormRef.params;
            const searchStr = Object.values(searchParams).join("-");
            localStorage.setItem("SEARCH_RECORD", searchStr);
            this.firstOptions.xAxis.data && this.initCart();
            this.initCart();
        },

        initCart() {
            this.initLineBarChart();
            this.initPieChart();
        },
        initLineBarChart() {
            if (this.firstEchartsDom) {
                this.firstEchartsDom.dispose();
            }
            this.firstEchartsDom = this.$echarts.init(
                document.getElementById("lineChart")
            );
            this.firstEchartsDom.setOption(this.firstOptions);
            window.onresize = function () {
                setTimeout(() => {
                    this.firstEchartsDom.resize();
                })
            };
        },

        initPieChart() {
            this.pieEchartsDom = this.$echarts.init(
                document.getElementById("pieChart")
            );
            this.pieEchartsDom.setOption(config.optionPie);
            window.onresize = function () {
                setTimeout(() => {
                    this.pieEchartsDom.resize();
                })
            };
        },
        handleDownload() {
            const searchParams = this.$refs.searchFormRef.params;
            const currentSearchStr = Object.values(searchParams).join("-");
            const historySearchStr = localStorage.getItem("SEARCH_RECORD");
            if (currentSearchStr !== historySearchStr) {
                this.$Message.warning("请先点击查询");
            } else {
                console.log("1111111111")
            }
        },
        
        getWarningTypeList() {
            api.getWarningType().then((res) => {
                const { data } = res.data;
                this.warningTypeList = [{ id: "ALL", name: "全部" }, ...data] || [];
            });
        },
    },
    beforeDestroy() {
        localStorage.removeItem("SEARCH_RECORD");
        this.firstEchartsDom.dispose();
        this.pieEchartsDom.dispose();
    },
};
</script>
<style scoped lang="less">
.tbox-warning-type {
    .empty-text {
        text-align: center;
        line-height: 300px;
        color: #666666;
    }
    .btn-area {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 16px;
    }
    .line-echart {
        width: 100%;
        height: 380px;
        margin-bottom: 50px;
    }
    .pie-echart {
        width: 100%;
        height: 560px;
    }
}
</style>
