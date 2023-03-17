<template>
    <!-- 车主管理 -->
    <search-page
        :load-data="loadData"
        :page-struct="pageStruck"
        :form-configs="pageFormConfigs"
        :columns="dataListTableColumn">
        <template slot="ownVehicles" slot-scope="{row: {ownVehicles, gwId}}">
            <router-link :to="{path: '/ownerBindingQuery', query: { gwId, ownVehicles }}">{{ownVehicles}}</router-link>
        </template>
    </search-page>
</template>
<script>
import { queryPageUserWithVehicles } from './api';
import { SearchPage, FormConfigBuilder } from '@/components/configComponents';
import { cardMap, createSouceMap, formatTime, validator3LimitMonth, pageStruck, handleResponse } from './util';

const formatListItem = (item) => {
    const { certificateType, certificateNumber } = (item.certificateInfos || [])[0] || {};
    return {
        ...item,
        certificate_type: cardMap[certificateType],
        certificate_number: cardMap[certificateType] ? certificateNumber : null,
        createSourceLabel: createSouceMap[item.createSource]
    }
}

/**
 * 搜索配置项
 */
function pageFormConfigs() {
    return [
        FormConfigBuilder.Input({
            label: '车主姓名',
            key: 'name'
        }),
        FormConfigBuilder.Input({
            label: '证件号',
            key: 'certificateNumber'
        }),
        FormConfigBuilder.DatePicker({
            label: '创建时间',
            key: 'createTime',
            prop: 'createTime',
            rules: { validator: validator3LimitMonth },
            value: [new Date(Date.now() - 7 * 3600 * 24 * 1000), new Date()],
            props: { type: 'datetimerange', format: 'yyyy-MM-dd HH:mm:ss' }
        })
    ]
}
/**
 * 表格列配置项
 */
function  dataListTableColumn() {
    return [
        { title: 'GWID_ID',tooltip:true, key: 'gwId' },
        { title: '车主姓名',tooltip:true, key: 'name' },
        { title: '证件类型',tooltip:true, key: 'certificate_type' },
        { title: '证件号',tooltip:true, key: 'certificate_number' },
        { title: '拥有车辆数', slot: 'ownVehicles', width: 150 },
        { title: '创建时间', key: 'createAt', width: 185 },
        { title: '创建来源', key: 'createSourceLabel', width: 190 }
    ]
}

export default {
    name: 'OwnerManagement',
    data: () => ({ pageStruck }),
    components: { SearchPage },
    computed: { pageFormConfigs, dataListTableColumn },
    methods: {
        async loadData(config) {
            config.userStatus = 1;
            const [startTime, endTime] = config.createTime || [];
            startTime && (config.startTime = formatTime(startTime));
            endTime && (config.endTime = formatTime(endTime));
            delete config.createTime;
            const onfullfilled = handleResponse(formatListItem);
            return await queryPageUserWithVehicles(config).then(onfullfilled);
        }
    }
}
</script>