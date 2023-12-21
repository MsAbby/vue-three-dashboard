import { FormConfigBuilder } from "@/components/configComponents";
import moment from "moment";
// 标题样式
const title = {
    text: "预警上报趋势图",
    textStyle: {
        fontSize: 14,
    },
    padding: [5, 10],
};

// 图形间距
const grid = {
    left: "3%",
    right: "3%",
    bottom: "3%",
    containLabel: true,
};

// 支持图片下载
const toolbox = {
    feature: {
        saveAsImage: {},
    },
};

// 中间区域，水平线条是"虚线"
const splitLine = {
    lineStyle: {
        type: "dashed",
        color: ["#F2F2F2 "],
    },
    show: true,
};

// xy坐标轴线
const axisLineXY = {
    show: true,
    lineStyle: {
        color: "#DEDEDE ",
    },
};

// xy坐标轴文字
const axisLabelXY = {
    // 文字颜色
    color: "#666666",
    // 文字大小
    fontSize: 12,
};

const data = [
    {
        name: "网络不可用",
        children: [
            {
                name: "异常断网",
                value: 77,
            },
            {
                name: "无线网络异常",
                value: 77,
            },
        ],
    },
    {
        name: "登录异常",
        children: [
            {
                name: "频繁登陆登出",
                value: 66,
            },
            {
                name: "长期未登陆",
                value: 66,
            },
        ],
    },
    {
        name: "Tttt不休眠",
        children: [
            {
                name: "Tttt不休眠",
                value: 88,
            },
        ],
    },
    {
        name: "Ccc通讯异常",
        children: [
            {
                name: "Ccc通讯异常",
                value: 84,
            },
        ],
    },
    {
        name: "短信唤醒",
        children: [
            {
                name: "唤醒失败",
                value: 35,
            },
            {
                name: "响应未登陆",
                value: 25,
            },
            {
                name: "发送失败",
                value: 15,
            },
        ],
    },
    {
        name: "远控故障",
        children: [
            {
                name: "车况无法执行",
                value: 20,
            },
            {
                name: "远控指令受限",
                value: 10,
            },
            {
                name: "正在执行上一条指令",
                value: 10,
            },
            {
                name: "目标ECU执行失败",
                value: 10,
            },
            {
                name: "无效/不支持的指令",
                value: 10,
            },
        ],
    },
    {
        name: "短信发送",
        children: [
            {
                name: "短信数量超标",
                value: 55,
            },
        ],
    },
    {
        name: "网络制式",
        children: [
            {
                name: "网络制式异常",
                value: 52,
            },
        ],
    },
    {
        name: "AAA状态",
        children: [
            {
                name: "AAA状态异常",
                value: 50,
            },
        ],
    },
    {
        name: "信号质量指数SQI",
        children: [
            {
                name: "信号质量指数异常",
                value: 49,
            },
        ],
    },
    {
        name: "信号强度警控QQQ",
        children: [
            {
                name: "强度强度异常",
                value: 47,
            },
        ],
    },
    {
        name: "主动警控-备用电池",
        children: [
            {
                name: "电池寿命报警",
                value: 22,
            },
            {
                name: "备用电池低电压报警",
                value: 10,
            },
            {
                name: "备用电池充电状态异常",
                value: 5,
            },
            {
                name: "备用电池故障",
                value: 8,
            },
        ],
    },
    {
        name: "主动警控-蓄电池",
        children: [
            {
                name: "蓄电池过压告警",
                value: 22,
            },
            {
                name: "蓄电池欠压告警",
                value: 20,
            },
        ],
    },
    {
        name: "主动警控-网络-移动网络",
        children: [
            {
                name: "移动网络差",
                value: 18,
            },
            {
                name: "移动天线故障",
                value: 18,
            },
        ],
    },
    {
        name: "主动警控-网络-CCC网络",
        children: [
            {
                name: "CCC收发器异常",
                value: 16,
            },

            {
                name: "CCC总总关闭故障",
                value: 16,
            },
        ],
    },
    {
        name: "主动警控-网络-34",
        children: [
            {
                name: "dfdf",
                value: 31,
            },
        ],
    },
    {
        name: "主动警控-网络-以太网",
        children: [
            {
                name: "以太网异常",
                value: 30,
            },
        ],
    },
    {
        name: "主动警控-网络-zz",
        children: [
            {
                name: "xxxxxx",
                value: 30,
            },
        ],
    },
    {
        name: "主动警控-系统报警",
        children: [
            {
                name: "文件访问异常",
                value: 2,
            },
            {
                name: "存储异常",
                value: 2,
            },
            {
                name: "时间同步异常",
                value: 2,
            },
            {
                name: "MCU心跳异常",
                value: 5,
            },
            {
                name: "LLLL异常",
                value: 5,
            },
            {
                name: "SSSSSSSS异常",
                value: 5,
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
        children: [
            {
                name: "PPP证书异常",
                value: 12,
            },
            {
                name: "SESESEO异常",
                value: 12,
            },
        ],
    },
    {
        name: "主动警控-定位报警",
        children: [
            {
                name: "RRR异常",
                value: 11,
            },
            {
                name: "GGG异常",
                value: 11,
            },
        ],
    },
    {
        name: "主动警控-CCCCC",
        children: [
            {
                name: "CCCCC异常",
                value: 18,
            },
        ],
    },
    {
        name: "主动警控-监控监控",
        children: [
            {
                name: "业务异常",
                value: 16,
            },
        ],
    },
    {
        name: "心里数量警控",
        children: [
            {
                name: "心跳异常",
                value: 16,
            },
        ],
    },
];
const color = [
    "#810C26",
    "#A90100",
    "#AE341F",
    "#E01415",
    "#da0d68",
    "#9A3169",
    "#EA720D",
    "#C1710C",
    "#37915A",
    "#006836",
    "#555832",
    "#0084A7",
    "#0D86CB",
    "#395CD5",
    "#001D9A",
    "#0F5D85",
    "#591EA1",
    "#323996",
    "#da0d68",
    "#ae341f",
    "#D85812",
    "#9A107F",
    "#0084A7",
    "#0D86CB",
    "#395CD5",
    "#00512B",
    "#197A2E",
    "#7C6700",
    "#244585",
    "#6200B9",
    "#ad213e",
    "#c94930",
    "#187a2f",
    "#591EA1",
    "#0F5D85",
];
data.map((item: any, index) => {
    const obj = {
        color: color[index] || "#BC0E52"
    }
    item.itemStyle = obj;
    return item;
});

export const config = {
    // form
    searchForm: function ({ vm }) {
        return [
            FormConfigBuilder.Select({
                label: "时间粒度",
                key: "timer",
                value: vm.defaultTimer,
                props: {
                    clearable: false
                },
                children: [
                    FormConfigBuilder.Option({
                        label: "日",
                        value: 0,
                    }),
                    FormConfigBuilder.Option({
                        label: "周",
                        value: 1,
                    }),
                    FormConfigBuilder.Option({
                        label: "月",
                        value: 2,
                    }),
                ],
                on: {
                    "on-change": (val) => {
                        vm.$refs.searchFormRef.params.timer = val;
                        vm.defaultTimer = val;
                        // 时间粒度为： 日，默认值：结束时间（含）往前推31天（含） - 当前日期的前一天
                        if (val === 0) {
                            vm.$refs.searchFormRef.params.warningTime = [moment().valueOf() - 86400000 * 31, moment().valueOf() - 86400000];
                        }
                        // 时间粒度为： 周，默认值：结束时间（含）往前推35天（含） - 当前日期的前一天
                        else if (val === 1) {
                            vm.$refs.searchFormRef.params.warningTime = [moment().valueOf() - 86400000 * 35, moment().valueOf() - 86400000];
                        }
                        // 时间粒度为： 月，默认值：结束时间（含）往前推12个月 - 当前日期的前一天
                        else if (val === 2){
                            const startMonth = moment().subtract(11, 'months').startOf('month').format('YYYY-MM-DD');
                            vm.$refs.searchFormRef.params.warningTime = [startMonth, moment().valueOf() - 86400000];
                        } else {
                            vm.$refs.searchFormRef.params.warningTime = [];
                        }
                    }
                }
            }),
            FormConfigBuilder.DatePicker({
                label: "预警时间",
                key: "warningTime",
                value: [moment().valueOf() - 86400000 * 31, moment().valueOf() - 86400000],
                props: {
                    type: "daterange",
                    format: "yyyy-MM-dd",
                    transfer: true,
                    placeholder: "请选择",
                    options: {
                        disabledDate (date) {
                            return date && date.valueOf() > moment().valueOf() - 86400000;
                        }
                    }
                },
                on: {
                    "on-change": (val) => {
                        if (val) {
                            if (!val[0] && !val[1]) return val;
                            const start = moment(val[0]);
                            const end = moment(val[1]);
                            const diffDay = end.diff(start, "day") + 1;
                            const maxDay = 31;
                            const maxWeek = 35;
                            const maxMonth = 366;
                            const defaultTimer = vm.$refs.searchFormRef.params.timer;
                            // 时间粒度为： 日， 最大支持： 31天
                            if (defaultTimer === 0 && diffDay > maxDay) {
                                vm.$Message.error("日期范围最大选择31天");
                                vm.$refs.searchFormRef.params.warningTime = [];
                            }
                            // 时间粒度为： 周， 最大支持： 35天
                            else if (defaultTimer === 1 && diffDay > maxWeek) {
                                vm.$Message.error("日期范围最大选择35天");
                                vm.$refs.searchFormRef.params.warningTime = [];
                            }
                            // 时间粒度为： 月， 最大支持： 366天
                            else if (defaultTimer === 2 && diffDay > maxMonth){
                                vm.$Message.error("日期范围最大选择366天");
                                vm.$refs.searchFormRef.params.warningTime = [];
                            } else {
                                console.log(diffDay)
                            }
                        }
                    },
                },
            }),
            FormConfigBuilder.DatePicker({
                label: "销售时间",
                key: "saleTime",
                value: [moment("1970-01-01").valueOf(), moment().valueOf() - 86400000],
                props: {
                    type: "daterange",
                    format: "yyyy-MM-dd",
                    transfer: true,
                    placeholder: "请选择",
                },
                on: {
                    "on-change": (val) => {
                        if (val) {
                            if (!val[0] && !val[1]) return val;
                        }
                    },
                },
            }),
            FormConfigBuilder.Custom({
                key: "warnType",
                label: "预警类型",
                component: "TagGroup",
                value: vm.warnType,
                props: {
                    closable: true,
                    warningTypes: vm.warningTypeList,
                },
            }),
            FormConfigBuilder.Select({
                label: "处理状态",
                key: "handleStatus",
                value: "all",
                children: [
                    FormConfigBuilder.Option({
                        label: "全部",
                        value: "all",
                    }),
                    FormConfigBuilder.Option({
                        label: "未处理",
                        value: 0,
                    }),
                    FormConfigBuilder.Option({
                        label: "已处理",
                        value: 1,
                    }),
                    FormConfigBuilder.Option({
                        label: "忽略",
                        value: 2,
                    }),
                ],
            }),
            FormConfigBuilder.Custom({
                key: "fourCar",
                label: "车型四码",
                component: "modelFourCar",
                value: vm.fourCar,
                props: {
                    closable: true,
                },
                xxlSpan: 12,
                xlSpan: 16,
                lgSpan: 24,
                mdSpan: 24,
                smSpan: 24,
            }),
            FormConfigBuilder.Select({
                label: "经销商省份",
                key: "projectCode1",
                children: [
                    FormConfigBuilder.Option({
                        label: "湖南",
                        value: "hunan",
                    }),
                    FormConfigBuilder.Option({
                        label: "上海",
                        value: "shanghai",
                    }),
                ],
            }),
            FormConfigBuilder.Select({
                label: "车辆状态",
                key: "vehicle",
                children: [
                    FormConfigBuilder.Option({
                        label: "新建",
                        value: 0,
                    }),
                    FormConfigBuilder.Option({
                        label: "待入库",
                        value: "1",
                    }),
                    FormConfigBuilder.Option({
                        label: "已入库",
                        value: "2",
                    }),
                ],
            }),
            FormConfigBuilder.Select({
                label: "TBOX供应商",
                key: "suppler",
                children: [
                    FormConfigBuilder.Option({
                        label: "xxxx",
                        value: "xxxx",
                    }),
                    FormConfigBuilder.Option({
                        label: "yyyy",
                        value: "yyyy",
                    }),
                    FormConfigBuilder.Option({
                        label: "zzzz",
                        value: "zzzz",
                    }),
                ],
            }),
            FormConfigBuilder.Select({
                label: "行驶总里程",
                key: "licheng",
                children: [
                    FormConfigBuilder.Option({
                        label: "0",
                        value: 0,
                    }),
                    FormConfigBuilder.Option({
                        label: "0-10000",
                        value: "0-10000",
                    }),
                    FormConfigBuilder.Option({
                        label: "10000-20000",
                        value: "10000-20000",
                    }),
                ],
            }),
        ];
    },
    // line option
    optionLine: {
        title: title,
        grid: grid,
        toolbox: toolbox,
        tooltip: {
            trigger: "axis",
            formatter: (params) => {
                const str = `<p>日期： ${params[0].name}</p>
                             <p>数量： ${params[0].value}</p>
                            `;
                return str;
            },
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: [],
            // 坐标轴刻度线
            axisTick: {
                show: true,
            },
            axisLine: axisLineXY,
            axisLabel: axisLabelXY,
        },
        yAxis: {
            type: "value",
            axisLine: axisLineXY,
            axisLabel: axisLabelXY,
            splitLine: splitLine,
        },
        series: [
            {
                name: "Email",
                type: "line",
                stack: "Total",
                data: [],
                itemStyle: {
                    color: "#3A78F2",
                },
            },
        ],
    },
    // bar option
    optionBar: {
        title: title,
        grid: grid,
        toolbox: toolbox,
        tooltip: {
            trigger: "axis",
            formatter: (params) => {
                const str = `<p>日期： ${params[0].name}</p>
                             <p>数量： ${params[0].value}</p>
                            `;
                return str;
            },
        },
        xAxis: [
            {
                type: "category",
                data: [],
                boundaryGap: [20, 20],
                axisTick: {
                    show: false,
                },
                axisLine: axisLineXY,
                axisLabel: axisLabelXY,
            },
        ],
        yAxis: [
            {
                type: "value",
                name: '万',
                nameTextStyle: {
                    color: "#666666"
                },
                axisLine: axisLineXY,
                axisLabel: axisLabelXY,
                splitLine: splitLine,
            },
        ],
        series: [
            {
                name: "Direct",
                type: "bar",
                barWidth: "16",
                background: "#3A78F2",
                data: [],
                itemStyle: {
                    color: "#3A78F2", // 定义柱子颜色
                },
            },
        ],
    },
    // pie option
    optionPie: {
        title: title,
        grid: grid,
        toolbox: toolbox,
        tooltip: {
            formatter: (params) => {
                return `<p>预警类型： ${params.name}</p>
                        <p>数量： ${params.value}</p>
                        <p>占比： ${params.percent}</p>`;
            },
        },
        // visualMap: [{
        // 	type: 'piecewise',
        // 		min: 0,
        // 		max: 28,
        // 		left: 'right',
        // 		top: 'center',
        // 		calculable: true,
        // 		realtime: false,
        // 		splitNumber: 8,
        // 		inRange: {
        // 		color: [
        // 			'#da0d68',
        // 			'#da1d23',
        // 			'#ebb40f',
        // 			'#187a2f',
        // 			'#0aa3b5',
        // 			'#c94930',
        // 			'#ad213e',
        // 		]
        // 	}
        // }],
        sort: "true",
        series: {
            type: "sunburst",
            data: data,
            silent: true,
            radius: [0, "95%"],
            sort: undefined,
            emphasis: {
                focus: "ancestor",
            },
            itemStyle: {
                color: ["#0F5D85", "#d78823", "#d45a59", "#AE341F"],
            },
            levels: [
                {},
                // 最靠内测的第一层
                {
                    r0: "15%",
                    r: "80%",
                    itemStyle: {
                        borderWidth: 1,
                        borderRadius: 2,
                    },
                    label: {
                        // 文字旋转
                        rotate: "radial",
                        // 文字对齐：right:靠外侧，left:靠内侧
                        align: "right",
                        // 当某个扇形块的角度小于该值（角度制）时，扇形块对应的文字不显示。该值用以隐藏过小扇形块中的文字
                        minAngle: 7,
                        fontSize: 11,
                        color: "#ffffff",
                        fontWeight: "500",
                        position: "top",
                        // show: false,
                        formatter: (params) => {
                            return `${params.name} 50.0%`;
                        },
                    },
                },
                {
                    r0: "80%",
                    r: "82%",
                    label: {
                        show: false,
                        align: "right",
                        fontSize: 11,
                        color: "#ffffff",
                        fontWeight: "500",
                        // 当某个扇形块的角度小于该值（角度制）时，扇形块对应的文字不显示。该值用以隐藏过小扇形块中的文字
                        minAngle: 3,
                        position: "outside",
                        formatter: (params) => {
                            return `${params.name} 50%`;
                        },
                        silent: false,
                    },
                    itemStyle: {
                        borderWidth: 3,
                    },
                },
            ],
        },
    },
};

