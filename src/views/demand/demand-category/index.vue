<!--
 * @author: lishumin/GW00323781
 * @date: 2023/09/06 13:13:24
 * @description: 
 * Copyright(c)2024 GWM.Co.Ltd.All rights reserved.
-->

<!-- 需求分类 -->
<template>
  <div style="width: 500px; height: 500px; background: #fff; padding: 20px">
    <div class="top" style="width: 100%; display: flex; justify-content: flex-start; margin-bottom: 10px">
      <div>
        公司董事会成员 
        <a-input style="width: 80px" />
        人, 
      </div>
      <div>
        监事会成员
        <a-input  style="width: 80px"/>
        人
      </div>
    </div>
    <div class="bottom"  >
      <div style="width: 100%;">
        <span>其中职工监事</span>
        <a-input  style="width: 80px" />
        <span>人， 撒扣篮大赛来的哈上来开会的啦洪都拉斯快点回拉萨的和卢萨卡肯定会拉上宽宏大量卡上打了仨洪都拉斯回到拉萨洪都拉斯大量时间</span>
      </div>
    </div>
    <canvas ref="myCanvas"></canvas>

    <v-calendar />
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRef, ref } from 'vue';
const attrs = [
        {
          key: 'v0Day',
          dates: new Date(),
          highlight: true,
          dot: true,
          popover: {
            label: '美好的一天！要开心呦！'
          }
        },
        {
          key: 'V1Day',
          customData: '10',
          dot: {
            style: {
              backgroundColor: 'red'
            }
          },
          dates: new Date(2023, 10, 18),
          popover: {
            label: '美好的一天！要开心呦！'
          }
        },
        {
          key: 'V2Day',
          customData: '9',
          dates: new Date(2023, 10, 6)
        }
      ]
// 画布宽度
const canvasWidth = ref<number>(0);
// 画布高度
const canvasHeight = ref<number>(0);
let ctx: CanvasRenderingContext2D;
let ctxMove: CanvasRenderingContext2D;
//canvas的坐标数据
let canvasRect: DOMRect;

</script>

<style lang='less' scoped>
</style>