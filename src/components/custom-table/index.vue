<!-- 自定义表格 -->
<template>
	<div class="custom-table">
		<el-table
			v-loading="config.loading"
			ref="multipleTableRef"
			:data="tableData"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<!-- 是否多选 -->
			<el-table-column
				v-show="config.isSelection"
				align="center"
				type="selection"
				width="55"
			></el-table-column>

			<!-- 渲染区 -->
			<el-table-column
				v-for="item in columns"
				:key="item.prop"
				:fixed="item.fixed"
				:type="item.type"
				:prop="item.prop"
				:label="item.label"
				:width="item.width"
				:align="item.align || 'center'"
			></el-table-column>

			<!-- 按钮区 -->
			<el-table-column
				fixed="right"
				label="Operations"
				width="120"
				v-show="config.isOperations"
			>
				<template #default>
					<el-button
						v-for="item in buttons"
						:key="item.name"
						:type="item.type"
						:size="item.size || 'small'"
						@click="handleClick(item.name)"
					>
						item.name
					</el-button>
				</template>
			</el-table-column>
		</el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="config.isPSagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.pageNum"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize"
      v-bind="$attrs"
      layout="total, sizes, prev, pager, next"
      :total="pagination.total">
     </el-pagination>
	</div>
</template>

<script lang="ts" setup>
import { reactive, toRef, ref } from 'vue';
/**
 *      功能: table封装
 *  loading: 是否需要加载中 - config.loading
 *      多选: 是否需要多选 - config.isSelection
 *    操作区:  是否需要操作区 - config.isOperations
 *      分页： 是否需要分页 - config.isPSagination
 *      固定: item是否需要固定
 */
const props = defineProps({
  config
});
const handleSelectionChange = () => {
	console.log('click');
};
const handleClick = () => {
	console.log('click');
};
const tableData = [
	{
		date: '2016-05-03',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Home',
	},
	{
		date: '2016-05-02',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Office',
	},
	{
		date: '2016-05-04',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Home',
	},
	{
		date: '2016-05-01',
		name: 'Tom',
		state: 'California',
		city: 'Los Angeles',
		address: 'No. 189, Grove St, Los Angeles',
		zip: 'CA 90036',
		tag: 'Office',
	},
];
</script>

<style lang="less" scoped></style>
