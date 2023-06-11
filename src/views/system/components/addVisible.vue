<script  setup>
import { ref } from 'vue';
// 使用defineProps方法来接收props
const props = defineProps({
    Staff: {
        type: Boolean,
        default: false
    }
})
const formData=ref({
    name:'',//姓名
    userName:'',//账号
    roleId:'',//角色id
    roleName:'',//用户角色名称
    status:'',//状态
    phonenumber:''//联系方式
})
const plainOptions = ['禁用', '启用'];
const createCreative=ref(null)
</script>
<template>
    <div ref="createCreative">
      <a-modal 
      :visible="props.Staff" 
      title="添加员工" 
      :footer="null"
        style="width: 38%;"
        :getContainer="()=>createCreative"
        >
<a-form :model="formData"  :label-col="{ span: 8}" layout="vertical" style="padding: 20px 80px 0px;">
    <a-form-item name="name" required label="员工姓名"  >
        <a-input v-model="formData.name" placeholder="请填写员工姓名" size="mini"></a-input>
    </a-form-item>
    <a-form-item name="userName" required label="登录账号">
        <a-input v-model="formData.userName" placeholder="请填写登录账号"></a-input>
    </a-form-item>
    <a-form-item name="phonenumber" label="联系方式" required>
        <a-input v-model="formData.phonenumber" placeholder="请填写联系方式"></a-input>
    </a-form-item>
    <a-form-item >
        <span>默认密码:123456</span>
    </a-form-item>
    <a-form-item name="roleName" label="分配角色" required >
        <a-input v-model="formData.roleName"></a-input>
    </a-form-item>
    <a-form-item name="status" label="员工状态" required >
    <!-- 放置员工状态按钮 -->
    <a-radio-group v-model:value="formData.status" :options="plainOptions" />
    </a-form-item>
    <a-form-item >
    <a-row type="flex" justify="right">
    <a-space >
    <a-button style="border-radius: 5px;" html-type="submit">取消</a-button>
    <a-button type="primary" style="border-radius: 5px;" @click="close">确认</a-button>
</a-space>
</a-row>
</a-form-item>
</a-form>
      </a-modal>
    </div>
  </template>

  <style scoped less>
:deep(.ant-modal-body){
padding: none;
  }
:deep(.ant-modal-header){
    border-bottom: none;
  }
</style>
  