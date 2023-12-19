<template>
	<div>
		<a-form :model="formState">
			<a-form-item label="时间粒度">
				<a-select
					v-model:value="formState.time"
					show-search
					mode="tags"
					style="width: 400px"
					placeholder="Tags Mode"
					:options="options"
				>
				</a-select>
			</a-form-item>
			<a-form-item label="警告时间">
				<a-range-picker
					style="width: 400px"
					v-model:value="formState.warnDate"
					format="YYYY-MM-DD HH:mm:ss"
				/>
			</a-form-item>
			<a-form-item label="销售时间">
				<a-range-picker
					style="width: 400px"
					v-model:value="formState.saleDate"
					format="YYYY-MM-DD HH:mm:ss"
				/>
			</a-form-item>
		</a-form>
		<div id="myChart" :style="{ width: '1000px', height: '500px' }"></div>
		<div class="month-real-sale-box">
			<div class="echart" id="pieCharts" :style="{ width: '1000px', height: '500px' }"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, getCurrentInstance, nextTick, ref, reactive } from "vue";
const { proxy }: any = getCurrentInstance();

interface FormState {
	time: string
	warnDate: Array<string>,
	saleDate: Array<string>,
}

interface SelectTypes {
	value: string,
	label: string
}

// line echarts
const lineEcharts = ref<any>(null);
// pie echarts
const pieEcharts = ref<any>(null);

// select
const options = ref<Array<SelectTypes>>([
	{ value: 'day', label: '日' },
	{ value: 'week', label: '周' },
	{ value: 'month', label: '月' },
]);

// line option
const optionLine = {
	title: {
		text: "Stacked Line",
	},
	tooltip: {
		trigger: "axis",
	},
	legend: {
		data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
	},
	grid: {
		left: "3%",
		right: "4%",
		bottom: "3%",
		containLabel: true,
	},
	toolbox: {
		feature: {
			saveAsImage: {},
		},
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	},
	yAxis: {
		type: "value",
	},
	series: [
		{
			name: "Email",
			type: "line",
			stack: "Total",
			data: [120, 132, 101, 134, 90, 230, 210],
		},
		{
			name: "Union Ads",
			type: "line",
			stack: "Total",
			data: [220, 182, 191, 234, 290, 330, 310],
		},
		{
			name: "Video Ads",
			type: "line",
			stack: "Total",
			data: [150, 232, 201, 154, 190, 330, 410],
		},
		{
			name: "Direct",
			type: "line",
			stack: "Total",
			data: [320, 332, 301, 334, 390, 330, 320],
		},
		{
			name: "Search Engine",
			type: "line",
			stack: "Total",
			data: [820, 932, 901, 934, 1290, 1330, 1320],
		},
	],
};

const formState:FormState = reactive({
	time: "day",
	warnDate: [],
	saleDate: []
})

// pie option
const optionPie = {
	title: {
		textStyle: {
			fontSize: 14,
			align: "center",
		},
	},
	toolbox: {
		feature: {
			saveAsImage: {},
		},
	},
	tooltip: {
		formatter: (params, ticket, callback) => {
			return `<div>
				<p>类型： ${params.name}</p>
				<p>数量： ${params.value}</p>
				<p>占比： ${params.percent}</p>
				</div>`;
		},
	},

	legend: {
		show: true,
		right: 20,
	},
	// 图示空白间距
	grid: {
		top: "10",
		left: "0",
		right: "20",
		bottom: "20%",
		containLabel: true,
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
		data: [
			{
				name: "网络不可用",
				itemStyle: {
					color: "#da0d68",
				},
				children: [
					{
						name: "异常断网",
						value: 1,
						itemStyle: {
							color: "#da0d68",
						},
					},
					{
						name: "无线网络异常",
						value: 0,
						itemStyle: {
							color: "#da0d68",
						},
					},
				],
			},
			{
				name: "登录异常",
				itemStyle: {
					color: "#da1d23",
				},
				children: [
					{
						name: "频繁登陆登出",
						value: 0.4,
						itemStyle: {
							color: "#da1d23",
						},
					},
					{
						name: "长期未登陆",
						value: 0.5,
						itemStyle: {
							color: "#da1d23",
						},
					},
				],
			},
			{
				name: "Tttt不休眠",
				itemStyle: {
					color: "#ebb40f",
				},
				children: [
					{
						name: "Tttt不休眠",
						value: 1,
						itemStyle: {
							color: "#ebb40f",
						},
					},
				],
			},
			{
				name: "Ccc通讯异常",
				itemStyle: {
					color: "#187a2f",
				},
				children: [
					{
						name: "Ccc通讯异常",
						value: 1,
						itemStyle: {
							color: "#187a2f",
						},
					},
				],
			},
			{
				name: "短信唤醒",
				itemStyle: {
					color: "#0aa3b5",
				},
				children: [
					{
						name: "唤醒失败",
						value: 1,
						itemStyle: {
							color: "#0aa3b5",
						},
					},
					{
						name: "响应未登陆",
						value: 1,
						itemStyle: {
							color: "#0aa3b5",
						},
					},
					{
						name: "发送失败",
						value: 1,
						itemStyle: {
							color: "#0aa3b5",
						},
					},
				],
			},
			{
				name: "远控故障",
				itemStyle: {
					color: "#c94930",
				},
				children: [
					{
						name: "车况无法执行",
						value: 1,
						itemStyle: {
							color: "#c94930",
						},
					},
					{
						name: "远控指令受限",
						value: 1,
						itemStyle: {
							color: "#c94930",
						},
					},
					{
						name: "正在执行上一条指令",
						value: 1,
						itemStyle: {
							color: "#c94930",
						},
					},
					{
						name: "目标ECU执行失败",
						value: 1,
						itemStyle: {
							color: "#c94930",
						},
					},
					{
						name: "无效/不支持的指令",
						value: 1,
						itemStyle: {
							color: "#c94930",
						},
					},
				],
			},
			{
				name: "短信发送",
				itemStyle: {
					color: "#ad213e",
				},
				children: [
					{
						name: "短信数量超标",
						value: 1,
						itemStyle: {
							color: "#ad213e",
						},
					},
				],
			},
			{
				name: "网络制式",
				itemStyle: {
					color: "#a87b64",
				},
				children: [
					{
						name: "网络制式异常",
						value: 1,
						itemStyle: {
							color: "#a87b64",
						},
					},
				],
			},
			{
				name: "AAA状态",
				itemStyle: {
					color: "#e65832",
				},
				children: [
					{
						name: "AAA状态异常",
						value: 1,
						itemStyle: {
							color: "#e65832",
						},
					},
				],
			},
			{
				name: "信号质量指数SQI",
				itemStyle: {
					color: "#e65832",
				},
				children: [
					{
						name: "信号质量指数异常",
						itemStyle: {
							color: "#e65832",
						},
					},
				],
			},
			{
				name: "信号强度警控QQQ",
				itemStyle: {
					color: "#e65832",
				},
				children: [
					{
						name: "强度强度异常",
						value: 1,
						itemStyle: {
							color: "#e65832",
						},
					},
				],
			},
			{
				name: "主动警控-备用电池",
				itemStyle: {
					color: "#555832",
				},
				children: [
					{
						name: "电池寿命报警",
						value: 1,
						itemStyle: {
							color: "#555832",
						},
					},
					{
						name: "备用电池低电压报警",
						value: 1,
						itemStyle: {
							color: "#555832",
						},
					},
					{
						name: "备用电池充电状态异常",
						value: 1,
						itemStyle: {
							color: "#555832",
						},
					},
					{
						name: "备用电池故障",
						value: 1,
						itemStyle: {
							color: "#555832",
						},
					},
				],
			},
			{
				name: "主动警控-蓄电池",
				itemStyle: {
					color: "#e65832",
				},
				children: [
					{
						name: "蓄电池过压告警",
						value: 1,
						itemStyle: {
							color: "#e65832",
						},
					},
					{
						name: "蓄电池欠压告警",
						value: 1,
						itemStyle: {
							color: "#e65832",
						},
					},
				],
			},
			{
				name: "主动警控-网络-移动网络",
				itemStyle: {
					color: "#f37674",
				},
				children: [
					{
						name: "移动网络差",
						value: 1,
						itemStyle: {
							color: "#f37674",
						},
					},
					{
						name: "移动天线故障",
						value: 1,
						itemStyle: {
							color: "#f37674",
						},
					},
				],
			},
			{
				name: "主动警控-网络-CCC网络",
				itemStyle: {
					color: "#ae341f",
				},
				children: [
					{
						name: "CCC收发器异常",
						value: 1,
						itemStyle: {
							color: "#ae341f",
						},
					},

					{
						name: "CCC总总关闭故障",
						value: 1,
						itemStyle: {
							color: "#ae341f",
						},
					},
				],
			},
			{
				name: "主动警控-网络-以太网",
				itemStyle: {
					color: "#d45a59",
				},
				children: [
					{
						name: "以太网异常",
						value: 1,
						itemStyle: {
							color: "#d45a59",
						},
					},
				],
			},
			{
				name: "主动警控-系统报警",
				itemStyle: {
					color: "#d78823",
				},
				children: [
					{
						name: "文件访问异常",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "存储异常",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "时间同步异常",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "MCU心跳异常",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "LLLL异常",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "SSSSSSSS异常",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "升级失败",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "唤醒异常",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "不休眠",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "异常唤醒",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
					{
						name: "异常重启",
						value: 1,
						itemStyle: {
							color: "#d78823",
						},
					},
				],
			},
			{
				name: "主动警控-安全报警",
				itemStyle: {
					color: "#f89a80",
				},
				children: [
					{
						name: "PPP证书异常",
						value: 1,
						itemStyle: {
							color: "#f89a80",
						},
					},
					{
						name: "SESESEO异常",
						value: 1,
						itemStyle: {
							color: "#f89a80",
						},
					},
				],
			},
			{
				name: "主动警控-定位报警",
				itemStyle: {
					color: "#3A78F2",
				},
				children: [
					{
						name: "RRR异常",
						value: 1,
						itemStyle: {
							color: "#3A78F2",
						},
					},
					{
						name: "GGG异常",
						value: 1,
						itemStyle: {
							color: "#3A78F2",
						},
					},
				],
			},
			{
				name: "主动警控-CCCCC",
				itemStyle: {
					color: "#FF953D",
				},
				children: [
					{
						name: "CCCCC异常",
						itemStyle: {
							color: "#FF953D",
						},
					},
				],
			},
			{
				name: "主动警控-监控监控",
				itemStyle: {
					color: "#76B0E7",
				},
				children: [
					{
						name: "业务异常",
						value: 1,
						itemStyle: {
							color: "#76B0E7",
						},
					},
				],
			},
			{
				name: "心里数量警控",
				itemStyle: {
					color: "#3AA155",
				},
				children: [
					{
						name: "心跳异常",
						value: 1,
						itemStyle: {
							color: "#3AA155",
						},
					},
				],
			},
			{
				name: "数量警控1111",
				itemStyle: {
					color: "#3AA155",
				},
				children: [
					{
						name: "心跳异常",
						value: 0.3,
						itemStyle: {
							color: "#3AA155",
						},
					},
				],
			},
		],
		radius: [0, "95%"],
		sort: undefined,
		emphasis: {
			focus: "ancestor",
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
					// shadowColor: "rgba(0, 0, 0, .2)",
					// shadowOffsetY: 3,
					// shadowBlur: 3
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
};



onMounted(() => {
	nextTick(() => {
		initLineChart();
		initPieChart();
	});
});

const initLineChart = () => {
	//初始化挂载
	lineEcharts.value = proxy.$echarts.init(document.getElementById("myChart"));
	//添加配置
	lineEcharts.value.setOption(optionLine);
	// 自适应
	window.onresize = function () {
		lineEcharts.value.resize();
	};
};

const initPieChart = () => {
	//初始化挂载
	pieEcharts.value = proxy.$echarts.init(document.getElementById("pieCharts"));
	//添加配置
	pieEcharts.value.setOption(optionPie);
	// 自适应
	window.onresize = function () {
		pieEcharts.value.resize();
	};
};

// 设置只能选择当前时间以前的时间（不包含今天）
const range = (start: any, end: any) => {
    const result: any = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}
</script>
