import { Form, Row, Col, FormItem, Button, Icon } from 'view-design';
import formMixin from '../mixins/formMixin';

import './index.scss';

export default {
    name: 'FormSearch',
    mixins: [ formMixin ],
    data() {
        return {
            expland: true,
            btnLoading: false
        }
    },
    methods: {
        search() {
            this.$refs.form.validate(valid => {
                if (!valid) return;
                this.$emit('search', {...this.params});
            });
        },
        /**
         * 重置
         */
        reset() {
            this.$nextTick(() => {
                this.$refs.form.resetFields();
                this.setDefaultValue();
                this.$nextTick(() => {
                    this.$emit("reset", { ...this.params });
                })
            });
        },
        /**
         * 展开收起事件
         */
        onExpland() {
            this.expland = !this.expland;
            this.$nextTick(() => {
                this.$emit('expland')
            });
        }
    },
    created() {
        this.setDefaultValue();
    },
    mounted() {
        this.$nextTick(() => {
            this.$emit('initParams', {...this.params});
        })
    },
    render() {
        const {
            params,
            labelPosition,
            labelWidth,
            formConfigs: configs,
            expland
        } = this;
        const searchBtns = () => (
            <div class="search-operation">
                <div class="btn-group">
                    <Button class="mgr-10" type="primary" loading={this.btnLoading} onClick={ this.search }>查询</Button>
                    <Button class="mgr-10" onClick={ this.reset }>重置</Button>
                    {
                        configs.length < 4 ? null : (
                            <Button type="text" onClick={ this.onExpland }>
                                <span>{ this.expland ? "收起" : "展开" }</span>
                                <Icon type={`ios-arrow-${!this.expland ? 'down' : 'up'}`} />
                            </Button>
                        )
                    }
                </div>
            </div>
        );
        return (
            <div class="form-search-jsx-render-contianer">
                <Form
                    ref="form"
                    props={{
                        inline: true,
                        labelColon: true,
                        labelWidth,
                        labelPosition,
                        model: params
                    }}
                >
                <Row gutter={ 12 }>
                    {
                        ...configs.map((config, index) => {
                            const xxl = config?.xxlSpan || 6;
                            const xl = config?.xlSpan || 8;
                            const lg = config?.lgSpan || 12;
                            const md = config?.mdSpan || 12;
                            const sm = config?.smSpan || 12;
                            return (
                                (expland ? true : index < 3) ?
                                <Col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} xs={24} key={config.key}>
                                    <FormItem
                                        class="mgr-0 full-width"
                                        label={config.label}
                                        prop={config.prop}
                                        rules={config.rules}
                                    >
                                        <config.component
                                            class={["full-width", config.className]}
                                            on={config.on}
                                            attrs={config.attrs}
                                            style={config.style}
                                            props={config.props}
                                            maxlength={config.maxlength}
                                            domProps={config.domProps}
                                            nativeOn={config.nativeOn}
                                            key={config.key}
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
                                </Col> : null
                            );
                        })
                    }
                    {searchBtns()}
                </Row>
                </Form>
            </div>
        )
    }
}
