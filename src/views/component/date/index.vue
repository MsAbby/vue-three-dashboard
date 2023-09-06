<template>
    <div>
        <div>
            <h2>【日期】选择器</h2>
            <div class="flex-x-between module-box">
                <DatePickerOne />
            </div>
        </div>
        <div>
            <h2>【日期-时间】选择器</h2>
            <DateTimePickerContent />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, toRef, ref } from 'vue'
import DatePickerOne from "./components/date-picker-one.vue"
import DateTimePickerContent from "./date-time-picker.vue"
</script>
<style lang='less' scoped>
.module-box {
    border: 10px;
    margin-right: 10px;
}
</style>
