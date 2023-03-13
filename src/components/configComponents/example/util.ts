/**
 * 时间格式化
 */
export const formatTime = (date) => {
    const yyyy = date.getFullYear();
    const prefix = (n) => +n < 10 ? `0${n}` : n;
    const MM = prefix(date.getMonth() + 1);
    const dd = prefix(date.getDate());
    const hh = prefix(date.getHours());
    const mm = prefix(date.getMinutes());
    const ss = prefix(date.getSeconds());
    return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
}

/**
 * 证件类型映射
 */
export const cardMap = Object.freeze({
    0: '身份证',
    1: '企业代码证',
    2: '其他',
    3: '营业执照'
});
/**
 * 创建来源映射
 */
export const createSouceMap = Object.freeze({
    1: 'vms实销同步',
    2: '运营平台录入新购车辆',
    3: '运营平台录入变更车主',
    4: '运营平台录入新增用户',
    5: 'C端用户注册'
});

export const modifyReasonMap = Object.create({
    VCD_SYNC_OWNER: '车辆中心同步车主信息',
    VEHICLE_SHARING: '车主授权车辆使用',
    CANCEL_VEHICLE_SHARING: '车主取消授权车辆使用',
    MODIFY_VEHICLE_SHARING: '车主修改车辆授权信息',
    VEHICLE_RETURN: '车主退车',
    CHANGE_VEHICLE_OWNER: '更换车辆车主'
});

export function validator3LimitMonth(rule, value: Array<any>, callback) {
    let [start, end] = value || [];
    if (start && end) {
        [start, end] = value.map(val => val.getTime());
        const times = 3600 * 1000 * 24 * 92;
        end - start <= times && callback();
    } else {
        return callback(new Error('最大可选时间范围为3个月'))
    }
}

export const pageStruck = Object.freeze({
    current: 'pageIndex',
    total: 'total',
    pageSize: 'pageNumber',
    data: 'list'
});

export function handleResponse(callbabck) {
    return function (response) {
        response &&
            response.data &&
            response.data.list &&
            (response.data.list = response.data.list.map(callbabck));
        return response;
    }
}