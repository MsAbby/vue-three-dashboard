/**
 * 规则触发方式
 */
declare type Trigger = 'blur' | 'change' | 'blur,change';

/**
 * 校验类型
 */
declare type ValidatorType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email' | 'any';

/**
 * 表单配置规则语法糖
 * 用于生成常规的组件配置
 * 支持自定义组件
 */
declare interface FormConfigBuilder {
    /**
     * 输入框
     */
    Input(config: FormConfigItem): FormConfigItem;
    /**
     * 事件选择器
     */
    DatePicker(config: FormConfigItem): FormConfigItem;
    /**
     * 下拉选框
     */
    Select(config: FormConfigItem): FormConfigItem;
    /**
     * 下拉子选项
     */
    Option(config: FormConfigItem): FormConfigItem;
    /**
     * 级联选择器
     */
    Cascader(config: FormConfigItem): FormConfigItem;
    /**
     * 录入域
     */
    TextArea(config: FormConfigItem): FormConfigItem;
    /**
     * 穿梭框
     */
    Transfer(config: FormConfigItem): FormConfigItem;
    /**
     * 自定义组件
     */
    Custom(config: FormConfigItem): FormConfigItem;
}

declare interface FormConfigItem {
    /**
     * form表单元素是否可修改
     */
    onlyText?: boolean;

    textFilter?: (v: any) => any;
    /**
     * 组件名称
     */
    component?: string;
    /**
     * 1.双向绑定的键值
     * 2.组件的key
     */
    key?: string;
    /**
     * 组件默认值
     */
    value?: any;
    /**
     * 显示标签
     */
    label?: string;
    /**
     * dom原生类名 支持 数组|对象|字符串
     */
    className?: string | any[] | {[key: string]: any};
    /**
     * 原生dom标签属性
     */
    attrs?: any;
    /**
     * 原生dom样式属性
     */
    style?: any;
    /**
     * 子组件 常用于 Select Option
     */
    children?: any[];
    /**
     * 组件事件
     */
    on?: any;
    /**
     * 原生dom事件
     */
    nativeOn?: {
        // eslint-disable-next-line @typescript-eslint/ban-types
        [key in keyof DocumentEventMap]?: Function | Function[]
    },
    /**
     * 表单验证字段属性
     */
    prop?: string;
    /**
     * 原生dom属性
     */
    domProps?: { [key: string]: any };
    /**
     * 校验器规则
     */
    rules?: RuleOptions | RuleOptions[];
    /**
     * 组件属性
     */
    props?: any;
    /**
     * 栅格列
     */
    span?: number;
    /**
     * 栅格列搜索时自定义宽度 xxl，xl, lg，sm, xs:24 
     */
    xxlSpan?: number;
    xlSpan?: number;
    lgSpan?: number;
    mdSpan?: number;
    smSpan?: number;
    /**
     * 是否隐藏 隐藏:true 显示:false 默认为 false
     */
    hidden?: boolean;
}

declare type RuleOptions = {
    /**
     * 校验类型
     */
    type?: ValidatorType;
    /**
     * 是否必选
     */
    required?: boolean;
    /**
     * 正则校验规则
     */
    pattern?: RegExp;
    /**
     * 最小值 使用此属性请选择type类型 string / array 校验长度 number 校验大小
     */
    min?: number;
    /**
     * 最大值 type类型 string / array 校验长度 number 校验大小
     */
    max?: number;
    /**
     * 要验证字段的确切长度，请指定len属性 string / array 校验长度 number 校验完全匹配
     * 如果该len属性与 themin和maxrange 属性结合使用，len则优先
     */
    len?: number;
    /**
     * 校验是否包含空格 使用此属性请指定type值为 string
     */
    whitespace?: boolean;
    /**
     * 对当前字段进行枚举值的预设
     */
    enum?: any[];
    /**
     * 如果您需要验证深层对象属性，您可以通过将嵌套规则分配给规则的属性来验证object或array
     */
    fields?: { [key: string]: RuleOptions } | RuleOptions[];
    /**
     * 对object或array所有属性进行整体的校验;defaultField是对fields的扩展
     */
    defaultField?: { [key: string]: RuleOptions } | RuleOptions[];
    /**
     * 对当前校验值进行转换
     */
    transform?: (value: any) => any;
    /**
     * 错误提示
     */
    message?: string;
    /**
     * 触发类型
     */
    trigger?: Trigger | Trigger[];
    /**
     * 校验函数
     */
    validator?: (rule: any, value: any, callback: any) => any;
    /**
     * 异步验证器
     */
    asyncValidator?: (rule: any, value: any, callback: any,) => any;
}