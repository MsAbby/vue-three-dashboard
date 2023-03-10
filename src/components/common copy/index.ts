import Vue from 'vue';

import searchForm from './searchForm/index.jsx.js';
import searchFormHoc from './searchForm/hoc.jsx.js';
import searchPage from './searchPage/index.jsx.js';
import searchPageHoc from './searchPage/hoc.jsx.js';
import modalForm from './modalForm/index.jsx.js';
import modalFormHoc from './modalForm/hoc.jsx.js';
import formConfigBuilder from './suger';


/**
 * 搜索表单组件
 */
const SearchForm = searchForm;
/**
 * 搜索表单高阶组件
 */
const SearchFormHoc = searchFormHoc;
/**
 * 搜索列表页面
 */
const SearchPage = searchPage;
/**
 * 搜索列表页面高阶组件
 */
const SearchPageHoc = searchPageHoc;
/**
 * 弹窗表单
 */
const ModalForm = modalForm;
/**
 * 弹窗表单高阶组件
 */
const ModalFormHoc = modalFormHoc;
/**
 * JSON 配置构建语法糖
 */
const FormConfigBuilder = formConfigBuilder;


const isVue = (vm: any) => {

    let isVue = false;

    if (!vm) return false;

    try {
        isVue = Object.prototype.hasOwnProperty.call(vm, '_isVue') &&
            Object.is(vm._isVue, true) &&
            Object.is(vm instanceof Vue, true)
    } catch (error) {
        console.error(error);
    }

    return isVue;
}

/**
 * 获取当前组件上下文
 * @param vm 当前组件上下文
 * @returns 
 */
export function getComponentContext<V>(vm: V) {
    if (!isVue(vm)) throw new TypeError(`${vm} is not a Vue`);
    return vm as V & Vue;
}

export {
    SearchForm,
    SearchPage,
    ModalForm,
    SearchFormHoc,
    SearchPageHoc,
    ModalFormHoc,
    FormConfigBuilder
};