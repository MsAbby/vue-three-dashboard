
import { defineComponent, ref, reactive, onMounted, nextTick, h } from 'vue'
import './index.less'

export default defineComponent({
    props: {
        configForm: {
            type: Object,
            default: {},
        },
    },

    setup(props, context) {
        /******** data ********/
        const vData = ref({
            expland: true, // 展开/收起
            btnLoading: false,
        })

        const qData = reactive({
            params: {},
            formAttributes: {
                labelWidth: props.labelWidth || 120,
                inline: true,
                labelPosition: 'right'
            }
        })

        /******** mounted ********/
        onMounted(() => {
            // setDefaultValue();
            nextTick(() => {
                context.emit('initParams', { ...qData.params });
            })
        })

        /******** methods ********/
        const search = () => {
            form.value.validate(valid => {
                if (!valid) return;
                context.emit('search', { ...qData.params });
            });
        }

        // 重置
        const reset = () => {
            nextTick(() => {
                form.value.resetFields();
                setDefaultValue();
                nextTick(() => {
                    context.emit("reset", { ...qData.params });
                })
            });
        }

        // 展开收起事件
        const onExpland = () => {
            vData.expland = !vData.expland;
            nextTick(() => {
                emit('expland')
            });
        }

        const render = () => {
            return (
                <div class="form-search-jsx-render-contianer">
                    {/* 一个form表单, labelWidth: 标签的宽度 */}
                    <el-form
                        ref="form"
                        label-width={qData.formAttributes.abelWidth}
                        inline={qData.formAttributes.inline}
                        label-position={qData.formAttributes.labelPosition}
                        model={qData.params}
                    >
                    {/* 多行（包含不同的组件： configs中有不同类型的组件） */}
                    <el-row gutter={ 12 }>
                        {
                            props.configForm && props.configForm.map((list, index) => {
                                const xxl = list?.xxlSpan || 6;
                                const xl = list?.xlSpan || 8;
                                const lg = list?.lgSpan || 12;
                                const md = list?.mdSpan || 12;
                                const sm = list?.smSpan || 12;

                                const mm = h(list.component, {}, '111')
                                return (
                                    <el-col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} xs={24} key={list.key}>
                                        {/* 常规组件渲染 */}
                                        <el-form-item
                                            class="mgr-0 full-width"
                                            label={list.label}
                                            prop={list.prop}
                                            rules={list.rules}
                                        >
                                            <list.component
                                                class={["full-width", list.className]}
                                                on={list.on}
                                                attrs={list.attrs}
                                                style={list.style}
                                                props={list.props}
                                                maxlength={list.maxlength}
                                                domProps={list.domProps}
                                                nativeOn={list.nativeOn}
                                                key={list.key}
                                                vModel={qData.params[list.key]}
                                            >
                                                {
                                                    // select的options
                                                    ...(list.children || []).map((child) => {
                                                        return child ? (
                                                            typeof child === 'string' ? child : (
                                                                <child.component
                                                                    on={child.on}
                                                                    attrs={child.attrs}
                                                                    style={child.style}
                                                                    props={child.props}
                                                                    domProps={child.domProps}
                                                                    value={child.value}
                                                                    nativeOn={list.nativeOn}
                                                                    class={child.className}>
                                                                    {child.label}
                                                                </child.component>
                                                            )
                                                        ) : null
                                                    })
                                                }
                                            </list.component>
                                        </el-form-item>
                                    </el-col>
                                );
                            })
                        }
                    </el-row>
                    </el-form>
                </div>
            )
        }

        return render
    }
})







