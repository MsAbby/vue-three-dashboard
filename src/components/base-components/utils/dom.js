import Vue from "vue";

const getPageHeight = () => {
    return window.innerHeight - 175
}
const getBodyWidth = () => {
    return window.innerWidth;
}
/**
 * 监听resize的工具方法 用来设置高度
 */
export const resizer = new Vue({
    data() {
        return {
            bodyWidth: getBodyWidth(),
            pageHeight: getPageHeight()
        }
    },
    methods: {
        setWidth() {
            this.bodyWidth = window.innerWidth;
        },
        setPageHeight() {
            this.pageHeight = getPageHeight();
        }
    }
});

window.addEventListener('resize', function () {
    resizer.setWidth();
    resizer.setPageHeight();
});


/**
 * 获取css3样式前缀
 * @returns 
 */
export const prefix = function () {
    const div = document.createElement('div');
    const cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
    div.style.cssText = cssText;
    const style = div.style;
    if (style.webkitTransition) return '-webkit-';
    if (style.MozTransition) return '-moz-';
    if (style.oTransition) return '-o-';
    if (style.msTransition) return '-ms-';
    return '';
};