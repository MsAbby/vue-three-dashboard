<template>
	<div class="flex-x-between layout_header">
		<!-- 左 -->
		<div class="flex-x-start header_left">
			<img src="@/assets/image/layout/logo.png" class="left-logo" />
			<span class="left-title">后台管理应用平台</span>
		</div>
		<!-- 右 -->
		<div class="header_right flex-x-start">
			<div class="header_desc">
				<div>
					<RadarChartOutlined style="margin-right: 2px;"/>
					<span style="font-size: 14px; color: rgba(0, 0, 0, 0.85)">中文</span>
				</div>
			</div>

			<a-tooltip
				placement="bottomRight"
				color="#ffffff"
				overlayClassName="layout-header-tooltip"
			>
				<div class="header_avatar">
					<a-avatar style="background-color: #317bff;">
						<span>名字</span>
					</a-avatar>
				</div>
				<template #title>
					<div class="layout-header-top flex-x-start">
						<div class="layout-header-top-circle">
							名字
						</div>
						<div>
							<div class="layout-header-top-dept">我是部门科室</div>
							<div>名字</div>
						</div>
					</div>
					<div class="layout-tooltip-content">
						<div class="flex-x-between margin-b-24">
							<span>工号</span>
							<span>xx123456789</span>
						</div>
						<div class="flex-x-between margin-b-24">
							<span>手机号</span>
							<span>18122343402</span>
						</div>
						<div class="flex-x-between margin-b-16">
							<span>邮箱</span>
							<span>xx123456789@sina.com</span>
						</div>
					</div>
					<div class="layout-tooltip-footer flex-x-between padding-b-16">
						<span class="modify">修改个人信息</span>
						<span class="logout">退出登录</span>
					</div>
				</template>
			</a-tooltip>
		</div>
	</div>
</template>
<script lang="ts" setup name="Header">
import { RadarChartOutlined } from '@ant-design/icons-vue';
import { reactive, toRef, ref, defineProps } from "vue";
import { mapState, useStore } from "vuex";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

const props = defineProps({
	collapsed: Boolean,
});

// 退出登录
const logout = () => {
	console.log("1111111");
};
</script>
<style lang="less" scoped>
.layout_header {
	height: 62px;
	background: #ffffff;
	padding: 0 22px;

	.header_left {
		flex-grow: 1;
		.left-logo {
			height: 35px;
		}
		.left-title {
			font-size: 22px;
			color: #ce0d2d;
			font-weight: bold;
			margin-right: 8px;
		}
		& .group__tabs {
			width: 500px;
			margin-left: 22px;
			margin-right: 22px;
			flex-grow: 1;
		}
	}

	.header_right {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		flex-grow: 0;
		.right_img {
			width: 100%;
			height: 40px;
		}
		.header_avatar {
			display: flex;
			align-items: center;
			padding: 0 12px;
			cursor: pointer;
		}
	}
}
</style>
<style lang="less">
.layout__header {
	& .header__left {
		& .ant-tabs-bar {
			margin: 0;
			border: none;
		}
	}
}
.layout-header-tooltip {
	&.ant-tooltip {
		max-width: 600px;
		.ant-tooltip-inner {
			padding: 0;
		}
		.layout-header-top {
			width: 300px;
			height: 110px;
			position: relative;
			background: url("@/assets/image/layout/header.jpg") top center no-repeat;
			background-size: 100%;
			color: rgba(0,0, 0, 0.85);
			.layout-header-top-circle {
				width: 50px;
				height: 50px;
				border-radius: 100%;
				border: 2px solid #ffffff;
				background: rgb(98, 203, 98);
				text-align: center;
				line-height: 50px;
				color: #ffffff;
				margin: 0 16px;
			}
			.layout-header-top-dept {
				font-size: 16px;
				font-weight: 600;
			}
		}
		.layout-tooltip-content {
			color: rgba(0, 0, 0, 0.85);
			padding: 16px;
		}
		.layout-tooltip-footer {
			color: rgba(0, 0, 0, 0.85);
			span {
				flex: 1;
				text-align: center;
				&:first-child {
					color: rgb(68, 148, 233);
				}
			}
		}
	}
}
</style>
