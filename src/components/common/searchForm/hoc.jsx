import FormSearch from './index';

export default function fromSearchHoc({ ...customComponents }) {
    return {
        mixins: [FormSearch],
        name: 'FormSearchHoc',
        components: {
            ...customComponents
        }
    }
}
