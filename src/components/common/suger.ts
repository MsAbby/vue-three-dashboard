
const formConfigBuilder = {} as FormConfigBuilder;

formConfigBuilder.Input = function Input(config) {
    return formConfigBuildeFactory('Input', {
        clearable: true,
        placeholder: `请输入${config.label}`,
    })(config);
}

formConfigBuilder.TextArea = function TextArea(config) {
    return formConfigBuildeFactory('Input', {
        type: 'textarea',
        clearable: true,
        autosize: { minRows: 3, maxRows: 5 },
        placeholder: `请输入${config.label}`,
    })(config);
}

formConfigBuilder.DatePicker = function DatePicker(config) {
    return formConfigBuildeFactory('DatePicker', {
        clearable: true,
        editable: false,
        type: 'daterange',
        format: 'yyyy/MM/dd',
        placeholder: config.label
    })(config);
}

formConfigBuilder.Select = function Select(config) {
    return formConfigBuildeFactory('Select', {
        transfer: true,
        clearable: true,
        placeholder: `请选择${config.label}`
    })(config);
}

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

formConfigBuilder.Cascader = function Cascader(config) {
    return formConfigBuildeFactory('Cascader', {
        clearable: true,
        editable: false,
        placeholder: config.label
    })(config);
}


formConfigBuilder.Transfer = function (config) {
    return formConfigBuildeFactory('Transfer', {})(config);
}

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

function formConfigBuildeFactory(component: string, defaultProps: any) {
    return function (config: FormConfigItem): FormConfigItem {
        return formConfigBuilder.Custom({
            ...config,
            component,
            props: { ...defaultProps, ...config.props }
        })
    }
}

export default formConfigBuilder;