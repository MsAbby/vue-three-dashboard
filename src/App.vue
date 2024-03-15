<template>
	<div class="app-content" id="add">
		<a-config-provider :theme="theme">
			<router-view></router-view>
		</a-config-provider>
	</div>
</template>

<script lang="ts" setup>
import { reactive, toRef, ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();

const theme = {
	token: {
		colorPrimary: "#CE0D2D",
	}
};
onMounted(() => {
	store.dispatch("routes/setAllRoutes");
});
</script>

<style lang="less" scoped>
.app-content {
	width: 100vw;
	height: 100vh;
}
</style>
