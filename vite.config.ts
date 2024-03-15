import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
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
    VueSetupExtend()
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
