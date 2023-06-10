<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'; 
import {login} from '../../api/login.js'
import useToken from '../../stores/token.js'
const router = useRouter() 
// 获取表单
const formDom = ref(null)
// 登录表单数据
const loginForm = ref({
  username:'',
  password:'',
})
// 是否保存账号密码
const isAgree = true
// 校验规则
const loginRules = ({
    username:[{required:true,message:'用户名不能为空',trigger:'blur'}],
    password:[{required:true,message:'密码不能为空',trigger:'blur'}],
})
// 点击登录
const onFinish = async(values) => {
  const {updateToken} = useToken()
  try{
    await formDom.value.validateFields()
    const res = await login(values)
    // 储存token\
    updateToken(res.token)
    router.push('/')
  }catch(err){ /* empty */ }
}
</script>
<template>
  <div class="body">
    <div class="loginBg"></div>
    <div class="loginForm">
      <h3 class="loginTitle">智慧园区-登录</h3>
      <a-card class="login-card">
         <a-form ref="formDom" layout="vertical" :model="loginForm" :rules="loginRules" @finish="onFinish" >
          <a-form-item label="账号" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" name="username">
            <a-input style="width: 100%;" v-model:value="loginForm.username"></a-input>
          </a-form-item>
          <a-form-item label="密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" name="password">
            <a-input-password style="width: 100%;" v-model:value="loginForm.password"></a-input-password>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-model:checked="isAgree">记住我</a-checkbox>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="width: 100%;border-radius: 4px;" html-type="submit">登录</a-button>
          </a-form-item>
         </a-form>
         <p style="color: red;">仅用于IT培训教学使用,为保障您的个人信息安全,请勿向平台录入任何个人敏感信息（如手机号、身份证号等）！</p>
      </a-card>
    </div>
  </div>
</template>

<style lang="less">
.body {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .loginBg {
    // flex: 3;
    height: 100%;
    width: 60%;
    background: rgba(38, 72, 176) url(../../assets/common/login-bg-e4ea539c.svg) no-repeat center / cover;
    border-top-right-radius: 45px;
    background-position: right top;
    // padding: 0 100px;
  }
  .loginForm {
    margin: 200px 10% 0;
    flex: 1;
    .ant-card {
      width: 100%;
      border: none;
      padding: 0;
      .ant-card-body{
        padding: 0;
      }
    }
    .loginTitle{
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
  }
}
.ant-form-item-label > label {
  font-size: 16px;
  color: #8b929d;
}
</style>