<template>
    <div>
        <div>
            <h3>【日期】选择器</h3>
            <div class="flex-x-between module-box">
                <DatePickerOne />
            </div>
        </div>
        <div>
            <h3>【日期-时间】选择器</h3>
            <DatePickerTimerOne />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, toRef, ref } from 'vue'
import DatePickerOne from "./components/date-picker-one.vue"
import DatePickerTimerOne from "./components/date-picker-time-one.vue"
</script>
<style lang='less' scoped>
.module-box {
    border: 10px;
    margin-right: 10px;
}
</style>
