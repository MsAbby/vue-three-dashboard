import { getComponentContext, FormConfigBuilder } from '@/components/configComponents';

interface ExampleComponent {
    edit: boolean;
    $page: SearchPageComponent;
}
/**
 * 1. 禁止使用 箭头函数 否者将导致上下文丢失
 * 2. 挂载到 computed 属性上将会绑定this为当前实例
 * 3. 建议使用 interface来声明 当前组件
 */
export function exampleForSearch() {
    /**
     * 将 ExampleComponent 接口于 Vue接口进行联合
     */
    const vm = getComponentContext<ExampleComponent>(this);
    return [
        FormConfigBuilder.Input({
            key: 'vin',
            label: '车架号',
            hidden: false,
            props: {
                /**
                 * 使用c omputed 时 vm.edit 将会进行依赖收集
                 * 例如当 vm.edit 属性发生变化后将会最终触发当前组件的渲染Watcher进行更新
                 * 从而使当前Input组件重新渲染，而不用手动更新
                 */
                disabled: vm.edit,
                clearable: false
            },
            on: {
                change(val) {
                    (vm.$page as any).params.realVin = val;
                    vm.$nextTick(() => {
                        vm.$Message.success('修改成功')
                    })
                }
            }
        }),
        FormConfigBuilder.Custom({
            component: 'ABC',
            key: 'abc',
            props: {
                ok: '123'
            },
            on: {
                change(val) {
                    (vm.$page as any).params.abc = val;
                }
            },
            rules: {
                required: true,
                message: 'abc 为必填项',
                trigger: 'change'
            }
        })
    ]
}
