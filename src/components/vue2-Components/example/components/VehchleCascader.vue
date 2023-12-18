<template>
    <div class="veh-cascader"  :class="searchText ? 'veh-cascader-search' : ''" :title="tooltip">
        <Cascader class="veh-content-cascader" :placeholder="placeholder" v-model="data" transfer :data="list" :load-data="loadData"></Cascader>
        <Button class="veh-conent-cascader-search" @click="$emit('search', data)" type="primary" v-if="searchText">{{ searchText }}</Button>
    </div>
</template>
<script>
import { fetchBrand, fetchVehicheModel, fetchVehicleSeries } from './api';
export default {
    name: 'VehchleCascader',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        value: {
            type: Array,
            default: () => []
        },
        searchText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            list: []
        }
    },
    computed: {
        tooltip() {
            console.log(this.data);
            return this.data.map(i => i.name).join(' / ')
        },
        data: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        async loadData(item, callback) {
            let pageData;
            const { brandId, id } = item.value;
            item.loading !== undefined && (item.loading = true);
            try {
                const { data } = !brandId ? await fetchVehicleSeries(id) :
                    await fetchVehicheModel(brandId, id);
                const children = !brandId ? { children: [], loading: false } : {};
                pageData = data.pageData || [];
                item.children = pageData.map(item => {
                    return {
                        label: item.name,
                        value: item,
                        ...children
                    }
                })
            } catch (error) {
                console.log(error)
            } finally {
                item.loading !== undefined && (item.loading = false);
                callback();
            }
        },
        async getBrands() {
            const response =  await fetchBrand();
            this.list =(response.data.pageData || []).map(i => ({ children: [], loading: false, label: i.name, value: i }));
        }
    },
    created() {
        this.getBrands()
    }
}
</script>
<style lang="less" scoped>
    .veh-cascader {
        display: flex;
        &.veh-cascader-search {
            ::v-deep .ivu-input {
                border-radius: 4px 0px 0px 4px;
            }
            ::v-deep .veh-conent-cascader-search {
                border-radius: 0px 4px 4px 0px;
            }
        }
        .veh-content-cascader {
            flex: 1;
            max-width: 800px;
        }
    }
</style>