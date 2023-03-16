<template>
  <Btn></Btn>
</template>

<script lang='ts' setup>
import { reactive, toRef, ref, nextTick, onMounted, h} from 'vue'

const form = ref(null)
const emit = defineEmits(['search', 'reset', 'expland', 'initParams'])

/******** data ********/
const vData = ref({
    expland: true, // 展开/收起
    btnLoading: false,
})

const qData = reactive({
    params: {}
})

/******** mounted ********/
onMounted(() => {
    setDefaultValue();
    nextTick(() => {
        emit('initParams', {...qData.params});
    })
})

/******** methods ********/
const search = () => {
    form.value.validate(valid => {
        if (!valid) return;
        emit('search', {...qData.params});
    });
}

// 重置
const reset = () => {
    nextTick(() => {
        form.value.resetFields();
        setDefaultValue();
        nextTick(() => {
            emit("reset", { ...qData.params });
        })
    });
}

// 展开收起事件
const onExpland = () => {
    vData.expland = !vData.expland;
    nextTick(() => {
        emit('expland')
    });
}

// render
const Btn = (props: Props, ctx: any) => {
    return h('div', {
        class: 'p-2.5 text-white bg-green-500 rounded shadow-lg w-20 text-center inline m-1',
    }, '111')
}
</script>

<style lang='less' scoped>
</style>
