<template>
	<div class="echarts-demo-one">
		<a-form :model="formState">
			<a-form-item label="时间粒度">
				<a-select v-model:value="formState.time" style="width: 120px">
					<a-select-option value="day">日</a-select-option>
					<a-select-option value="week">周</a-select-option>
					<a-select-option value="month">月</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="报警时间">
				<a-range-picker
					v-model:value="formState.warnDate"
					:show-time="{ format: 'HH:mm:ss' }"
					format="YYYY-MM-DD HH:mm:ss"
					:placeholder="['开始时间', '结束时间']"
				/>
			</a-form-item>
			<a-form-item label="销售时间">
				<a-range-picker
					v-model:value="formState.saleDate"
					:show-time="{ format: 'HH:mm:ss' }"
					format="YYYY-MM-DD HH:mm:ss"
					:placeholder="['开始时间', '结束时间']"
				/>
			</a-form-item>
			<a-form-item label="处理状态">
				<a-select v-model:value="formState.status" style="width: 120px">
					<a-select-option value="no-handle">未处理</a-select-option>
					<a-select-option value="handel">处理中</a-select-option>
					<a-select-option value="handel-end">已处理</a-select-option>
				</a-select>
			</a-form-item>
		</a-form>
		<div style="padding: 10px 10px 0">
			<button @click="exportpie">导出</button>
		</div>
		<div class="bar-data">
			<div class="bar-echart" id="barEchart" ref="barEchart"></div>
		</div>
		<div class="pie-echart">
			<div class="pie-echart" id="pieEchart" ref="pieEchart"></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { reactive, toRef, ref, onMounted, nextTick, getCurrentInstance } from "vue";

interface FormState {
	time: string;
	status: string;
	warnDate: string;
	saleDate: string;
}

const formState = reactive<FormState>({
	time: "day",
	status: "",
	warnDate: "",
	saleDate: "",
})
const basicData = reactive({
	barEchart: null,
	pieEchart: null,
	spinShowBar: false,
	option: {},
	dataList: [],
	model: "",
})

// 获取echart挂载的DOM节点
const container = ref();

// 获取当前组件实例
const { proxy }: any = getCurrentInstance();

const pieDate = reactive({
	bar: [{
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
			name: "TBOX不休眠",
			itemStyle: {
				color: "#ebb40f",
			},
			children: [
				{
					name: "TBOX不休眠",
					value: 1,
					itemStyle: {
						color: "#ebb40f",
					},
				},
			],
		},
		{
			name: "CAN通讯异常",
			itemStyle: {
				color: "#187a2f",
			},
			children: [
				{
					name: "CAN通讯异常",
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
			name: "APN状态",
			itemStyle: {
				color: "#e65832",
			},
			children: [
				{
					name: "APN状态异常",
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
			name: "信号强度预警CSQ",
			itemStyle: {
				color: "#e65832",
			},
			children: [
				{
					name: "信号强度异常",
					value: 1,
					itemStyle: {
						color: "#e65832",
					},
				},
			],
		},
		{
			name: "主动报警-备用电池",
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
			name: "主动报警-蓄电池",
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
			name: "主动报警-网络-移动网络",
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
			name: "主动报警-网络-CAN网络",
			itemStyle: {
				color: "#ae341f",
			},
			children: [
				{
					name: "CAN收发器异常",
					value: 1,
					itemStyle: {
						color: "#ae341f",
					},
				},

				{
					name: "CAN总线关闭故障",
					value: 1,
					itemStyle: {
						color: "#ae341f",
					},
				},
			],
		},
		{
			name: "主动报警-网络-以太网",
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
			name: "主动报警-系统报警",
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
					name: "LED异常",
					value: 1,
					itemStyle: {
						color: "#d78823",
					},
				},
				{
					name: "SPEAKER异常",
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
			name: "主动报警-安全报警",
			itemStyle: {
				color: "#f89a80",
			},
			children: [
				{
					name: "PKI证书异常",
					value: 1,
					itemStyle: {
						color: "#f89a80",
					},
				},
				{
					name: "Secoc异常",
					value: 1,
					itemStyle: {
						color: "#f89a80",
					},
				},
			],
		},
		{
			name: "主动报警-定位报警",
			itemStyle: {
				color: "#3A78F2",
			},
			children: [
				{
					name: "RTK异常",
					value: 1,
					itemStyle: {
						color: "#3A78F2",
					},
				},
				{
					name: "GNSS异常",
					value: 1,
					itemStyle: {
						color: "#3A78F2",
					},
				},
			],
		},
		{
			name: "主动报警-XCall",
			itemStyle: {
				color: "#FF953D",
			},
			children: [
				{
					name: "XCALL异常",
					itemStyle: {
						color: "#FF953D",
					},
				},
			],
		},
		{
			name: "主动报警-业务监控",
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
			name: "心跳数量预警",
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
			name: "心跳数量预警1111",
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
		}
	]
})

onMounted(() => {
	handelMonthSaleBarData();
})

const handelMonthSaleBarData: () => void = () => {
	nextTick(() => {
		initEcharts();
	})
}

const initEcharts: () => {
	const chartDom = document.getElementById("pieEchart") as any;
	basicData.pieEchart = proxy.$echarts.init(chartDom);
	const option = {
		title: {
			textStyle: {
				fontSize: 14,
				align: "center",
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
		sort: "true",
		series: {
			type: "sunburst",
			data: pieDate.bar,
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
	option && basicData.pieEchart && (basicData.pieEchart as any).setOption(option);
	//随着屏幕大小调节图表
	window.addEventListener("resize", () => {
		setTimeout(() => {
			basicData.pieEchart && (basicData.pieEchart as any).resize();
		}, 500);
	});
}

// 导出单个图表图片
const exportpie = () => {
	var img = new Image();
	const chartDom = document.getElementById("pieEchart");
	const piepieEchart1 =proxy.$echarts.init(chartDom);

	img.src = piepieEchart1.getDataURL({
		type: "png",
		pixelRatio: 1, //放大2倍
		backgroundColor: "#fff",
	});
	img.onload = function () {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext("2d");
		ctx && ctx.drawImage(img, 0, 0);
		var dataURL = canvas.toDataURL("image/png");

		var a = document.createElement("a");
		var event = new MouseEvent("click");
		a.download = "图片.png" || "下载图片名称";
		// 将生成的URL设置为a.href属性
		a.href = dataURL;
		// 触发a的单击事件
		a.dispatchEvent(event);
		a.remove();
	};
}
</script>
<style lang="less" scoped>
.month-real-sale {
	width: 100%;
	height: 1200px;
	background: #fff;
	color: #000000;
	padding: 30px;
	border-bottom: 10px solid #f2f2f2;

	.month-real-sale-box {
		position: relative;
	}

	h3 {
		padding-bottom: 20px;
	}
	.echart {
		width: 100%;
		height: 550px;
	}

	.empty-text {
		text-align: center;
		line-height: 360px;
		color: #666666;
	}
}
</style>
<style>
.ivu-picker-panel-body-wrapper.ivu-picker-panel-with-sidebar
	.ivu-picker-panel-sidebar
	.ivu-picker-panel-shortcut {
	width: 50% !important;
}
</style>
