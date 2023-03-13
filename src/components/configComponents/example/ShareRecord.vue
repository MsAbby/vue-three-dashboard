<template>
    <div class="detail-wrapper">
        <div style="overflow:hidden;">
            <div style="float:left;">
                <Breadcrumb>
                    <BreadcrumbItem>车主车辆绑定查询</BreadcrumbItem>
                    <BreadcrumbItem>分享记录</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div style="float:right;">
                <Button @click="$emit('back')" >返回</Button>
            </div>
        </div>
        <SearchPage
            style="margin-top: 25px"
            :form-configs="formConfigs"
            :load-data="loadData" 
            :columns="tableColumns"
            :pageStruct="pageStruct"
            :deviation="55">
            <template slot="operate">
                <Button type="primary" icon="md-add">批量删除</Button>
            </template>
        </SearchPage>
    </div>
</template>
<script>
import VehchleCascader from './components/VehchleCascader.vue';
import { SearchPageHoc, FormConfigBuilder } from '@/components/configComponents';

export default {
    props: {

    },
    data() {
        return {
            formConfigs: [
                FormConfigBuilder.Input({label: '车主 GWM ID', key: 'gwmId'}),
                FormConfigBuilder.Input({label: '车主名称', key: 'name'}),
                FormConfigBuilder.Input({label: '车辆VIN码', key: 'vin'}),
                FormConfigBuilder.Cascader({ label: '车型', key: 'vehModels' })
            ],
            tableColumns: [
                {
                    width: 66,
                    align: 'center',
                    type: 'selection'
                },
                {
                    title: '被分享者名称',
                    key: 'nickName'
                },
                {
                    title: '被分享者名称',
                    key: 'nickName'
                },
                {
                    title: '被分享 GWM ID',
                    key: 'gwmId'
                },
                {
                    title: '创建分享时间',
                    key: 'createTime'
                },
                {
                    title: '分享时间段',
                    key: 'timeRange'
                },
                {
                    title: '分享功能列表',
                    key: 'functons'
                },
                {
                    title: '更新分享时间',
                    key: 'functons'
                },
                {
                    title: '更新分享时间',
                    key: 'functons'
                },
                {
                    title: '取消分享时间',
                    key: 'functons'
                },
                {
                    title: '分享状态',
                    key: 'functons'
                }
            ]
        }
    },
    methods: {
        loadData(config) {
            console.log(config)
        }
    },
    components: {
        SearchPage: SearchPageHoc({
            Cascader: VehchleCascader
        })
    }
}
</script>
<style lang="scss" scoped>
    .text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .detail-wrapper {
       ::v-deep .ivu-table-wrapper {
           margin: 0;
       }
    }
    .mgn-tp-24 {
        margin-top: 24px;
    }
</style>