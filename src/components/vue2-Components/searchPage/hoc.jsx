import SearchFormHoc from '../searchForm/hoc';
import SearchPage from './index';

export default function searchPageHoc(customComponents = {}) {
    return {
        mixins: [SearchPage],
        components: {
            SearchForm: SearchFormHoc(customComponents)
        }
    }
}