// 这是子组件（渲染在父组件上面的）
/**
 * 新建： 新建一个组件
 * 入参： 传入一个参数（父组件写的不同的业务组件，在这里注册）
 * 结果   返回一个新组件
 */

import { ref, h } from 'vue'
import formContent from './index'

export default function formContentHoc({ ...customComponents }) {
    const componentName = customComponents;
    return {
      fixComponent: formContent,
      components: {
        componentName
      }
  }
}

