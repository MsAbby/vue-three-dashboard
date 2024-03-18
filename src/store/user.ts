
/**
 * 获取用户信息
 */
import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfoStore', {
    state: () => ({
        token: "",
        userInfo: {}
    }),
    getters: {
    },
    actions: {
        /**
         * 获取用户信息
         * @returns
         */
        async getUserInfo() {
            // 1. 后台接口请求，获取menu
            const res  = await axios.get("/api/auth/queryUserPermission2");
            const result = res.data.response;
            if (result.code === "000000") {
                this.userInfo = result.data;
                return result.data
            }
        }
    },
})