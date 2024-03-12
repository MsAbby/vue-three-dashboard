<template>
	<a-form
		ref="formPackage"
		:model="formData"
		:rules="rules"
		class="my-table1-form"
	>
        <!-- 数组循环校验demo -->
        <!-- <template v-for="(item, index) in formData.dataSource" :key="item.id" >
            <a-form-item
                :name="['dataSource', index, 'name']"
                label="个数"
                :rules="rules.search"
                style="margin-bottom: 30px"
            >
                <a-input v-model:value="item.name" />
            </a-form-item>
        </template> -->
       
		1. 是否必填校验<br />
		2. 取消是否二次判断
		<a-table
			:columns="columns"
			:data-source="formData.dataSource"
			:pagination="false"
			bordered
		>
			<!-- 表头 -->
			<template #headerCell="{ title }">
				<div>
					<span>{{ title }}</span>
					<a-popover title="输入框规则" v-if="title === '名称'">
						<template #content>
							<p>1. 英文、数字、特殊字符</p>
							<p>2. 最多50个字符</p>
							<p>3. 编辑成功后，操作人和时间更新</p>
						</template>
						<ExclamationCircleOutlined
							style="margin-left: 8px; cursor: pointer"
						/>
					</a-popover>
				</div>
			</template>
			<template #bodyCell="{ column, text, record }">
				<!-- 表格数据： record 为当前行数据，column 为当前列数据，text 为当前列数据的值 -->
				<template v-if="['age', 'ip', 'address'].includes(column.dataIndex)">
					<div v-if="formData.editableData[record.key]">
						<a-form-item
                            :name="['editableData', record.key, column.dataIndex]"
							:rules="rules.age"
							v-if="['age'].includes(column.dataIndex)"
						>
							<a-input v-model:value="formData.editableData[record.key][column.dataIndex]"/>
						</a-form-item>

						<a-form-item
							:name="['ip']"
							v-if="['ip'].includes(column.dataIndex)"
						>
							<a-select
								v-model:value="formData.editableData[record.key][column.dataIndex]"
								style="width: 120px"
							>
								<a-select-option
									v-for="item in ipOptions"
									:key="item.value"
									:value="item.value"
								>
									{{ item.label }}
								</a-select-option>
							</a-select>
						</a-form-item>
						<a-form-item
							:name="['address']"
							v-if="['address'].includes(column.dataIndex)"
						>
							<a-select
								v-model:value="formData.editableData[record.key][column.dataIndex]"
								style="width: 120px"
							>
								<a-select-option
									v-for="item in addressOptions"
									:key="item.value"
									:value="item.value"
								>
									{{ item.label }}
								</a-select-option>
							</a-select>
						</a-form-item>
					</div>
					<template v-else>
						{{ text }}
					</template>
				</template>

				<!-- 操作区域 -->
				<template v-else-if="column.dataIndex === 'operation'">
					<div class="editable-row-operations">
						<!-- 编辑时： 保存和取消出现 -->
						<span v-if="formData.editableData[record.key]">
							<a @click="save(record.key)">保存</a>
							<a-popconfirm
								title="确认取消?"
								cancelText="取消"
								okText="确认"
								@confirm="cancel(record.key)"
							>
								<a>取消</a>
							</a-popconfirm>
						</span>
						<!-- 编辑和删除同时存在 -->
						<span v-else>
							<a @click="edit(record.key)">编辑</a>
							<a @click="deletes(record.key)">删除</a>
						</span>
					</div>
				</template>
			</template>
		</a-table>
	</a-form>

	<div class="add-btn" @click="addRow()">+添加</div>
    <a-popover title="表格中嵌套输入框加校验规则">
        <template #content>
            <p>1. a-form:   :model="formData"</p>
            <p>2. a-table:  :data-source="formData.dataSource"</p>
            <p>3. a-form-item: :name="['editableData', record.key, column.dataIndex]"</p>
            <p>4. a-input:     v-model:value="formData.editableData[record.key][column.dataIndex]"</p>
        </template>
        <ExclamationCircleOutlined
            style="margin-left: 8px; cursor: pointer"
        />
    </a-popover>
</template>
<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { reactive, ref } from "vue";
import type { UnwrapRef } from "vue";
import type { Rule } from 'ant-design-vue/es/form';

// ts interface
interface DataItem {
	key: string;
	name: string;
	age: string;
	address: string;
	person: string;
	time: string;
	ip: string;
}

interface Forms {
    dataSource: any;
    /**
     * UnwrapRef 用于取消引用(ref)类型的嵌套。
     * 1. 当使用 ref 创建一个响应式数据时，会得到一个 Ref 对象，它是一个包装了原始值的对象。使用 UnwrapRef可将 Ref 对象还原为其原始的值类型，以便在需要直接操作原始值的地方使用。
     * 2. 提供更好的类型推断。
     */
    editableData: UnwrapRef<Record<string, DataItem>>;
    search: any
}

// 业务下拉框
const ipOptions = [
	{
		value: "jack",
		label: "Jack",
	},
	{
		value: "lucy",
		label: "Lucy",
	},
	{
		value: "Yiminghe",
		label: "yiminghe",
	},
];

// 地址下拉框
const addressOptions = [
	{
		value: "1",
		label: "SADASDSDSDSADASDA",
	},
	{
		value: "2",
		label: "华南说到拉萨到家了",
	},
	{
		value: "3",
		label: "阿莱克斯大量开始就倒垃圾的垃圾到拉萨到家",
	},
];

// 列表
const columns = [
	{
		title: "姓名",
		dataIndex: "name",
	},
	{
		title: "名称",
		dataIndex: "age",
		width: "15%",
	},
	{
		title: "业务",
		dataIndex: "ip",
		width: "15%",
	},
	{
		title: "地址",
		dataIndex: "address",
		width: "15%",
	},
	{
		title: "操作人",
		dataIndex: "person",
	},
	{
		title: "时间",
		dataIndex: "time",
	},
	{
		title: "操作",
		dataIndex: "operation",
	},
];

// 输入框不能输入中文
const checkData = async (_rule: Rule, value: any) => {
    if (value) {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          return Promise.reject('仅支持英文、数字、特殊字符!')
        } else {
            return Promise.resolve()
        }
    } else {
        return Promise.resolve()
    }
}

const rules: Record<string, Rule[]> = {
	age: [
		{ required: true, message: "请输入名称", trigger: "blur" },
		{ validator: checkData, trigger: "blur" },
	],
    search: [
		{ validator: checkData, trigger: "blur" },
	],
};



// 后台请求的数据
const data: DataItem[] = [];

const formData:Forms = reactive({
    /* ref:
    * 1. 创建响应式数据，通常用于创建基础类型（如字符串、数字、布尔值）的响应式数据
    * 2. 模板中访问这些数据不需要添加.value
    * 3. ref通过Object.defineProperty的get和set来实现响应式
    */
	dataSource: ref(data),
    /* reactive:
    * 1.  创建响应式数据，更适合用于创建复杂数据类型的响应式数据，如对象和数组
    * 2.  模板中访问这些数据也不需要添加.value
    * 3.  reactive则通过使用Proxy来实现响应式
    */
    editableData: reactive({}),
    search: [
        { name: "" }
    ]
});

for (let i = 0; i < 5; i++) {
	data.push({
		key: i.toString(),
		name: `Edrward ${i}`,
		age: "32",
		person: "王武（wx12345678）",
		address: `SADASDSDSDSADASDA`,
		ip: "jack",
		time: "2024-05-01",
	});
}


/**
 * 添加行
 * 在Ant Design Vue中, 你可以使用Table组件的row-key属性和使用JSX（或template）来动态添加带有input的新行
 * 默认展示input ,需要给key
 */
const addRow = () => {
	const keys = "add" + formData.dataSource.length.toString();
	formData.dataSource.push({
		key: keys,
		name: "",
		age: "",
		address: "",
		person: "",
		time: "",
		ip: "",
	});
	// 编辑框展示需要给editableData列表添加对应的key
	formData.editableData[keys] = cloneDeep(
		formData.dataSource.filter((item) => keys === item.key)[0]
	);
};
// 编辑
const edit = (key: string) => {
	formData.editableData[key] = cloneDeep(
		formData.dataSource.filter((item) => key === item.key)[0]
	);
};

// 删除
const deletes = (key: string) => {
	formData.editableData[key] = cloneDeep(
		formData.dataSource.filter((item) => key === item.key)[0]
	);
};

// 保存
const save = (key: string) => {
	Object.assign(
		formData.dataSource.filter((item) => key === item.key)[0],
		formData.editableData[key],
		{
			person: "王武（wx12345678）",
			name: "Edrward" + key,
			time: "2024-05-01",
			address: addressOptions.filter(
				(item) => item.value === formData.editableData[key]["address"]
			)[0].label,
		}
	);
	delete formData.editableData[key];
};

// 取消
const cancel = (key: string) => {
	delete formData.editableData[key];
};
</script>
<style scoped lang="less">
@import "../index.less";

.editable-row-operations a {
	margin-right: 8px;
}
.add-btn {
	width: 100%;
	text-align: center;
	height: 45px;
	line-height: 45px;
	border: 1px dashed #e9e9e9;
	background: #fff;
	margin-top: 10px;
}
</style>
