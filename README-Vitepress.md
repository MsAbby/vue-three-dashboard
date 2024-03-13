[参考项目]： element-plus
[ant-design]: dumi

### I. 安装了vitepress
> node版本号： node v18.18.2 (npm v9.8.1)

#### 1.安装命令：
> npm install -D vitepress vue (yarn add vitepress vue)

#### 2. 修改脚本
> 在生成的 package.json 中，修改 scripts 脚本命令👇:
````js
"scripts": {
    "docs:dev":"vitepress dev docs",
    "docs:build":"vitepress build docs",
    "docs:serve":"vitepress serve docs"
  },
````
#### 3. 创建目录
````js
--docs
    --.vitepress
        --config.js  (配置目录 (路由) )
    --page          （用于存放 每个 子文档）
    --index.md      （填充主页内容）
````

#### d. 运行运 vitepress
> npm run docs:dev


### II. 文档详细配置

####  1.创建 index.md
> 在 docs 下 index.md 文件 ：用于填充主页内容(index.md 参考 👇) 
````js
---
layout: home
hero:
  name: 前端
  text: 博客
  tagline: 标语
  actions:
    - theme: brand
      text: 开始
      link: /guide/what-is-vitepress
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress
features:
  - icon: ⚡️
    title:  vite 超快冷启动和热加载
    details: Lorem ipsum...
  - icon: 🖖
    title: Vue的力量与Markdown相遇
    details: Lorem ipsum...
  - icon: 🛠️
    title: 始终简单、最少
    details: Lorem ipsum...
---
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>

````

####  2.创建 config.js
> 在 docs / ,vitepress / config.js 文件 ：于配置目录 (路由) ， 参考如下👇 
````js
export default {
    themeConfig: {
        nav: [
            {
                text: '导航',
                items: [
                    { text: '页面1', link: '/page/sidebar/guide/introduce' },
                ]
            }
        ],
      sidebar: [
        {
          text: 'Guide',
          items: [
            { text: '介绍', link: '/page/sidebar/guide/introduce' },
          ]
        }
      ]
    }
}

````

#### 3.  写完 markdown

> 可以 npm run docs:build 打包部署到 gitee 或 github 上， 部署自己的个人博客 ！！！





### III. vue3 + vite 按需引入 ant design vue 并自定义主题（没有单独安装文件）

#### 1. 安装 ant-design-vue（项目中已经存在）
> npm i ant-design-vue -S

#### 2. 安装 less（项目中已经存在）
> npm i less -D

#### 3. 安装unplugin-vue-components 用于按需引入 ant design vue（项目中已经存在）
> npm i unplugin-vue-components -D

#### 4. 在vite.config.js配置：
````js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less', // 一定要开启这个配置项
        }),
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { // 在这里自定义主题色等样式
          'primary-color': '#1da57a',
          'link-color': '#1da57a',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  },
})
````

### IV. markdown文件怎么写锚点链接跳转
> 详情参考： docs/page/sidebar/guide/introduce.md

````
# 标题

----
## 目录
1. [目录1](#jump1)
2. [目录2](#jump2)

---
### <span id="jump1">1. 目录1</span>
---
### <span id="jump2">2. 目录2</span>
````

