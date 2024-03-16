import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { viteMockServe } from 'vite-plugin-mock' // 配置mock假数据
import vueJsx from "@vitejs/plugin-vue-jsx"; // 配置vue使用jsx
import VueSetupExtend from 'vite-plugin-vue-setup-extend' // setup语法糖写法支持加name

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver()],
    }),
    vueJsx(),
    // setup语法糖写法支持加name
    VueSetupExtend(),
    // 支持mock假数据
    viteMockServe({
      // 是否读取ts文件模块，设置为true时不能读取js文件
      supportTs: false,
      // 是否在控制台显示请求日志
      logger: false,
      // 设置模拟数据的存储文件夹，如果不是index.js需要写明完整路径
      mockPath: "./mock/"
    })
  ],
  
  resolve: {
    alias: {
      "@": resolve(__dirname, '.', "src"),
      "@assets": resolve(__dirname, '.', "src/assets"),
      "_c": resolve(__dirname, '.', "src/component"),
    },
    extensions:['.mjs','.js','.ts','.jsx','.tsx','.json'],
  }
});
