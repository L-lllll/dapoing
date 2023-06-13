<script setup>
import {ref,onMounted,computed } from 'vue'
import {ArrowLeftOutlined,CheckCircleFilled,UploadOutlined} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'; 
import {message} from 'ant-design-vue';
import {updateFile,industry,addeEterprise,eterpriseInfo,changeEterprise,downloadInfo} from '@/api/enterPrise.js'
import FileSaver from 'file-saver'
const router = useRouter()
// 返回
const goback = () => {
  router.go(-1)
}
const title = computed(() => {
  if (type.value === 'watch') {
        return '查看企业'
    } else if (type.value === 'change') {
        return '编辑企业'
    } else {
        return '添加企业'
  }
})
const beforeUpload = (file) => {
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('上传文件大小不能超过 5MB!')
    return isLt5M
  }
}
const fileList = ref(null)
// 提交表单
let formData = ref({
  name:'',
  legalPerson:'',
  registeredAddress:'',
  industryCode:undefined,
  businessLicenseUrl:'',
  businessLicenseId:'',
  contact:'',
  contactNumber:''
})
const updated = async(e) => {
    try{
    const file = e.file
    const formdata = new FormData()
    formdata.append('file', file.originFileObj, file.name)
    formdata.append('type','businessLicense')
    e.file.status = 'success'
    const res = await updateFile(formdata)
    console.log(res)
    formData.value.businessLicenseUrl = res.url
    formData.value.businessLicenseId = res.id
  }catch(e){
    console.log(e)
  }
}
const industryList = ref(null)
//获取企业列表
const industryAPI = async() => {
  industryList.value = await industry()
}
// 表单校验
const formDataRules = ref({
  name:[{required:true,message:'必填项，内容不能为空',trigger:'blur'}],
  legalPerson:[{required:true,message:'必填项，内容不能为空',trigger:'blur'}],
  registeredAddress:[{required:true,message:'必填项，内容不能为空',trigger:'blur'}],
  businessLicenseUrl:[{required:true,message:'必填项，内容不能为空',trigger:'blur'}],
  industryCode:[{required:true,message:'必填项，内容不能为空',trigger:'blur'}],
  contact:[{required:true,message:'必填项，内容不能为空',trigger:'blur'}],
  contactNumber:[{required:true,message:'必填项，内容不能为空',trigger:'blur'}]
})
// 获取表单Dom
const formDom = ref(null)
// 重置表单
const btnCancel = () => {
  formDom.value.resetFields()
  formData.value = ({
    name:'',
    legalPerson:'',
    registeredAddress:'',
    industryCode:undefined,
    businessLicenseUrl:'',
    businessLicenseId:'',
    contact:'',
    contactNumber:''
  })
  fileList.value = null
}
const btnOk = async() => {
  if(type.value === 'change') {
    try{
      await changeEterprise(formData.value)
      message.success('编辑成功')
      goback()
    }catch(e) {
      message.error(e.message)
      // console.dir(e)
    }
  }else{
    await addeEterprise(formData.value)
    message.success('公司新增成功')
    goback()
  }
}
// 查看跳转区域
const watchId = ref(router.currentRoute.value.query.id)
const type = ref(router.currentRoute.value.query.type)
// 获取企业信息
const eterpriseInfoAPI = async() => {
  if(type.value === 'watch') {
    formData.value = await eterpriseInfo(router.currentRoute.value.query.id)
  }else {
    const res = await eterpriseInfo(router.currentRoute.value.query.id)
    console.log(res)
    formData.value.name = res.name
    formData.value.legalPerson = res.legalPerson
    formData.value.registeredAddress = res.registeredAddress
    formData.value.industryCode = res.industryCode
    formData.value.businessLicenseUrl = res.businessLicenseUrl
    formData.value.businessLicenseId = res.businessLicenseId
    formData.value.contact = res.contact
    formData.value.contactNumber = res.contactNumber
    formData.value.id = watchId
    // fileList.value = res.businessLicenseName
  }
}
// 租赁记录
const columns = ref([
{
  title:'序号',
  key: 'number',
},{
  title: '租赁楼宇',
  dataIndex: 'name',
  key: 'name',
},
{
  title: '合同状态',
  dataIndex: 'status',
  key: 'status',
},
{
  title: '租赁起止时间',
  dataIndex: 'time',
  key: 'time',
},
{
  title: '租赁合同',
  dataIndex: 'contractName',
  key: 'contractName',
  width:'20%'
},
{
  title: '录入时间',
  dataIndex: 'createTime',
  key: 'createTime',
},
{
  title: '操作',
  dataIndex: 'action',
  key: 'action',
},
])
// 下载导出
const downloadInfoAPI = async(id,name) => {
  // console.log(id)
  const data = await downloadInfo(id)
  FileSaver.saveAs(data, name)
}

// 挂载调用
onMounted(() => {
  industryAPI()
  if(watchId.value) {
    eterpriseInfoAPI()
  }
  
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
      <span style="font-size: 16px;">{{ title }}</span>
      <span style="float: right;font-size: 16px;">黑马管理员</span>
    </a-layout-header>
    <a-layout-content class="content">
      <div>
        <a-form :model="formData" :rules="formDataRules" ref="formDom">
          <!-- 企业信息 -->
        <div class="enterpriseInfo">
          <span class="title"><span class="side"></span>企业信息</span>
          <a-row >
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="企业名称" :label-col="{ span: 4 }" name="name">
                <a-input v-if="type !== 'watch'" style="width: 80%;" v-model:value="formData.name" placeholder="请输入企业名称"></a-input>
                <span v-else style="margin-left: 10px;">{{ formData.name }}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="法人" :label-col="{ span: 4 }" name="legalPerson">
                <a-input v-if="type !== 'watch'" style="width: 80%;" v-model:value="formData.legalPerson" placeholder="请输入法人"></a-input>
                <span v-else style="margin-left: 10px;">{{ formData.legalPerson }}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="注册地址" :label-col="{ span: 4 }" name="registeredAddress">
                <a-input v-if="type !== 'watch'" style="width: 80%;" v-model:value="formData.registeredAddress" placeholder="请输入注册地址"></a-input>
                <span v-else style="margin-left: 10px;">{{ formData.registeredAddress }}</span>
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="所在行业" :label-col="{ span: 4 }" name="industryCode">
                <a-select v-if="type !== 'watch'" v-model:value="formData.industryCode" style="width: 80%;" placeholder="请选择所在行业">
                  <a-select-option v-for="item in industryList" :key="item.industryCode">{{ item.industryName }}</a-select-option>
                </a-select>
                <span v-else style="margin-left: 10px;">{{ formData.industryName }}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="营业执照" :label-col="{ span: 4 }" name="businessLicenseUrl">
                <div style="width:80%" >
                  <a-upload 
                  v-if="type !== 'watch'"
                   v-model:file-list="fileList" 
                   action=""
                   :before-upload="beforeUpload"
                   @change="updated"
                   accept=".png,.jpg,.jpeg"
                   >
                     <a-button type="primary" v-if="fileList === null">
                       <upload-outlined></upload-outlined>
                       上传文件
                     </a-button>
                     <a-tag color="green" style="font-size: 14px;padding: 4px 15px;" v-else><CheckCircleFilled/>已上传</a-tag>
                     <template #itemRender="{ file}">
                       <a-space>
                         <span>{{ file.name }}</span>
                         <a href="javascript:;">下载</a>
                         <a href="javascript:;" @click="fileList = null">删除</a>
                       </a-space>
                     </template>
                   </a-upload>
                   <img v-if="fileList === null || style !== change" :src="formData.businessLicenseUrl" style="max-width:250px;margin-left: 10px;" alt="">
                      <div style="color: #00000073;margin-top: 8px;">支持扩展名：.png,.jpg,.jpeg, 文件大小不得超过5M</div>
                </div>
                
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <!-- 联系人信息 -->
          <div class="enterpriseInfo">
          <span class="title"><span class="side"></span>联系人信息</span>
            <a-row>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="企业联系人:" :label-col="{ span: 4 }" name="contact">
                  <a-input v-if="type !== 'watch'" style="width: 80%;" v-model:value="formData.contact"></a-input>
                  <span v-else style="margin-left: 10px;">{{ formData.contact }}</span>
                </a-form-item>
              </a-col>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="联系电话:" :label-col="{ span: 4 }" name="contactNumber">
                  <a-input v-if="type !== 'watch'" style="width: 80%;" v-model:value="formData.contactNumber"></a-input>
                  <span v-else style="margin-left: 10px;">{{ formData.contactNumber }}</span>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <!-- 租赁记录 -->
          <div class="enterpriseInfo" v-if="type === 'watch'">
          <span class="title"><span class="side"></span>租赁记录</span>
          <a-table :columns="columns" :data-source="formData.rent" :pagination="false">
        
            <template #bodyCell="{ column,record,index }">
              <template v-if="column.key === 'number'">
                <span>
                  {{ index + 1 }}
                </span>
              </template>
              <template v-if="column.key === 'status'">
                <a-tag v-if="record.status === 0" color="blue">待生效</a-tag>
                <a-tag v-if="record.status === 1" color="green">生效中</a-tag>
                <a-tag v-if="record.status === 2" color="red">已到期</a-tag>
                <a-tag v-if="record.status === 3">已退租</a-tag>
              </template>
              <template v-if="column.key === 'time'">
                <span>
                  {{ record.startTime }}到{{ record.endTime }}
                </span>
              </template>
              <template v-if="column.key === 'contractName'">
                <a :href="record.contractUrl">{{ record.contractName }}</a>
              </template>
              <template v-if="column.key === 'action'">
                <a @click="downloadInfoAPI(record.id,record.contractName)">合同下载</a>
              </template>
            </template>
          </a-table>
          </div>
      </a-form>
      </div>
    </a-layout-content>
    <a-layout-footer v-if="type !== 'watch'" style="text-align: center;height: 80px;width: 100%;;position: fixed;bottom: 0;background-color: #fff;min-width: 1116px;">
      <a-button style="margin-right: 20px;border-radius: 4px;" :disabled="type ? true : false" @click="btnCancel">重置</a-button>
      <a-button type="primary" style="border-radius: 4px;" @click="btnOk">确定</a-button>
    </a-layout-footer>
    <div style="height: 160px;width: 100%;"></div>
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
:deep(.ant-table-cell){
  padding: 8px !important;
}
</style>