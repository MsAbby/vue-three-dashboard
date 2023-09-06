<template>
    <article class="module-content">
        <section class="module-content-top">
            <div  class="flex-x-between">
                <el-date-picker
                    v-model="formData.dateMonth"
                    type="month"
                    value-format="YYYY-MM"
                    placeholder="选择月份"
                    :default-value="formData.datetime"
                />
                <el-button type="primary" @click="handelSearch">查询</el-button>
            </div>
            <div class="module-result">{{ formData.dateMonth }}</div>
        </section>
        <div class="module-text">
            <h4>需求点：</h4>
            <p>时间格式： 年-月</p>
            <p>默认展示： 选中上一个月</p>
        </div>
    </article>
</template>
<script lang="ts" setup>
/*
 ** reactive:  只能 给对象、数组添加响应式
 **      ref:  给值类型添加响应式
 **    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
 */
import { reactive, toRef, ref, onMounted } from "vue";

const formData = reactive({
	dateMonth: "",
    datetime: new Date(),
});

// 使用
onMounted(() => {
    handelInitTime();
})

const handelInitTime = () => {
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth();
    formData.dateMonth = `${year}-${month}`
    console.log(year, month)
    // formData.dateMonth = nowDate;
}





</script>
<style lang="less" scoped>
.module-content {
    background: #fff;
    border-radius: 10px;
    .module-content-top {
        background: #FBE7E9;
        padding: 10px;
        height: 120px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
    .module-text {
        padding: 10px;
        p {
            font-size: 14px;
        }
    }
    .module-result {
        text-align: center;
        margin-top: 10px;
    }
}
</style>
