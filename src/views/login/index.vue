<!--  -->
<template>
	<div class="login">
		<div class="login-container">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
				<el-form-item prop="username">
					<el-input v-model="ruleForm.username" type="text" autocomplete="off" placeholder="请输入用户名"/>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="请输入密码" minlength="200"/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handelLogin()">登录</el-button>
					<el-button @click="registerFn()">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts" setup>
/*
** reactive:  只能 给对象、数组添加响应式
**      ref:  给值类型添加响应式
**    toRef:  针对一个响应式对象（reactive 封装）的 prop（属性）创建一个ref
*/
import { reactive, toRef, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

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
let ruleForm = toRef(state, 'ruleForm')
let rules = toRef(state, 'rules')
// 获取el-form 对象
let ruleFormRef = ref()

/*
** 1. 校验规则
** 2.
*/
const handelLogin = () => {
	// ruleFormRef.value.validate().then(() => {
	// 	console.log('校验通过')
	// }).catch(() => {
	// 	console.log('校验不通过')
	// })
	store.dispatch('routes/setAllRoutes');
	router.push('/welcome')
}
// 注册
const registerFn = () => {

}
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
