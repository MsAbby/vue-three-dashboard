

<template>
	<div class="cost-report">
		<!-- time -->
		<div class="h-flex h-flex-start h-align-center date-box">
			<p style="color: #000000">时间：</p>
			<a-month-picker
				style="width: 200px"
				v-model:value="time"
				format="YYYY-MM"
				placeholder="请选择月份"
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
		<a-row style="width: 100%; background-color: transparent;" :gutter="16">
			<a-col :span="12">
				<MonthLine
					:month="month"
					:isSearch="isSearch"
					@searchEnd="searchEnd"
				/>
			</a-col>
			<a-col :span="12">
				<MonthBar
					:month="month"
					:isSearch="isSearch"
					@searchEnd="searchEnd"
				/>
			</a-col>
			
		</a-row>
		
		<!-- pie -->
		<MonthPie
			:month="month"
			:isSearch="isSearch"
			@searchEnd="searchEnd"
			ref="pieRef"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue";
import { Moment } from "moment";
import MonthBar from "./monthBar.vue";
import MonthLine from "./monthLine.vue";
import MonthPie from "./monthPie.vue";

// 时间设置为响应式
const time: Ref<Moment | null> = ref(null);

let month: string = "";
// 是否开始搜索
let isSearch = ref(false);

onMounted(() => {
	// 默认设置为上个月
	const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);

});
	
// 搜索
const handelSearch = () => {
	isSearch.value = true;
	if (time.value) {
		month = time.value.format('YYYY-MM');
	}
}

const searchEnd = () => {
	isSearch.value = false;
}


</script>

<style lang="less" scoped>
.cost-report {
	.date-box {
		padding: 30px 0 10px 0;
	}
}
</style>
