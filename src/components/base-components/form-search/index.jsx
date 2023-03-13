//Vue 提供了一个 h() 函数用于创建 vnodes虚拟dom
import { defineComponent, h, ref, reactive } from 'vue' 

export default defineComponent ({
    setup() {
        const expland = ref(true)
        const btnLoading = ref(false)

        function handClick() {
          alert(1);
        }
  
        return () =>
          h('div', {}, [
            'Some text comes first.',
            h(
              'h1',
              {
                class: 'scrollbar__thumb',
                onClick: handClick,
                style: {
                  fontSize: '30px',
                  color: 'blue',
                },
              },
              'A headline',
            ),
            // h(Child, {
            //   someProp: 'foobar',
            // }),
          ]);
      },
    })
    
    // methods: {
    //     /**
    //      * 初始化表单默认值
    //      */
    //     setDefaultValue() {
    //         this.$nextTick(() => {
    //             let obj = {};
    //             // this.formConfigs.forEach(item => item.key && (obj[item.key] = item.value));
    //             // this.params = obj;
    //         })
    //     },
    //     /**
    //      * 修改表单默认值
    //      */
    //     setModifyValue({key, value}) {
    //         this.$nextTick(() => {
    //             this.params[key] = value;
    //         })
    //     },
    //     search() {
    //         this.$refs.form.validate(valid => {
    //             if (!valid) return;
    //             this.$emit('search', {...this.params});
    //         });
    //     },
    //     /**
    //      * 重置
    //      */
    //     reset() {
    //         this.$nextTick(() => {
    //             this.$refs.form.resetFields();
    //             this.setDefaultValue();
    //             this.$nextTick(() => {
    //                 this.$emit("reset", { ...this.params });
    //             })
    //         });
    //     },
    //     /**
    //      * 展开收起事件
    //      */
    //     onExpland() {
    //         this.expland = !this.expland;
    //         this.$nextTick(() => {
    //             this.$emit('expland')
    //         });
    //     }
    // },
    // created() {
    //     this.setDefaultValue();
    // },
    // mounted() {
    //     this.$nextTick(() => {
    //         this.$emit('initParams', {...this.params});
    //     })
    // },

    // return () {
    //     h('div', 'props.msg + count.value')
    // }
    // render() {
    //     const {
    //         params,
    //         labelPosition,
    //         labelWidth,
    //         formConfigs: configs,
    //         expland
    //     } = this;
    //     const searchBtns = () => (
    //         <div class="search-operation">
    //             <div class="btn-group">
    //                 <el-button class="mgr-10" type="primary" loading={this.btnLoading} onClick={ this.search }>查询</el-button>
    //                 <el-button class="mgr-10" onClick={ this.reset }>重置</el-button>
    //                 {
    //                     configs.length < 4 ? null : (
    //                         <el-button type="text" onClick={ this.onExpland }>
    //                             <span>{ this.expland ? "收起" : "展开" }</span>
    //                             <el-icon type={`ios-arrow-${!this.expland ? 'down' : 'up'}`} />
    //                         </el-button>
    //                     )
    //                 }
    //             </div>
    //         </div>
    //     );
    //     return (
    //         <div class="form-search-jsx-render-contianer">
    //             <el-form
    //                 ref="form"
    //                 props={{
    //                     inline: true,
    //                     labelColon: true,
    //                     labelWidth,
    //                     labelPosition,
    //                     model: params
    //                 }}
    //             >
    //             {/* <el-row gutter={ 12 }>
    //                 {
    //                     ...configs.map((config, index) => {
    //                         const xxl = config?.xxlSpan || 6;
    //                         const xl = config?.xlSpan || 8;
    //                         const lg = config?.lgSpan || 12;
    //                         const md = config?.mdSpan || 12;
    //                         const sm = config?.smSpan || 12;
    //                         return (
    //                             (expland ? true : index < 3) ?
    //                             <el-col xxl={xxl} xl={xl} lg={lg} md={md} sm={sm} xs={24} key={config.key}>
    //                                 <el-form-item
    //                                     class="mgr-0 full-width"
    //                                     label={config.label}
    //                                     prop={config.prop}
    //                                     rules={config.rules}
    //                                 >
    //                                     <config.component
    //                                         class={["full-width", config.className]}
    //                                         on={config.on}
    //                                         attrs={config.attrs}
    //                                         style={config.style}
    //                                         props={config.props}
    //                                         maxlength={config.maxlength}
    //                                         domProps={config.domProps}
    //                                         nativeOn={config.nativeOn}
    //                                         key={config.key}
    //                                         vModel={this.params[config.key]}
    //                                     >
    //                                         {
    //                                             ...(config.children || []).map((child) => {
    //                                                 return child ? (
    //                                                     typeof child === 'string' ? child : (
    //                                                         <child.component
    //                                                             on={child.on}
    //                                                             attrs={child.attrs}
    //                                                             style={child.style}
    //                                                             props={child.props}
    //                                                             domProps={child.domProps}
    //                                                             value={child.value}
    //                                                             nativeOn={config.nativeOn}
    //                                                             class={child.className}>
    //                                                             {child.label}
    //                                                         </child.component>
    //                                                     )
    //                                                 ) : null
    //                                             })
    //                                         }
    //                                     </config.component>
    //                                 </el-form-item>
    //                             </el-col> : null
    //                         );
    //                     })
    //                 }
    //                 {searchBtns()}
    //             </el-row> */}
    //             </el-form>
    //         </div>
    //     )
// }
