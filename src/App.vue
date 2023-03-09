<!--  -->
<template>
<div class="app-content">
  <router-view></router-view>
</div>
</template>

<script lang='ts' setup>
import { reactive, toRef, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
 const store = useStore()
onMounted(() => {
    store.dispatch('routes/setAllRoutes');
})
</script>

<style lang='less' scoped>
  .app-content {
    width: 100vw;
    height: 100vh;
  }
</style>