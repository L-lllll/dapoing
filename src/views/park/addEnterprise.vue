<script setup>
import {ref,onMounted} from 'vue'
import {ArrowLeftOutlined,CheckCircleFilled,UploadOutlined} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'; 
import {message} from 'ant-design-vue';
import {updateFile,industry} from '@/api/enterPrise.js'
const router = useRouter()
// 返回
const goback = () => {
  router.go(-1)
}
const beforeUpload = (file) => {
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('上传文件大小不能超过 5MB!')
    return isLt5M
  }
}
const fileList = ref(null)
const updated = async(e) => {
    try{
    const file = e.file
    const formData = new FormData()
    formData.append('file', file.originFileObj, file.name);
    formData.append('type','contract')
    e.file.status = 'success'
    const res = await updateFile(formData)
    console.log(res)
  }catch(e){
    console.log(e)
  }
}
const industryList = ref(null)
//获取企业列表
const industryAPI = async() => {
  industryList.value = await industry()
  console.log(industryList.value)
}
// 提交表单
const formData = ref({
  name:'',
  legalPerson:'',
  registeredAddress:'',
  industryCode:'',
  businessLicenseUrl:'',
  businessLicenseId:'',
  contact:'',
  contactNumber:''
})

// 挂载调用
onMounted(() => {
  industryAPI()
})
</script>

<template>
    <a-layout>
    <a-layout-header style="background-color: #fff;padding: 0 20px;min-width: 1116px;">
      <span class="back" @click="goback">
        <arrow-left-outlined style="margin-right: 8px;"/>
        返回
      </span>
      <span style="font-size: 16px;color: #dcdfe5;margin: 0 10px;">|</span>
      <span style="font-size: 16px;">添加企业</span>
      <span style="float: right;font-size: 16px;">黑马管理员</span>
    </a-layout-header>
    <a-layout-content class="content">
      <div>
        <a-form>
        <div class="enterpriseInfo">
          <span class="title"><span class="side"></span>企业信息</span>
          <a-row >
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="企业名称" :label-col="{ span: 3 }">
                <a-input style="width: 80%;"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="法人" :label-col="{ span: 3 }">
                <a-input style="width: 80%;"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="注册地址" :label-col="{ span: 3 }">
                <a-input style="width: 80%;"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="所在行业" :label-col="{ span: 3 }">
                <a-select v-model:value="formData.industryCode" style="width: 80%;">
                  <a-select-option v-for="item in industryList" :key="item.industryCode">{{ item.industryName }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="所在行业" :label-col="{ span: 3 }">
                <div style="width:80%">
                  <a-upload 
                   v-model:file-list="fileList" 
                   :before-upload="beforeUpload"
                   @change="updated"
                   accept=".doc,.docx,.pdf"
                   >
                     <a-button type="primary" v-if="fileList === null">
                       <upload-outlined></upload-outlined>
                       上传文件
                     </a-button>
                     <a-tag color="green" style="font-size: 14px;padding: 4px 15px;" v-else><CheckCircleFilled/>已上传</a-tag>
                     <template #itemRender="{ file, actions }">
                       <a-space>
                         <span>{{ file.name }}</span>
                         <a href="javascript:;" @click="actions.download">下载</a>
                         <a href="javascript:;" @click="fileList = null">删除</a>
                       </a-space>
                     </template>
                   </a-upload>
                      <div>支持扩展名：.doc .docx .pdf, 文件大小不得超过5M</div>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </div>

        <div>
          <div class="enterpriseInfo">
          <span class="title"><span class="side"></span>联系人信息</span>
            <a-row>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="企业联系人:" :label-col="{ span: 3 }">
                  <a-input style="width: 80%;"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="联系电话:" :label-col="{ span: 3 }">
                  <a-input style="width: 80%;"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-form>
      </div>
    </a-layout-content>
    <a-layout-footer style="height: 80px;width: 100%;;position: fixed;bottom: 0;background-color: #fff;min-width: 1116px;">Footer</a-layout-footer>
  </a-layout>
</template>

<style lang="less" scoped>
:deep(.content){
  height: 793px;
  min-width: 1116px;
  padding: 20px 130px;
  .enterpriseInfo{
    background-color: #fff;
    margin-bottom: 20px;
    position: relative;
    padding: 60px 65px 24px;
    .title{
      font-size: 14px;
      font-weight: 500;
      position: absolute;
      top: 20px;
      left: 10px;
      .side{
        content: "";
        height: 80%;
        width: 2px;
        background-color: #4770ff;
        position: absolute;
        left: -10px;
        top: 2px;
      }
    }
  }
}
.back{
  width: 56px;
  font-size: 16px;
  cursor: pointer;
}
</style>