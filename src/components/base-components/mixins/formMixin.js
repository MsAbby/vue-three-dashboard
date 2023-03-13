import { measureTextWidth, calcRemandWIdth } from '../utils/form';

const defaultArrayProps = {
    type: Array,
    default: () => ([])
}

export default {
    data() {
        return {
            /**
             * 表单项
             */
            params: {}
        }
    },
    props: {
        /**
         * 标签方向
         */
        labelPosition: {
            type: String,
            default: 'right'
        },
        /**
         * 表单配置项
         */
        formConfigs: defaultArrayProps
    },
    computed: {
        labelWidth() {
            return Math.max(
                ...this.formConfigs.map(
                    ({
                        label,
                        rules
                    }) => calcRemandWIdth(rules) + measureTextWidth(label)
                )
            );
        }
    },
    methods: {
        /**
         * 初始化表单默认值
         */
        setDefaultValue() {
            this.$nextTick(() => {
                let obj = {};
                this.formConfigs.forEach(item => item.key && (obj[item.key] = item.value));
                this.params = obj;
            })
        },
        
        /**
         * 修改表单默认值
         */
        setModifyValue({key, value}) {
            this.$nextTick(() => {
                this.params[key] = value;
            })
        }
    }
}