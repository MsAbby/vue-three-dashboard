<template>
    <div class="common-layout">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <SideBar></SideBar>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
/*
** reactive:  只能 给对象、数组添加响应式
**      ref:  给值类型添加响应式
**    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
*/
import { reactive, toRef, ref } from 'vue';
import SideBar from './sidebar/index.vue'

const state = reactive({

})
</script>

<style scoped>
.el-container {
    width: 100%;
    height: 100%;
}

.common-layout {
    width: 100%;
    height: 100%;
}

.el-aside {
    background: #fff;
}

.el-header {
    background: #fff;
    border-bottom: 1px solid rgb(233, 233, 233);
    height: 40px;
}

.el-main {
    background: #f7f8ff;
    width: 100%;
    height: 100%;
}
</style>