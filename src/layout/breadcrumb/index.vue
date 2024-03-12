<template>
	<div>
		<a-breadcrumb>
            <a-breadcrumb-item v-for="item in menuRouter" :key="item.path">
                <router-link :to="{ name: item.name }">{{ item.meta && item.meta.title }}</router-link>
            </a-breadcrumb-item>
		</a-breadcrumb>
	</div>
</template>
<script lang="ts" setup name="breadcrumb">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const menuRouter = computed(() => {
	return store.state.routes.routes;
});

const basePath = "/components/breadcrumb";
</script>
