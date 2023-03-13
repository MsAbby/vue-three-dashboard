<template>
    <!-- 车主管理 -->
    <div>
        <search-page
            ref="page"
            v-show="!showDetail"
            :load-data="loadData"
            :page-struct="pageStruck"
            :form-configs="pageFormConfigs"
            :columns="dataListTableColumn">
            <template slot="shareRecord">
                <a href="javascript:void(0);" @click="showDetail = true">查看详情</a>
            </template>
        </search-page>
        <ShareRecord v-if="showDetail"></ShareRecord>
    </div>
</template>
<script>
import { queryPageUserVehicles } from './api';
import { SearchPage, FormConfigBuilder } from '@/components/configComponents';
import { cardMap, handleResponse, pageStruck } from './util';
import ShareRecord from './ShareRecord.vue';

const formatListItem = (item) => {
    const { certificateType, certificateNumber } = (item.certificateInfos || [])[0] || {};
    return {
        ...item,
        certificate_type: cardMap[certificateType],
        certificate_number: cardMap[certificateType] ? certificateNumber : null
    }
}

/**
 * 搜索配置项
 */
function pageFormConfigs() {
    return [
        FormConfigBuilder.Input({ label: 'GWM ID', key: 'gwId' }),
        FormConfigBuilder.Input({ label: '车辆VIN码', key: 'vin' }),
        FormConfigBuilder.Input({ label: '车主名称', key: 'name' }),
        FormConfigBuilder.Input({ label: '证件号', key: 'certificateNumber' })
    ]
}

/**
 * 表格列配置项
 */
function  dataListTableColumn() {
    return [
        { title: 'GWID_ID', key: 'gwId' },
        { title: '车辆VIN码', key: 'vin', width: 180, align: 'center' },
        { title: '品牌', tooltip:true, key: 'brand' },
        { title: '车系', tooltip:true, key: 'vehicleSeries' },
        { title: '车型', tooltip:true, key: 'model' },
        { title: '车主名称', key: 'name' },
        { title: '证件类型', key: 'certificate_type' },
        { title: '证件号', key: 'certificate_number' },
        { title: '更新时间', key: 'modifiedAt', width: 185 },
        { title: '分享记录', slot: 'shareRecord', align: 'center', width: 185 },
    ]
}

export default {
    name: 'OwnerBindingQuery',
    components: { SearchPage, ShareRecord },
    mounted() { this.setGwmId() },
    watch: { $route() { this.setGwmId() } },
    data: () => ({ pageStruck, gwId: undefined, showDetail: false }),
    computed: { pageFormConfigs, dataListTableColumn },
    methods: {
        setGwmId() {
            const gwId = this.$route.query.gwId;
            this.$nextTick(() => {
                gwId !== undefined && (() => {
                    const oldId = this.gwId;
                    this.$refs.page.setParams({ gwId });
                    this.$nextTick(() => {
                        oldId !== gwId && this.$refs.page.refresh(true);
                    })
                })();
            });
        },
        async loadData(config) {
            config.userStatus = 1;
            const onfullfilled = handleResponse(formatListItem);
            return await queryPageUserVehicles(config).then(onfullfilled);
        }
    }
}
</script>