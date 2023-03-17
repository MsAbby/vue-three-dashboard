export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        visiable: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        },
    },
    watch: {
        visiable(visiable) {
            !visiable && this.$emit('input', visiable);
        }
    },
}