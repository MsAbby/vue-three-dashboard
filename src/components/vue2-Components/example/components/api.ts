import * as request from '@/helper/api/axios'

const urls = {
    brand: '/v1.0/brand',
    vehicleSeries: '/v1.0/vehicle-series',
    vehicleModel: '/v1.0/vehicle-model'
}

/***
 * 获取车辆品牌
 */
export function fetchBrand() {
    return request.baseGateway({
        method: 'GET',
        url: urls.brand,
        params: {
            pageNum: 1,
            pageSize: 9999
        }
    })
}

/**
 * 获取车系
 * @param brandId 
 * @returns 
 */
export function fetchVehicleSeries(brandId) {
    return request.baseGateway({
        method: 'GET',
        url: urls.vehicleSeries,
        params: {
            brandId,
            pageIndex: 1,
            pageSize: 9999
        }
    })
}

/**
 * 获取车型
 * @param brandId 品牌ID 
 * @param seriesId 车系ID
 * @returns 
 */
export function fetchVehicheModel(brandId, seriesId) {
    return request.baseGateway({
        method: 'GET',
        url: urls.vehicleModel,
        params: {
            seriesId,
            brandId,
            pageIndex: 1,
            pageSize: 9999
        }
    })
}
