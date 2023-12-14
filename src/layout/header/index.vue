<template>
    <div class="layout__header">
      <div class="header__left">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="$emit('update:collapsed', !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="$emit('update:collapsed', !collapsed)" />
        <!-- <div class="group__tabs">
          <a-tabs :activeKey="activeKey" >
            <a-tab-pane v-for="item in routers" :key="item.id" :tab="item.name" />
          </a-tabs>
        </div> -->
      </div>
      <div class="header__right">
        <a-dropdown :trigger="['click', 'hover']">
          <div class="header__avatar">
            <a-avatar>
              <!-- <template #icon>
                <img :src="avatar" v-if="avatar.length > 0" />
                <img src="@/assets/layout/avatar.png" v-else />
              </template> -->
            </a-avatar>
            <!-- <div class="header__avatar-name">{{ name.length > 0 ? name : 'admin' }}</div> -->
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="logout()">
                <template #icon><a-icon type="PoweroffOutlined" /></template>
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </template>
<script lang="ts" setup>
    import { reactive, toRef, ref, defineProps } from "vue";
    import { mapState, useStore } from 'vuex'
    import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'

    const props = defineProps({
        collapsed: Boolean
    });
  
    // 退出登录
    const logout = () => {
        console.log("1111111")
    }
  
  </script>
  <style lang="less" scoped>
  .layout__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 22px;
    font-size: 20px;
    & .header__left {
      display: flex;
      align-items: center;
      flex-grow: 1;
      & .group__tabs {
        width: 500px;
        margin-left: 22px;
        margin-right: 22px;
        flex-grow: 1;
      }
    }
  
    & .header__right {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      flex-grow: 0;
      & .header__avatar {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        & .header__avatar-name {
          margin-left: 6px;
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
  }
  </style>
  <style lang="less">
  .layout__header {
    & .header__left {
      & .ant-tabs-bar {
        margin: 0;
        border: none;
      }
    }
  }
  </style>