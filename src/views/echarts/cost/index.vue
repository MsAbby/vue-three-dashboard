<template>
	<div class="cost-report">
		<!-- time -->
		<div class="h-flex h-flex-start h-align-center date-box">
			<p style="color: #000000">时间：</p>
			<a-month-picker
				style="width: 200px"
				v-model:value="dateTime"
				format="YYYY-MM"
				placeholder="请选择月份"
				@change="handleMonthChange"
			/>
			<a-button
				type="primary"
				style="margin-left: 20px"
				@click="handelSearch"
			>
			查询
			</a-button>
		</div>

		<!-- bar -->
		<MonthBar
			v-if="dateTime && isSearch"
			:month="month"
		/>

		<!-- pie -->
		<!-- <MonthPie ref="pieRef" /> -->
	</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, Ref } from "vue";
import { Moment } from "moment";
import MonthBar from "./monthBar.vue";
import MonthPie from "./monthPie.vue";

const { proxy }: any = getCurrentInstance();

// 在 setup 中声明 ref
const barRef: Ref<InstanceType<typeof MonthBar> | null> = ref(null);
// const pieRef: Ref<InstanceType<typeof MonthPie> | null> = ref(null);

// 时间设置为响应式
const dateTime: Ref<Moment | null> = ref(null);

let month: string = "";
// 是否开始搜索
let isSearch: boolean = false;

// 默认设置为上个月
dateTime.value = proxy.$moment().subtract(1, 'months');

// 搜索
const handelSearch = () => {
	isSearch = true;
	console.log("查询");
	console.log("查询1", proxy.$moment(dateTime.value).format("yyyy-MM"));
}

// 变化月份
const handleMonthChange = (val: Moment) => {
	console.log("切换");
	// console.log("1111", val);
	// console.log(proxy.$moment(val).format('YYYY-MM'));
	// month = value;
}

</script>

<style lang="less" scoped>
.cost-report {
	.date-box {
		padding: 30px 0 10px 0;
		background: #f2f2f2;
	}
}
</style>
