declare interface SearchFormComponent {
    /**
     * 表单项
     */
    params: { [key: string]:any }
    /**
     * 搜索
     */
    search(): void;
    /**
     * 重置
     */
    reset(): void;
}