import modalForm from './index';

export default function modalFormHoc({ ...customComponents }) {
    return {
        mixins: [modalForm],
        name: 'ModalFormHoc',
        components: {
            ...customComponents
        }
    }
}
