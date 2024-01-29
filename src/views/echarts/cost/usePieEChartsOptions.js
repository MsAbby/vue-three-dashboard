// 组合式函数
// 按照惯例，组合式函数名以“use”开头
import { getCurrentInstance, nextTick } from "vue";
export default function usePieEChartsOptions() {
	let currentDetail = [];
	const { proxy } = getCurrentInstance();
	const setTooltipEchart = async (deptId) => {
		await nextTick();
		let dom = "";
		// echarts.getInstanceByDom获取之前可能创建过的实例，如果有则继续使用这个实例，否则创建
		if (deptId) {
			dom = document.getElementById("tooltipChartDepartment");
		} else {
			dom = document.getElementById("tooltipChartModel");
		}
		if (dom) {
			let tooltipEchart = proxy.$echarts.getInstanceByDom(dom);
			if (tooltipEchart) {
				// 在初始化图表之前销毁之前的实例
				tooltipEchart.dispose();
			}
			tooltipEchart = proxy.$echarts.init(dom);
			const options = getCommonOptions().option;
			console.log("+++", currentDetail)
			options.series[0].data = currentDetail;
			options.tooltip = {
				show: true,
				formatter: "{b0}: {c0}元 ({d}%)",
			};
			tooltipEchart.clear();
			options && tooltipEchart.setOption(options);
			// 随着屏幕大小调节图表
			window.addEventListener("resize", () => {
				tooltipEchart.resize();
			});
		}
	};
	const getCommonOptions = () => {
		return {
			option: {
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
					position: function (point, params, dom, rect, size) {
						// 屏幕宽度
						const bodyWidth = window.innerWidth - 258;
						// 详情框大小
						const boxWidth = size.contentSize[0] + 20;
						// 整个屏幕的居中位置
						const bodyWidthPosition = bodyWidth / 2 - boxWidth / 2 - 20;
						// 坐标位置
						let x = 0;
						if (!params.data.deptId) {
							x = bodyWidthPosition;
						} else {
							// 向左平移: 二分之一屏幕宽度 + margin
							x = bodyWidthPosition - (bodyWidth / 2 + 10);
						}

						if (window.innerWidth < 1200) {
							x = bodyWidthPosition;
						}

						return [x, "-135%"];
					},
					formatter: (params, ticket, callback) => {
						currentDetail = [];
						let request = {};
						const txt = params.data.deptId ? "车型" : "部门";
						let htmlStr = `
						<div class="chart-tooltip-modal">
							<div class="modal-title">
								<h3 class="title">${params.name}使用成本占比</h3>
							</div>
							<div class="h-flex h-flex-between modal-body">
								<div style="flex: 1">
									<h3 class="sub-title">${txt}使用成本占比</h3>
									<div class="modal-body-pie"></div>
								</div>
								<div class="rank-list">
									<h3 class="sub-title">${txt}使用成本排名</h3>
								</div>
							</div>
						</div>`;

						if (params.data.deptId) {
							request = {
								// month: this.month,
								// costType: this.departmentActive,
								jumpParam: params.data.deptId,
								jumpTo: 2,
							};
						} else {
							request = {
								// month: this.month,
								// costType: this.modelActive,
								jumpParam: params.data.name,
								jumpTo: 1,
							};
						}
						// xxxxxxx(request).then((res) => {
						const res = {
							"code": "000000",
							"data": [
								{
									"deptId": null,
									"level": "leaf",
									"name": "部门B",
									"sort": 1,
									"value": "8.64"
								},
								{
									"deptId": null,
									"level": "leaf",
									"name": "部门A",
									"sort": 2,
									"value": "8.58"
								}
							],
							"description": "SUCCESS"
						}
						if (res.code === "000000") {
							currentDetail = res.data || [];
							if (!currentDetail) return "";
							let rankStr = "";
							let color = "";
							const len =
								currentDetail.length > 7 ? 7 : currentDetail.length;
							for (var i = 0; i < len; i++) {
								if (i === 0) {
									color = "#3A78F2";
								} else if (i === 1) {
									color = "#FF953D";
								} else if (i === 2) {
									color = "#FFCC58";
								} else {
									color = "#BFBFBF";
								}
								const item = `
								<div class="h-flex h-flex-between h-flex-center rank-item">
									<p class="h-flex h-flex-start rank-name">
										<span class="rank-logo" style="background-color: ${color}">${i + 1}</span>
										<span class="name">${currentDetail[i].name}</span>
									</p>
									<p class="rank-value">${currentDetail[i].value}元</p>
								</div>`;
								rankStr += item;
							}
							if (params.data.deptId) {
								htmlStr = `
							<div class="chart-tooltip-modal">
								<div class="modal-title">
									<h3 class="title">${params.name}哈哈成本${params.value}元，占比${params.percent}%</h3>
								</div>
								<div class="h-flex h-flex-between modal-body">
									<div style="flex: 1">
										<h3 class="sub-title">哈哈哈哈哈哈哈哈哈哈哈哈</h3>
										<div id="tooltipChartDepartment" ref="tooltipChartRef" class="modal-body-pie"></div>
									</div>
									<div class="rank-list">
										<h3 class="sub-title">哈哈哈哈哈哈哈哈哈哈哈哈</h3>
										${rankStr}
									</div>
								</div>
							</div>`;
							} else {
								htmlStr = `
							<div class="chart-tooltip-modal">
								<div class="modal-title">
									<h3 class="title">${params.name}使用成本${params.value}元，占比${params.percent}%</h3>
								</div>
								<div class="h-flex h-flex-between modal-body">
									<div style="flex: 1">
										<h3 class="sub-title">本车型下部门使用成本占比</h3>
										<div id="tooltipChartModel" ref="tooltipChartRef" class="modal-body-pie"></div>
									</div>
									<div class="rank-list">
										<h3 class="sub-title">本车型下部门使用成本排名</h3>
										${rankStr}
									</div>
								</div>
							</div>`;
							}
							callback(setTooltipEchart(params.data.deptId));
							callback(ticket, htmlStr);
						}
						// });
						return htmlStr;
					},
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
							formatter: "{b}: {d}%",
							lineHeight: 14,
							rich: {
								value: {
									fontSize: 14,
									color: "#333",
									fontWeight: "bold",
									padding: [0, 0, 0, 0],
								},
								name: {
									fontSize: 14,
									color: "#333",
									padding: [8, 0, 0, 0],
								},
							},
						},
						// 引导线
						labelLine: {
							// 指导线长度1
							length: 20,
							// 指导线长度2
							length2: 40,
							minSurfaceAngle: 90,
							lineStyle: {
								// 指导线颜色
								color: "#CECECE",
							},
						},
						// 饼图中间显示配置/ hover 文字放大
						emphasis: {
							label: {
								show: true,
								fontSize: "14",
								fontWeight: "bold",
								formatter: "{b}\n（{d}%）",
							},
						},
					},
				],
			},
		};
	};
	// 深拷贝
	const deepClone = (obj) => {
		if (obj instanceof Array) {
			return obj.map((item) => deepClone(item));
		} else if (obj instanceof Function) {
			return obj;
		} else if (obj instanceof Object) {
			let temp = {};
			let keys = Object.keys(obj);
			let values = Object.values(obj);
			keys.forEach((item, index) => {
				temp[item] = deepClone(values[index]);
			});
			return temp;
		} else {
			return obj;
		}
	}

	// Expose the function or data you want to use in the component
	return {
		getCommonOptions,
		deepClone
	};
}
