const fontFamily = [
    'Helvetica Neue',
    'Helvetica',
    'PingFang SC',
    'Hiragino Sans GB',
    'Microsoft YaHei',
    '微软雅黑',
    'Arial',
    'sans-serif'
].join(',');

/**
 * 工具方法 - 测量文本内容
 * @param {String} label 
 * @param {Number} font : ;
 * @returns 
 */
export const measureTextWidth = (label, font = 14) => {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    context.font = `${font}px ${fontFamily}`;
    const { width } = context.measureText(label);
    canvas = null;
    context = null;
    return width;
}

/**
 * 计算文本之外的内容宽度
 * @param {Object} rules 
 * @returns 
 */
export const calcRemandWIdth = (rules) => {
    !rules && (rules = {});
    let width = 0;
    if (Array.isArray(rules)) {
        const required = rules.some(({
            required
        }) => required);
        required && (width = 12);
    } else {
        rules.required && (width = 12);
    }
    return width + 16;
}