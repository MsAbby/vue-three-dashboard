/*
 * @author: lishumin/GW00323781
 * @date: 2023/09/06 13:13:24
 * @description: 
 * Copyright(c)2024 GWM.Co.Ltd.All rights reserved.
 */



import { createStore } from 'vuex';

// 为了减少一个个导入module
// vite+vue3搭建的工程批量导入store的module
const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true })


let modules: any = {}

for (const path in modulesFiles) {
  const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = (modulesFiles[path] as any).default
}

// 添加namespaced
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true;
});

const store = new (createStore as any)({
  modules
});

export default store;