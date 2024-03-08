
<template>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="false"
      bordered
    >
      <template #bodyCell="{ column, text, record }">
        <!-- 表格数据 -->
        <template v-if="['age', 'ip', 'address'].includes(column.dataIndex)">
          <div>
            <div v-if="editableData[record.key]">
              <a-input
                v-model:value="editableData[record.key][column.dataIndex]"
                style="margin: -5px 0"
              />
              <!-- <a-select></a-select> -->
            </div>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>

        <!-- 操作区域 -->
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <!-- 编辑时： 保存和取消出现 -->
            <span v-if="editableData[record.key]">
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
    <div class="add-btn" @click="addRow()">
      +添加
    </div>
  </template>
  <script lang="ts" setup>
  import { cloneDeep } from 'lodash-es';
  import { reactive, ref } from 'vue';
  import type { UnwrapRef } from 'vue';
  
  // 列表
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '名称',
      dataIndex: 'age',
      width: '15%',
    },
    {
      title: '业务',
      dataIndex: 'ip',
      width: '15%',
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: '15%',
    },
    {
      title: '操作人',
      dataIndex: 'person',
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: '操作',
      dataIndex: 'operation',
    },
  ];
  // ts interface
  interface DataItem {
    key: string;
    name: string;
    age: number;
    address: string;
    person: string;
    time: string;
  }

  // 后台请求的数据
  const data: DataItem[] = [];

  for (let i = 0; i < 5; i++) {
    data.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      person: "王武（wx12345678）",
      address: `London Park no. ${i}`,
      time: "2024-05-01"
    });
  }
  
  /* ref:
   * 1. 创建响应式数据，通常用于创建基础类型（如字符串、数字、布尔值）的响应式数据
   * 2. 模板中访问这些数据不需要添加.value
   * 3. ref通过Object.defineProperty的get和set来实现响应式
  */
  const dataSource = ref(data);

  /**
   * UnwrapRef 用于取消引用(ref)类型的嵌套。
   * 1. 当使用 ref 创建一个响应式数据时，会得到一个 Ref 对象，它是一个包装了原始值的对象。使用 UnwrapRef可将 Ref 对象还原为其原始的值类型，以便在需要直接操作原始值的地方使用。
   * 2. 提供更好的类型推断。
   */

  /* reactive: 
  * 1.  创建响应式数据，更适合用于创建复杂数据类型的响应式数据，如对象和数组
  * 2.  模板中访问这些数据也不需要添加.value
  * 3.  reactive则通过使用Proxy来实现响应式
  */
  const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
  
  // 添加行
  const addRow = () => {
    dataSource.value.push({
      key: "",
      name: "",
      age: null,
      address: "",
      person: "",
      time: "",
    });
  };
  // 编辑
  const edit = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  };

  // 删除
  const deletes = (key: string) => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
  };

  // 保存
  const save = (key: string) => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
  };

  // 取消
  const cancel = (key: string) => {
    delete editableData[key];
  };
  </script>
  <style scoped>
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
 