<!-- 组件 -->
<template>
  <div>
    组件
    <UploadVideo
      ref="infoForm"
      :disabled="false" 
      :editVideo="qData.formData.picVideo" 
      @videoUpload="(value) => videoUpload(value, index)"
    >
    </UploadVideo>
    <FormContent></FormContent>
  </div>
</template>

<script lang='ts' setup>
/*
** reactive:  只能 给对象、数组添加响应式
**      ref:  给值类型添加响应式
**    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
*/
import { reactive, toRef, ref } from 'vue'
import UploadVideo from '@/components/upload-video.vue'
import FormContent from '@/components/base-components/form-content/index.vue'
 const qData = reactive({
    formData: {
      picVideo: ''
    }
})

/******** methods ********/
const videoUpload = (value) => {
  qData.formData.picVideo = value;
}
</script>

<style lang='less' scoped>
</style>