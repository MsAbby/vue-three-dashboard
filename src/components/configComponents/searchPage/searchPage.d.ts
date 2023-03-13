declare type SearchPageComponent = CTableComponent & {
    /**
     * 刷新页面；start为true 时从第一页请求数据
     */
    refresh(start: boolean);
    /**
     * 更新参数值
     */
    setParams(params: { [key: string]: any });
};