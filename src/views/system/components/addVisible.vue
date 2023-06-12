<script  setup>
import { ref ,onMounted } from 'vue';
import {getListRoles} from '../../../api/system/role.js'
import {message} from 'ant-design-vue'
import {AddUser} from '../../../api/system/staff.js'
// 使用defineProps方法来接收props
const props = defineProps({
    Staff: {
        type: Boolean,
        default: false
    },
    currdId:{
        type:Number,
        default:null
    }
})
onMounted(() =>{
    getRuleListAPI()

})
// 表单数据
const formInfo=ref(null)
//  console.log(formData.value.roleId)
// 获取角色
const getRuleListAPI = async() => {
    const res = await getListRoles()
    // console.log(res)
    ruleList.value = res
    // console.log(ruleList.value);
}
const ruleList = ref([])
//  formData.value.roleName=result.map(e => {
//  return  e.roleName
//  });
//  console.log(formData.value.roleName)

// 子传父
const emit = defineEmits(["update:Staff",'addSuccess'])
const close = () => {

    // 子传父
    emit("update:Staff", false)
    formInfo.value.resetFields()
}
const onFinished = async(formData) => {
   await AddUser(formData)
   message.success("新增成功")
   close() // 关闭弹层
   emit("addSuccess")
//    formData.value=''
formData.value.name=''
formData.value.userName=''
formData.value.roleId=null
formData.value.roleName=''
formData.value.status=''
formData.value.phonenumber=''


}
const title=ref([''])
const formData=ref({
    name:'',//姓名
    userName:'',//账号
    roleId:null,//角色id
    roleName:'',//用户角色名称
    status:'',//状态
    phonenumber:''//联系方式
})
// const plainOptions = ['禁用', '启用'];
const createCreative=ref(null)
</script>
<template>
    <div ref="createCreative">
      <a-modal 
      @cancel="close"
      :visible="props.Staff" 
      :title="title" 
      :footer="null"
        style="width: 38%;"
        :getContainer="()=>createCreative"
        >
        <template>
            <span :v-if="currdId">{{title='编辑员工'}}</span>
        </template>
<a-form :model="formData"  @finish="onFinished" ref="formInfo" :label-col="{ span: 8}" layout="vertical" style="padding: 20px 80px 0px;">
    <a-form-item name="name"  label="员工姓名" 
     :rules="[{ required: true, message: '员工姓名不能为空', trigger: 'blur' }]">
        <a-input v-model:value="formData.name" placeholder="请填写员工姓名" >
    </a-input>
    </a-form-item>
    <a-form-item name="userName" label="登录账号"
    :rules="[{ required: true, message: '账号不能为空', trigger: 'blur' }]"
    >
        <a-input v-model:value="formData.userName" placeholder="请填写登录账号" >
    </a-input>
    </a-form-item>
    <a-form-item name="phonenumber" label="联系方式" 
        :rules="[{ required: true, message: '联系方式不能为空', trigger: 'blur' },
          { pattern: /^[1][3-9][0-9]{9}$/, message: '联系方式格式不对', trigger: 'blur' }]"
    >
        <a-input v-model:value="formData.phonenumber" placeholder="请填写联系方式">
        </a-input>
    </a-form-item>
    <a-form-item >
        <span>默认密码:123456</span>
    </a-form-item>
    <a-form-item name="roleId" label="分配角色" required>
        <a-select
      ref="select"
      v-model:value="formData.roleId"
      style="width:100%"
      placeholder="请选择分配角色"
      :options="ruleList"
      :field-names="{label:'roleName',value:'roleId'}"
    >
   
    </a-select>
    </a-form-item>
    <a-form-item name="status" label="员工状态" required >
    <!-- 放置员工状态按钮 -->
    <a-radio-group v-model:value="formData.status"  >
  <a-Radio :value='1'>启用</a-Radio>
  <a-Radio :value='0'>禁用</a-Radio>
    </a-radio-group>
    </a-form-item>
    <a-form-item >
    <a-row type="flex" justify="right">
    <a-space >
    <a-button style="border-radius: 5px;" html-type="submit" @click="close" >取消</a-button>
    <a-button type="primary" style="border-radius: 5px;" html-type="submit">确认</a-button>
</a-space>
</a-row>
</a-form-item>
</a-form>
      </a-modal>
    </div>
  </template>

  <style scoped less>
  :deep(.ant-modal-header){
    border-bottom: none;
  }
:deep(.ant-modal-body){
padding: 0px 0px 10px 0px ;
  }
:deep(.ant-row .ant-row-right){
   float: right
  }
</style>
  