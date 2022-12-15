<!--  -->
<template>
	<el-form
		ref="ruleFormRef"
		:model="ruleForm"
		:rules="rules"
		label-width="120px"
		class="demo-ruleForm"
	>
		<el-form-item label="账号" prop="username">
			<el-input v-model="ruleForm.username" type="text" autocomplete="off" />
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="loginFn()">登录</el-button>
			<el-button @click="registerFn()">注册</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, toRef, ref } from 'vue';

const validateUsername = (rule: unknown, value: string | undefined, callback: (msg?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePassword = (rule: unknown, value: string | undefined, callback: (msg?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const state = reactive({
	ruleForm: {
		username: '',
		password: '',
	},
	rules: {
		username: [{ validator: validateUsername, trigger: 'blur' }],
  	password: [{ validator: validatePassword, trigger: 'blur' }]
	}
});

// 不用toRef解构， 会失去响应式
let { ruleForm, rules } = toRef(state);

// 登录
const loginFn = () => {

}
// 注册
const registerFn = () => {

}

</script>

<style scoped></style>
