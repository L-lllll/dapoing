<script setup>
import useToken from '@/stores/token.js'
import { useRouter } from 'vue-router'; 
import {ref} from 'vue'
import {changePassword}from '@/api/login.js'
const router= useRouter()
// 指定modal挂载的节点
const createCreative = ref(null);
// 表单
const formDom = ref()
// 退出登录
const loginOut = () => {
  const {removeToken} = useToken()
  removeToken()
  router.push('/login')
}
// 修改密码表单
const resetForm = ref({
  oldPassword:'',
  newPassword:'',
  reNewPassword:''
})
// 自定义密码校验规则
const validateConfirmPassword = () => {
  return new Promise((resolve, reject) => {
    if (resetForm.value.newPassword !== resetForm.value.reNewPassword) {
      reject(new Error('两次输入的密码不一致'));
    } else {
      resolve();
    }
  });
};
// 修改密码校验
const passwordRules = ref({
  oldPassword:[{required:true,message:'旧密码不能为空',trigger:'blur'}],
  newPassword:[{required:true,message:'新密码不能为空',trigger:'blur'},
  {min:6,max:16,message:'新密码的长度为6到16位',trigger:'blur'}],
  reNewPassword:[{required:true,message:'重复密码不能为空',trigger:'blur'},
  { validator: validateConfirmPassword, trigger: 'blur' }]
})
let showDomal = ref(false)
// 修改密码弹窗显示
const changePasswordAPI = () => {
  showDomal.value = true
}
// 提交
const close = () => {
  formDom.value.resetFields()
}
//确认修改
const handleOk = async() => {
  const {oldPassword,newPassword} = resetForm.value
  await changePassword({oldPassword,newPassword})
  close()
  showDomal.value = false
}
</script>

<template>
  <div class="navbar">
    <a-button type="primary" ghost style="margin-right: 20px;">可视化大屏</a-button>
    <a-tooltip placement="bottom" trigger="click" color="#fff">
          <template #title >
            <div style="display: flex;flex-direction: column;">
              <span class="loginout" @click="loginOut">退出登录</span>
              <span class="loginout" style="border-bottom:none;" @click="changePasswordAPI">修改密码</span>
            </div>
          </template>
        <span style="font-weight: 700;">黑马管理员</span>
      </a-tooltip>
        <!-- 修改密码框 -->
        <div ref="createCreative">
          <a-modal 
          v-model:visible="showDomal" 
          :getContainer="() => createCreative"
          keyboard
          title="修改密码"
          ok-text="确认"
          cancel-text="取消"
          @ok="handleOk" 
          @cancel="close"
          style="width: 580px;
        ">
        <a-form ref="formDom" layout="vertical" :model="resetForm" :rules="passwordRules">
            <a-form-item label="旧密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" name="oldPassword">
              <a-input-password placeholder="请输入" style="width: 100%;" v-model:value="resetForm.oldPassword"></a-input-password>
            </a-form-item>
            <a-form-item label="新密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" name="newPassword">
              <a-input-password placeholder="请输入" style="width: 100%;" v-model:value="resetForm.newPassword"></a-input-password>
            </a-form-item>
            <a-form-item label="新密码" :label-col="{ span: 4 }" :wrapper-col="{ span: 24 }" name="reNewPassword">
              <a-input-password placeholder="请输入" style="width: 100%;" v-model:value="resetForm.reNewPassword"></a-input-password>
            </a-form-item>
          </a-form>
      </a-modal>
  </div>
  </div>
</template>

<style lang="less" scoped>
.navbar{
  text-align: end;
}
.loginout{
    display: inline-block;
    padding: 12px;
    cursor: pointer;
    color: #606266;
    border-bottom: 1px solid #e4e7ed;
}
:deep(.ant-modal-body) {
  padding: 20px 100px;
}
:deep(.ant-modal-content){
  border-radius: 8px;
}
:deep(.ant-modal-header) {
  height: 54px;
  border-radius: 8px 8px 0 0;
}
:deep(.ant-modal-title) {
  float: left; 
}
:deep(.ant-btn) {
  border-radius: 8px;
}
:deep(.ant-modal-footer) {
  background-color: #f4f6f8;
}
</style>