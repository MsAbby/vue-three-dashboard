

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

		<a-row class="second-box">
			<a-col :span="6" class="four-content">
				<div class="title">粽粽粽粽</div>
				<div class="first-content content">456，789，098</div>
			</a-col>
			<a-col :span="6" class="four-content">
				<div class="title">工工工粽粽粽粽TOP3</div>
				<div class="content">
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
				</div>
			</a-col>
			<a-col :span="6" class="four-content">
				<div class="title">一级粽粽粽粽TOP3</div>
				<div class="content">
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
				</div>
			</a-col>
			<a-col :span="6" class="four-content">
				<div class="title">二级粽粽粽粽TOP3</div>
				<div class="content">
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
					<div class="detail h-flex h-flex-between h-align-center">
						<span>优先公司爱</span>
						<span>456，789，098</span>
					</div>
				</div>
			</a-col>
		</a-row>

		<!-- bar -->
		<MonthLineSecond
			:month="month"
			:isSearch="isSearch"
			@searchEnd="searchEnd"
		/>
		
		<MonthBarSecond
			:month="month"
			:isSearch="isSearch"
			@searchEnd="searchEnd"
		/>

		<MonthBarThree
			:month="month"
			:isSearch="isSearch"
			@searchEnd="searchEnd"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue";
import { Moment } from "moment";
import MonthBarSecond from "./monthTree.vue";
import MonthLineSecond from "./monthLine.vue";
import MonthBarThree from "./monthPie.vue";

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
.second-box {
	flex: 3;
	height: 140px;
	background: linear-gradient(#DFEBFF, #F7F9FF);
	margin-right: 12px;
	border-radius: 6px;
	margin-bottom: 20px;
	padding: 16px 0;
	.four-content {
		border-right: 1px solid #ffffff;
		padding: 0 20px;
		&:last-child {
			border-right: 1px solid transparent;
		}
	}
	.title {
		text-align: center;
		color: #05115A;
		font-size: 16px;
		margin-bottom: 16px;
	}
	.first-content {
		text-align: center;
	}
}
.h-flex {
	display: flex;
}
.h-flex-between {
	justify-content: space-between
}
.h-flex-center {
	justify-content: center
}
.cost-report {
	.date-box {
		padding: 30px 0 10px 0;
	}
}
</style>
