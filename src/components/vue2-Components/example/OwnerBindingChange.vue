<template>
    <!-- 车主管理 -->
    <search-page
        :load-data="loadData"
        :page-struct="pageStruck"
        :form-configs="pageFormConfigs"
        :columns="dataListTableColumn">
    </search-page>
</template>
<script>
import { queryPageVehicleRelationChange } from './api';
import { SearchPage, FormConfigBuilder } from '@/components/configComponents';
import { cardMap, createSouceMap, handleResponse, modifyReasonMap, pageStruck } from './util';

const formatListItem = (item) => {
    const { certificateType, certificateNumber } = (item.certificateInfos || [])[0] || {};
    return {
        ...item,
        statusDesc: item.isValid ? '有效' : '无效',
        certificate_type: cardMap[certificateType],
        modifyReason: modifyReasonMap[item.operateType],
        createSourceLabel: createSouceMap[item.createSource],
        certificate_number: cardMap[certificateType] ? certificateNumber : null,
    }
}

/**
 * 搜索配置项
 */
function pageFormConfigs() {
    return [
        FormConfigBuilder.Input({ label: 'VIN', key: 'vin' }),
        FormConfigBuilder.Input({ label: '姓名', key: 'name' }),
        FormConfigBuilder.Input({ label: '证件号', key: 'certificateNumber' })
    ]
}
/**
 * 表格列配置项
 */
function  dataListTableColumn() {
    return [
        { title: '车辆VIN码', key: "vin" },
        { title: '品牌', tooltip: true, key: "brand" },
        { title: '车系', tooltip: true, key: "vehicleSeries" },
        { title: '车型', tooltip: true, key: "model" },
        { title: '姓名',tooltip:true, key: 'name' },
        { title: '证件类型',tooltip:true, key: 'certificate_type' },
        { title: '证件号',tooltip:true, key: 'certificate_number' },
        { title: '状态', key: 'statusDesc' },
        { title: '变更原因', key: 'modifyReason' },
        { title: '变更时间', key: 'operateTime', width: 185 }
    ]
}

export default {
    name: 'OwnerBindingChange',
    data: () => ({ pageStruck }),
    components: { SearchPage },
    computed: { pageFormConfigs, dataListTableColumn },
    methods: {
        async loadData(config) {
            config.ownerType = 1;
            const onfullfilled = handleResponse(formatListItem);
            return await queryPageVehicleRelationChange(config).then(onfullfilled);
        }
    }
}
</script>