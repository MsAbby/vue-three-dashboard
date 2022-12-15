<template>
    <div class="common-layout">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
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