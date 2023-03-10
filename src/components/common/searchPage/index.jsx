import { Tooltip, Button, Dropdown, Icon, DropdownMenu, DropdownItem, Checkbox } from 'view-design';
import SearchForm from "../searchForm/index.jsx";
import CTable from "../../CTable.vue";
import { resizer, prefix } from "../utils/dom";

import './index.scss';

const tableSizes = () => ([
    { label: '默认',  value: 'default' },
    { label: '宽松',  value: 'large' },
    { label: '紧凑',  value: 'small' },
]);

const renderSearchForm = (h, vm) => (
  <div ref="search">
    <search-form
      ref="searchComp"
      formConfigs={vm.formConfigs}
      onReset={vm.reset}
      onSearch={vm.search}
      onExpland={vm.setHeight}
      onInitParams={vm.initParams}
    />
  </div>
);

const renderOperate = (h, vm) => (
    <div class="operate-wrapper" ref="title">
        {/* 用户操作域插槽 */}
        <div class="user-operate">{ ...(vm.$slots.operate || []) }</div>
        {/* 表格操作域 */}
        {
            vm.showDefaultOperate ?
                <div class="table-operate">
                    {/* 刷新 */}
                    <Tooltip content="刷新" style="margin-left: 10px">
                        <Button onClick={ vm.pageRefresh }>
                            <Icon class="icon-refresh" style={vm.iconRefreshStyle} type="md-refresh"/>
                        </Button>
                    </Tooltip>
                    {/* 密度 */}
                    <Dropdown
                        trigger="click"
                        style="margin-left: 10px"
                        on={{ 'on-click': (size) => vm.tableSize = size }}>
                        <Tooltip content="密度" placement="top">
                            <Button><Icon type="md-list" /></Button>
                        </Tooltip>
                        <DropdownMenu slot="list">
                            {
                                ...vm.tableSizes.map(item => {
                                    return (
                                        <DropdownItem
                                            key={ item.label }
                                            name={ item.value }
                                            selected={ vm.tableSize === item.value }>
                                            { item.label }
                                        </DropdownItem>
                                    )
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>
                    {/* 列设置 */}
                    <Dropdown trigger="click" placement="left-start">
                        <Tooltip content="列设置" placement="top" style="margin-left: 10px">
                            <Button><Icon type="md-options" /></Button>
                        </Tooltip>
                        <DropdownMenu slot="list">
                            <div class="col-show-head">
                                <Checkbox value={vm.checkAll} onInput={(v) => vm.checkAll = v}>列展示</Checkbox>
                            </div>
                            <div class="col-show-body">
                                <div style="border: 1px solid #fff"></div>
                                {
                                    ...vm.filters.map((item, index) => {
                                        return (
                                            <div
                                                draggable={true}
                                                data-index={index}
                                                onDragover={vm.dragover}
                                                onDragstart={vm.dragstart}
                                                onDragend={vm.dragend}
                                                key={item.label}
                                                class={[ 'check-item', {'check-item-drag-over': (vm.dragOverIndex === index) && vm.draging }]}
                                                style={item.fixed ? 'display:none;': null}>
                                                <Checkbox
                                                    value={item.value}
                                                    onInput={e => item.value = e}
                                                    label={item.label}>
                                                    {item.label}
                                                </Checkbox>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                </div> :
                <div class="table-operate"></div>
        }

    </div>
)

export default {
    props: {
        /**
         * 默认操作项开关
         */
        showDefaultOperate: {
            type: Boolean,
            default: true
        },
        /**
         * 表格分页数
         */
        pageSizeOpts: {
            type: Array,
            default: () => ([10,20,50,100,200])
        },
        /**
         * 是否立即加载数据
         */
        immediate: {
            type: Boolean,
            default: true
        },
        /**
         * 请求数据的方法 返回一个 Promise
         */
        loadData: {
            type: Function,
            require: true
        },
        /**
         * 搜素域表单
         */
        formConfigs: {
            type: Array,
            require: true
        },
        /**
         * 表格列数据
         */
        columns: {
            type: Array,
            require: true
        },
        /**
         * 是否开启自适应高度 开启此选项 height 属性将失效
         */
        autoHeight: {
            type: Boolean,
            default: true
        },
        /**
         * 表格高度
         */
        height: {
            type: Number,
            default: 500
        },
        /**
         * 请求数据结构体
         */
        pageStruct: {
            type: Object
        },
        /**
         * 高度误差
         */
        deviation: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            filters: [],
            searchHeight: 0,
            paramsIsInited: false,
            params: {},
            iconRefreshRotate: 0,
            tableSize: 'default',
            dragTargetIndex: null,
            dragOverIndex: null,
            draging: false
        }
    },
    components: {
        SearchForm,
        CTable,
    },
    mounted() {
        this.setHeight();
        this.$nextTick(this.setFilters)
    },
    methods: {
        /**
         * 初始化表单参数
         */
        initParams(params) {
            this.params = params;
            this.$nextTick(() => {
                this.paramsIsInited = true;
            });
        },
        /**
         * 交换数组元素位置 
         */
        swrapPosition(target) {
            const { dragTargetIndex, dragOverIndex } = this;
            const [ item ] = target.splice(dragTargetIndex, 1);
            target.splice(dragOverIndex, 0, item);
        },
        /**
         * 拖拽经过当前节点
         */
        dragover(ev) {
            if (!ev.target.hasAttribute('draggable')) return;
            const index = Number(ev.target.dataset.index);
            if (this.dragOverIndex === index) return;
            this.dragOverIndex = index;
        },
        /**
         * 拖拽开始 
         */
        dragstart(ev) {
            this.draging = true;
            const index = Number(ev.target.dataset.index);
            this.dragTargetIndex = index;
        },
        /**
         * 拖拽结束
         */
        dragend() {
            if (this.dragTargetIndex !== this.dragOverIndex) {
                this.swrapPosition(this.columns);
                this.swrapPosition(this.filters);
            }
            this.draging = false;
            this.dragTargetIndex = null;
            this.dragOverIndex = null;
        },
        /**
         * 设置列刷选
         */
        setFilters() {
            this.filters = this.columns
                .map(({title, fixed}) => ({label: title, value: true, fixed}))
        },
        /**
         * 刷新页面
         */
        pageRefresh() {
            if (this.$refs.table.loading) return; 
            this.iconRefreshRotate += 360;
            this.$refs.table.refresh(true);
        },
        /**
         * 搜索
         */
        search(params) {
            this.$refs.searchComp.btnLoading = true;
            this.params = params;
            this.refresh(true);
        },
        /**
         * 刷新
         */
        refresh(start) {
            this.$nextTick(() => {
                this.$refs.table.refresh(start).finally(() => {
                    this.$refs.searchComp.btnLoading = false;
                });
            })
        },
        /**
         * 重置
         * 查询条件清空且表格刷新回到初始
         */
        reset(params) {
            this.params = params;
            this.refresh(true);
        },
        /**
         * 设置高度
         */
        setHeight() {
            this.autoHeight && this.$nextTick(() => {
                const title = 48;
                if (this.$refs.search) {
                    this.searchHeight = this.$refs.search.offsetHeight + 45 + title;
                }
            })
        },
        setParams(params) {
            Object.keys(params).forEach(key => this.$refs.searchComp.params[key] = params[key]);
            this.params = this.$refs.searchComp.params;
        }
    },
    computed: {
        /**
         * 表格尺寸对象
         */
        tableSizes: tableSizes,
        /**
         * 刷新按钮旋转角度
         */
        iconRefreshStyle() {
            return `${prefix()}transform: rotate(${this.iconRefreshRotate}deg);`
        },
        /**
         * 页面高度
         */
        pageHeight() {
            return resizer.pageHeight
        },
        /**
         * 表格高度
         */
        tableHeight() {
            return this.autoHeight ? this.pageHeight - this.searchHeight - this.deviation : this.height;
        },
        /**
         * 页面宽度
         */
        bodyWidth() {
            return resizer.bodyWidth
        },
        /**
         * 是否全选列
         */
        checkAll: {
            get() {
                let all = true;
                this.filters.forEach(item => !item.fixed && all && (all = item.value));
                return all
            },
            set(newValue) {
                 this.filters.forEach(item => !item.fixed && (item.value = newValue));
            }
        },
        /**
         * 列选项map { label: 列名, value: true/false }
         */
        filterMap() {
            let o = {};
            this.filters.forEach(f => {
                o[f.label] = f.value;
            });
            return o;
        },
        /**
         * 条件筛选列
         */
        filterColumns() {
            return this.columns.filter(({title}) => this.filterMap[title]);
        }
    },
    render(h) {

        const scopedSlots = this.columns.reduce((prev, {slot}) => {
            slot && (prev[slot] = (props) =>  this.$scopedSlots[slot](props));
            return prev;
        }, {});

        return (
            <div class="search-page-custom-jsx-style">
                {/* 搜索域 */}
                { renderSearchForm(h, this) }
                {/* 操作域 */}
                { renderOperate(h, this) }
                {
                    this.paramsIsInited ? (
                        <c-table
                            onOn-select={ (...args) => this.$emit('on-select', ...args) }
                            onOn-selectt-all={ (...args) => this.$emit('on-selectt-all', ...args) }
                            onOn-selection-change={ (...args) => this.$emit('on-selection-change', ...args) }
                            ref="table"
                            {...{ scopedSlots }}
                            props={{
                                size: this.tableSize,
                                params: this.params,
                                loadData: this.loadData,
                                height: this.tableHeight,
                                immediate: this.immediate,
                                pageStruct: this.pageStruct,
                                columns: this.filterColumns,
                                pageSizeOpts: this.pageSizeOpts}}>
                        </c-table>
                    ) : null
                }
            </div>
        );
    },
};


