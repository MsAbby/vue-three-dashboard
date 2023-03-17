/*
* form 表单常用的小组件
*/
import { h } from 'vue'
let formConfigBuilder = {}

// input
formConfigBuilder.Input = function Input(config) {
  const mm = formConfigBuildeFactory({
    clearable: true,
    placeholder: `请输入${config.label}`,
  })(config);

  const component = h(ElInput, {...config})
  return {...config, component}
}

// textarea
formConfigBuilder.TextArea = function TextArea(config) {
    return formConfigBuildeFactory({
        type: 'textarea',
        clearable: true,
        autosize: { minRows: 3, maxRows: 5 },
        placeholder: `请输入${config.label}`,
    })(config);
}

// datepicker
formConfigBuilder.DatePicker = function DatePicker(config) {
    return formConfigBuildeFactory({
        clearable: true,
        editable: false,
        type: 'daterange',
        format: 'yyyy/MM/dd',
        placeholder: config.label
    })(config);
}

// select
formConfigBuilder.Select = function Select(config) {
    return formConfigBuildeFactory({
        transfer: true,
        clearable: true,
        placeholder: `请选择${config.label}`
    })(config);
}

// option
formConfigBuilder.Option = function Option({
    label,
    value,
    props = {}
}) {
    return {
        component: 'Option',
        label,
        value,
        props
    }
}

// cascader
formConfigBuilder.Cascader = function Cascader(config) {
    return formConfigBuildeFactory({
        clearable: true,
        editable: false,
        placeholder: config.label
    })(config);
}


function formConfigBuildeFactory(defaultProps) {
  return function (config) {
    return formConfigBuilder.Custom({
      props: { ...defaultProps, ...config.props },
      ...config
    })
  }
}

// custom
formConfigBuilder.Custom = function (config) {
  config.className = config.className || {};
  config.attrs = config.attrs || {};
  config.style = config.style || {};
  config.children = config.children || [];
  config.on = config.on || {};
  config.nativeOn = config.nativeOn || {};
  config.props = config.props || {};
  config.domProps = config.domProps || {};
  config.rules = config.rules || {};
  config.onlyText = config.onlyText || false;
  config.textFilter = config.textFilter || ((v) => v);
  config.hidden = typeof config.hidden === 'boolean' ? config.hidden : false;
  return config;
}

// formConfigBuilder.Custom = function (config) {
//   config.className = config.className || {};
//   config.attrs = config.attrs || {};
//   config.style = config.style || {};
//   config.children = config.children || [];
//   config.on = config.on || {};
//   config.nativeOn = config.nativeOn || {};
//   config.props = config.props || {};
//   config.domProps = config.domProps || {};
//   config.rules = config.rules || {};
//   config.onlyText = config.onlyText || false;
//   config.textFilter = config.textFilter || ((v) => v);
//   config.hidden = typeof config.hidden === 'boolean' ? config.hidden : false;
//   return config;
// }

export default formConfigBuilder;