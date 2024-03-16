<template>
	<div class="app-content" id="add">
		<a-config-provider :theme="theme">
			<router-view></router-view>
		</a-config-provider>
	</div>
</template>

<script lang="ts" setup name="App">

/**
 * @description: antd-design全局主题色修改
 */
const theme = {
	token: {
		colorPrimary: "#CE0D2D",
	}
};
</script>

<style lang="less">
#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
.app-content {
	width: 100vw;
	height: 100vh;
}
</style>
