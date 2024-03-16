<!--  -->
<template>
	<div class="login">
		<div class="login-container">
			<a-form
				name="basic"
				autocomplete="off"
				:model="formState"
				:label-col="{ span: 8 }"
				:wrapper-col="{ span: 16 }"
				:rules="rules"
			>
				<a-form-item
					label="用户名"
					name="username"
				>
					<a-input v-model:value="formState.username" />
				</a-form-item>

				<a-form-item
					label="密码"
					name="password"
				>
					<a-input-password v-model:value="formState.password" />
				</a-form-item>

				<a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
					<a-checkbox
						v-model:checked="formState.remember"
					>
						记住密码
					</a-checkbox>
				</a-form-item>

				<a-form-item :wrapper-col="{ offset: 8, span: 16 }">
					<a-button type="primary" html-type="submit" @click="handelLogin">登录</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script lang="ts" setup>
/*
 ** reactive:  只能 给对象、数组添加响应式
 **      ref:  给值类型添加响应式
 **    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
 */
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from 'axios';
import { useRouterStore } from "../../store/router";

const router = useRouter();
const store = useStore();

// 1. interface
interface FormState {
	username: string;
	password: string;
	remember: boolean;
	rules: array<any>;
}

//  2. rules
const validateUsername = (
	rule: unknown,
	value: string | undefined,
	callback: (msg?: Error) => void
) => {
	if (value === "") {
		callback(new Error("请输入用户名"));
	} else {
		callback();
	}
};
const validatePassword = (
	rule: unknown,
	value: string | undefined,
	callback: (msg?: Error) => void
) => {
	if (value === "") {
		callback(new Error("请输入密码"));
	} else {
		callback();
	}
};

// 3. data
const formState = reactive<FormState>({
	username: "",
	password: "",
	remember: true,
	rules: {
		username: [{ validator: validateUsername, trigger: "blur" }],
		password: [{ validator: validatePassword, trigger: "blur" }],
	},
});

// 4. methods
// 登录时存储菜单信息
const handelLogin = () => {
	store.dispatch("routes/setAllRoutes");
	router.push("/welcome");
};
// 注册
const registerFn = () => {};


</script>

<style scoped>
.login {
	background: rgb(0, 106, 255);
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login-container {
	width: 600px;
	display: flex;
	height: 300px;
	background: #fff;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
}
</style>
