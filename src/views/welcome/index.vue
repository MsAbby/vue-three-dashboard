<template>
    <div class="welcome-content flex-y-center flex-x-center">
       <img src="@assets/image/welcome.png" />
    </div>
</template>

<script lang='ts' setup>
import { reactive, toRef, ref } from 'vue'
</script>

<style scoped lang="less">
.welcome-content {
    width: 100%;
    height: 100%;
    img {
        width: 70%;
    }
}
</style>