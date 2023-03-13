import * as request from '@/helper/api/axios'


const urls = {
    queryPageUserWithVehicles: '/v1.0/vehicle-user-service/vehicle-user/queryPageUserWithVehicles',
    queryPageUserVehicles: '/v1.0/vehicle-user-service/vehicle-user/queryPageUserVehicles',
    queryPageVehicleRelationChange: '/v1.0/vehicle-user-service/vehicle-user/PageVehicleRelationChange'
}

/**
 * 根据车辆信息查询用户
 */
export function queryPageUserWithVehicles(data) {
    return request.baseGateway({
        url: urls.queryPageUserWithVehicles,
        method: "POST",
        data
    })
}

/**
 * 人车绑定关系
 */
export function queryPageUserVehicles(data) {
    return request.baseGateway({
        url: urls.queryPageUserVehicles,
        method: "POST",
        data
    })
}

/**
 * 车辆绑定变更记录
 */
export function queryPageVehicleRelationChange(data) {
    return request.baseGateway({
        url: urls.queryPageVehicleRelationChange,
        method: "POST",
        data
    })
}