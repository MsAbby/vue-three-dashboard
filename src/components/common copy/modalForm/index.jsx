import { Modal, Button, Form, Spin, Row, Col, FormItem, Tooltip, Input } from 'view-design';
import formMixin from '../mixins/formMixin';
import modalMixin from '../mixins/modalMixin';

import './index.scss';

/**
 * 表单单双列切换阈值
 */
const FILED_LIMIT = 4;
/**
 * 单列
 */
const SINGLE_ROW = 24;
/**
 * 双列
 */
const DOUBLE_ROW = 12;
/**
 * 单列宽度
 */
const SMALL_FORM_WIDTH = 400;
/**
 * 双列宽度
 */
const LARGE_FORM_WIDTH = 800;


export default {
    name: 'FormModal',
    mixins: [formMixin, modalMixin],
    props: {
        beforeValidate: {
            type: Function,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {}
        },
        afterValidate: {
            type: Function,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {}
        },
        validate: {
            type: Boolean,
            default: true
        },
        colType: {
            type: [String],
            default: ''
        },
        width: {
            type: [String, Number],
            default: 0
        },
        /**
         * 加载数据
         */
        loadData: {
            type: [Function,String,Object],
            required: false
        },
        /**
         * 加载数据完成
         */
        afterLoad:{
            type: Function,
            default: (v) => v
        },
        /**
         * 提交之前
         */
        beforeSubmit:{
            type: Function,
            default:  (v) => v
        },
        /**
         * 提交表单时触发的事件
         */
        submitAction: {
            type: Function,
            default: () => Promise.resolve(true)
        },
        afterClose: {
            type: Function,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {}
        },
        /**
         * 标题
         */
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            /**
             * 按钮显示状态
             */
            loading: {
                spin: false,
                button: false
            },
            contentShow: false
        }
    },
    computed: {
        /**
         * 表单控件数量
         */
        len() {
            return this.formConfigs.length;
        },
        /**
         * 弹窗宽度
         */
        formWidth() {
            if (this.width) return this.width;
            if (this.colType) {
                if (this.colType === 'small') return  SMALL_FORM_WIDTH;
                if (this.colType === 'large') return LARGE_FORM_WIDTH;
            }
            return this.len > FILED_LIMIT ? LARGE_FORM_WIDTH : SMALL_FORM_WIDTH;
        },
        /**
         * 单双列
         */
        formSpan() {
            return this.len > FILED_LIMIT ? DOUBLE_ROW : SINGLE_ROW;
        }
    },
    methods: {
        async initData() {
            if (typeof this.loadData === 'function') {
                try {
                    this.loading.spin = true;
                    const { data } = await this.loadData(this.params) || {};
                    this.params = {
                        ...this.params,
                        ...(this.afterLoad(data) || {})
                    };
                } catch (error) {
                    console.warn(error);
                } finally {
                    this.loading.spin = false;
                }
            }else{
                this.params = this.loadData
            }
        },
        close() {
            this.visiable = false;
            this.$nextTick(() => {
                this.afterClose();
            })
            return true;
        },
        cancel() {
            this.close();
        },
        async submit() {
            try {
                if (this.validate) {
                    this.beforeValidate();
                    console.log('params', this.params)
                    this.$refs.form.validate(x => {
                        console.log(x)
                    })
                    const valid = await this.$refs.form.validate(v => v);
                    this.afterValidate();
                    if (!valid) return;
                    this.loading.button = true;
                    const params = this.beforeSubmit({ ...this.params });
                    Object.is(await this.submitAction(params), true) && this.close();
                } else {
                    this.close();
                }
            } catch (reason) {
                console.warn(reason);
            } finally {
                this.loading.button = false;
            }
        }
    },
    watch: {
        visiable(visiable) {
            if (visiable === false) {
                setTimeout(() => {
                    this.params = {};
                    this.close();
                    this.contentShow = visiable;
                    this.$refs?.form?.resetFields();
                }, 350);
            } else {
                this.setDefaultValue();
                this.initData();
                this.$nextTick(() => {
                    this.contentShow = visiable;
                    this.$nextTick(() => {
                        this.$refs?.form?.resetFields();
                    })
                })
            }
        },
        params: {
            handler(value) {
                this.$emit('getParams', value)
            },
            deep: true
        }
    },
    render() {
        return (
            <Modal ref="modal" value={this.visiable} onInput={(v) => this.visiable = v} title={this.title} width={ this.formWidth }>
                {
                    this.contentShow ? 
                        <Form
                            class="form-modal-jsx-content"
                            ref="form"
                            props={{
                                inline: true,
                                model: this.params,
                                labelPosition: this.labelPosition,
                                labelColon: this.labelColon,
                                labelWidth: this.labelWidth}}>
                                {this.loading.spin ? <Spin size="large" fix></Spin> : null}
                                <Row gutter={12}>
                                    {
                                        ...this.formConfigs.map(config => {
                                            let text;
                                            if (config.onlyText) {
                                                text = config.textFilter(this.params[config.key]);
                                            }
                                            return (
                                                config.hidden === false ? 
                                                <Col span={config.span ? config.span : this.formSpan} key={config.key}>
                                                    { config.onlyText && (
                                                        <FormItem class="mgr-0 full-width" label={config.label} prop={config.prop} rules={config.rules}>
                                                            {
                                                                (text === undefined || text === null || text === '') ?
                                                                    <Input disabled class="full-width only-text" value={ text }></Input> :
                                                                    <Tooltip class="full-width" content="content" transfer>
                                                                        <Input class="only-text full-width" disabled value={ text }></Input>
                                                                        <span slot="content" style="white-space:normal;word-break:break-all">{ text }</span>
                                                                    </Tooltip>
                                                            }
                                                        </FormItem>
                                                    ) }
                                                    <FormItem class="mgr-0 full-width" style={ config.onlyText ? 'display:none;' : null } label={config.label} prop={config.prop} rules={config.rules}>
                                                        <config.component
                                                            class={["full-width", config.className]}
                                                            on={config.on}
                                                            attrs={config.attrs}
                                                            style={config.style}
                                                            props={config.props}
                                                            domProps={config.domProps}
                                                            nativeOn={config.nativeOn}
                                                            vModel={this.params[config.key]}
                                                        >
                                                            {
                                                                ...(config.children || []).map((child) => {
                                                                    return child ? (
                                                                        typeof child === 'string' ? child : (
                                                                            <child.component
                                                                                on={child.on}
                                                                                attrs={child.attrs}
                                                                                style={child.style}
                                                                                props={child.props}
                                                                                domProps={child.domProps}
                                                                                value={child.value}
                                                                                nativeOn={config.nativeOn}
                                                                                class={child.className}>
                                                                                {child.label}
                                                                            </child.component>
                                                                        )
                                                                    ) : null
                                                                })
                                                            }
                                                        </config.component>
                                                    </FormItem>
                                                </Col>
                                                : null
                                            )
                                        })
                                    }
                                </Row>
                                { ...(this.$slots.default || []) }
                        </Form> : null
                }

                <div slot="footer">
                    <Button onClick={this.cancel}>取消</Button>
                    <Button type="primary" onClick={this.submit} loading={this.loading.button}>确定</Button>
                </div>
            </Modal>
        )
    }
};