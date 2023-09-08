<template>
  <a-row class="tac">
    <a-col :span="24">
      <!-- router： 开启， 就会以index为跳转目标, 使用 default-active 来设置加载时的激活项 -->
      <a-menu
        default-active
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </a-menu>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
/*
** reactive:  只能 给对象、数组添加响应式
**      ref:  给值类型添加响应式
**    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
*/
import {reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import SidebarItem from '../component/sidebar-item.vue'

const router = useRouter()
const store = useStore()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
let state = reactive({

})


onMounted(() => {
    console.log(store.state.routes.routes)
})

const routes = computed(() => {
  return store.state.routes.routes
})
</script>