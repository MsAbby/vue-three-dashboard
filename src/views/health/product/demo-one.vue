<template>
	<div class="product">
		<div class="search-container flex-x-end">
			<a-input-search
				:allowClear="true"
				v-model:value="searchForm.mixSearch"
				placeholder="编号或名称"
				style="width: 200px; margin-right: 8px"
				@search="onSearch"
			/>
			<!-- 筛选按钮 -->
			<a-popover
				v-model:open="searchForm.visible"
				trigger="click"
				placement="bottom"
			>
				<template #content>
					<a-form
						v-model:value="searchForm"
						style="width: 600px; padding: 16px 16px 0px; margin-bottom: -8px"
					>
						<a-row :gutter="24">
							<a-col :span="12">
								<a-form-item>
									<a-input
										v-model:value="searchForm.code"
										placeholder="字字编号"
									></a-input>
								</a-form-item>
							</a-col>
							<a-col :span="12">
								<a-form-item>
									<a-input
										v-model:value="searchForm.name"
										placeholder="产产名称"
									>
									</a-input>
								</a-form-item>
							</a-col>
						</a-row>
					</a-form>
				</template>
				<a-button class="flex-x-center" style="margin-right: 8px">
					<img
						src="@/assets/image/icons/shaixuan.png"
						style="margin-right: 8px"
					/>
					<span class="search-text">筛选</span>
				</a-button>
			</a-popover>
            <!-- 新增按钮 -->
            <a-button
                type="primary"
                :icon="h(PlusOutlined)"
                style="margin-right: 8px"
            >
            新建
            </a-button>
			<!-- 一条竖线 -->
			<div
				style="
					display: inline-block;
					width: 0px;
					height: 16px;
					border-left: 1px solid rgb(203, 203, 203);
					position: relative;
				"
			></div>
			<!-- 设置 -->
			<a-popover
				v-model:open="columnsFilter.visible"
				trigger="click"
				placement="left"
			>
				<template #content>
					<div style="width:300px; padding: 12px;">
                        <a-checkbox
                            v-model:checked="columnsFilter.checkAll"
                            :indeterminate="columnsFilter.indeterminate"
                            @change="onCheckAllChange"
                        >
                            全选
                        </a-checkbox>
                        <a-divider />
                        <a-checkbox-group
                            v-model:value="columnsFilter.checkedList"
                            style="width: 100%"
                        >
                            <a-row>
                                <a-col
                                    :span="24"
                                    v-for="item in column"
                                    :key="item.dataIndex"
                                    style="margin-bottom: 16px;"
                                >
                                    <div class="flex-x-start">
                                        <img src="@/assets/image/icons/dot.png" style="height: 12px; margin-right: 6px;"/>
                                        <a-checkbox :value="item.title">
                                            {{item.title}}
                                        </a-checkbox>
                                    </div>
                                </a-col>
                            </a-row>
                        </a-checkbox-group>
                        <div style="text-align: right; padding-top: 8px;">
                            <a-button type="default" @click="handleCancel" class="custom-btn">取消</a-button>
                            <a-button type="primary" @click="handleSave" class="custom-btn">保存</a-button>
                        </div>
					</div>
				</template>
				<img src="@/assets/image/icons/shezhi.png" style="margin: 0 8px" />
			</a-popover>
			<img src="@/assets/image/icons/refresh.png" style="margin: 0 8px" />
		</div>
		<div class="content"></div>
	</div>
</template>

<script lang="ts" setup name="health-demo-one">
import { ref, h, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
const column = reactive([
	{
		title: "姓名",
		dataIndex: "name",
		key: "name",
		width: 100,
	},
	{
		title: "年龄",
		dataIndex: "age",
		key: "age",
		width: 100,
	},
	{
		title: "性别",
		dataIndex: "sex",
	},
	{
		title: "类型",
		dataIndex: "type",
	},
]);
// 搜索表单
const searchForm = ref({
	mixSearch: "",
	visible: false,
	code: "",
	name: "",
	age: "",
	type: "",
});
// 列设置
const columnsFilter = reactive({
	visible: false,
	// 是否选中全部
	checkAll: true,
	indeterminate: true,
	// 选中的列表
	checkedList: ["姓名", "年龄"],
	// 全部列表
	columnsList: column.map((item) => item.title),
});

const onSearch = () => {
	console.log("11111");
};

/**
 * @description: 表头列表筛选全选
 */
const onCheckAllChange = (e: any) => {
	Object.assign(columnsFilter, {
		checkedList: e.target.checked ? columnsFilter.columnsList : [],
		indeterminate: false,
	});
};

/**
 * @description: 取消
 */
const handleCancel = () => {
    columnsFilter.visible = false
}

/**
 * @description: 保存
 */
 const handleSave = () => {
    columnsFilter.visible = false
}
</script>
<style lang="less" scoped>
@import "@/assets/style/variable.less";
.product {
	padding: 16px;
	background: @bg-color-white;
	.search-text {
		color: @color-black-85;
	}
}
.custom-btn {
    padding: 4px 24px !important;
    &:first-child {
        margin-right: 16px
    }
}
</style>
<style lang="less">
@import "@/assets/style/variable.less";
.ant-input-search {
	.ant-input-search-button {
		border-left: 1px solid transparent;
	}
}

</style>
