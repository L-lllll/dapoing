<script setup>
import {ref,onMounted} from 'vue'
import {getEnterpriseList,getRentList,getBulidingList,updateFile,addContract,delEnterprise,delRent,rentingInterface} from '@/api/enterPrise.js'
import { UploadOutlined,CheckCircleFilled} from '@ant-design/icons-vue';
import {Modal,message} from 'ant-design-vue'
import dayjs from 'dayjs';
import { useRouter } from 'vue-router'; 
const router = useRouter()
// 渲染列表
const enterpriseList = ref(null)
// 总计
const total = ref(0)
// 展示合同租赁表单
const showDomal = ref(false)
// 指定modal挂载的节点
const createCreative = ref(null)

const list = ref({
  name:'',
  page:1,
  pageSize:10
})
// 获取企业列表请求
const getEnterpriseListAPI = async() => {
  const res = await getEnterpriseList(list.value)
  total.value = res.total
  enterpriseList.value = res.rows
}
// 子表单控制展开单行
// 获取租赁列表
const innerData = ref([])
const getRentListAPI = async(id) => {
  innerData.value = await getRentList(id)
}
const expandedRowKeys = ref([]);
const getSonTable = (expanded, record) => {
      // 只展开一行
      if (expandedRowKeys.value.length > 0) { 
       //进这个判断说明当前已经有展开的了
       //返回某个指定的字符串值在字符串中首次出现的位置，下标为0
        let index = expandedRowKeys.value.indexOf(record.id);
        if (index > -1) { //如果出现则截取这个id,1d到1相当于0，针对重复点击一个
          expandedRowKeys.value.splice(index, 1)
        } else {
        //如果没出现则截取所有id,添加点击id，0到1，针对已经有一个展开，点另一个会进入判断
        modalList.value.enterpriseId=record.id
        // console.log(record)
          getRentListAPI(record.id)
          expandedRowKeys.value.splice(0, expandedRowKeys.value.length);
          expandedRowKeys.value.push(record.id)
        }
      } else {
        // console.log(record)
        modalList.value.enterpriseId=record.id
        getRentListAPI(record.id)
        //数组长度小于0，说明都没展开，第一次点击，id添加到数组，数组有谁的id谁就展开
        expandedRowKeys.value.push(record.id);  
      }
}
const innerColumns = [{
  title:'租赁楼宇',
  dataIndex: 'buildingName', 
  width:'25%',
  key: 'buildingName', 
  fixed: true
},
{
  title:'租赁起止时间',
  dataIndex: 'time', 
  width:'25%',
  key: 'time', 
},
{
  title:'合同状态',
  dataIndex: 'status', 
  width:'25%',
  key: 'status', 
},
{
  title:'操作',
  dataIndex: 'action', 
  width:'25%',
  key: 'action', 
}]
// 父表格专用区
const columns = [{
  title: '序号',
  key:'number',
  width:'10%',
  fixed: true,
}, {
  title: '企业名称',
  dataIndex: 'name',
  width:'25%',
  key: 'name',
}, {
  title: '联系人',
  dataIndex: 'contact',
  width:'17%',
  key: 'contact',
}, {
  title: '联系电话',
  dataIndex: 'contactNumber',
  width:'20%',
  key: 'contactNumber',
},{
  title: '操作',
  dataIndex: 'action',
  width:'23%',
  key:'action'
}];
// 结束
// 分页跳转
const onChangePagination = () => {
  if((list.value.page-1) * list.value.pageSize > total.value) {
    list.value.page = 1
  }
  getEnterpriseListAPI()
}
// 搜索按钮
const searchBtn = () => {
  getEnterpriseListAPI()
}

// 添加/续约合同对话框展示
let modalList = ref({
  buildingId:'',
  startTime:'',
  endTime:'',
  contractUrl:'',
  contractId:'',
  type:0,
  enterpriseId:''
})
// 添加合同规则
const modalRules = ({
  buildingId:[{required:true,message:'请选择租赁的楼宇',trigger:'blur'}],
  endTime:[{required:true,message:'请选择租赁起止日期',trigger:'blur'}],
  contractUrl:[{required:true,message:'请上传租赁合同',trigger:'blur'}],
})
// 获取租赁楼宇
const bulidingList = ref(null)
// 点击添加合同
const changeDomal = async(id) => {
  modalList.value.type = 0
  bulidingList.value = await getBulidingList()
  modalList.value.enterpriseId = id
  showDomal.value = true
}
// 选取的时间发生改变
const times = ref(null)
const onTimeChange = (value) => {
  if(modalList.value.type === 0) {
    modalList.value.startTime = dayjs(value[0]).format('YYYY-MM-DD')
    modalList.value.endTime = dayjs(value[1]).format('YYYY-MM-DD')
  }else {
    modalList.value.endTime = dayjs(value[1]).format('YYYY-MM-DD')
  }

}
// 上传文件
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
    const res = await updateFile(formData)
    modalList.value.contractUrl = res.url
    modalList.value.contractId = res.id
  }catch(e){
    console.log(e)
  }
}
// 提交合同
const handleOk = async() => {
  // 新增合同
  if(modalList.value.type === 0) {
      try{
      await addContract(modalList.value)
      await getEnterpriseList(list.value)
      await getRentListAPI(modalList.value.enterpriseId)
      message.success('添加合同成功')
      onCancel()
    }catch(e){ /* empty */ }
  }
  // 修改合同
  else {
    try{
      await addContract(modalList.value)
      await getEnterpriseList(list.value)
      await getRentListAPI(modalList.value.enterpriseId)
      message.success('续约合同成功')
      onCancel()
    }catch(e){ /* empty */ }
  }

}
const formDom = ref(null)
const onCancel = () => {
  formDom.value.resetFields()
  // 数据全是二次修改,重置表单需要将原有数据清空
  modalList.value = {
  // 续租有初始租赁楼宇和起始时间
    buildingId:'',
    startTime:'',
    endTime:'',
    contractUrl:'',
    contractId:'',
    type:'',
    enterpriseId:''
  }
  fileList.value = null
  times.value =null
  showDomal.value = false
}
// 续租
const renewal = async(record) => {
  // 续租有初始租赁楼宇和起始时间
  console.log(record)
  try{
  modalList.value.type = 1
  modalList.value.buildingId = record.buildingId
  // 终止时间+1等于起始时间转换
  const originalDate = new Date(record.endTime)
  originalDate.setDate(originalDate.getDate() + 1)
  const nextDayStr = originalDate.toISOString().slice(0, 10)
  modalList.value.startTime = nextDayStr
  showDomal.value = true
  await getBulidingList()
  }catch(e){ /* empty */ }
}
// 点击退租
const rentingInterfaceAPI = async(id) => {
  Modal.confirm({
    title:'提示',
    content: '是否确认退租?',
    async onOk(){
        await rentingInterface(id)
        await getEnterpriseList(list.value)
        await getRentListAPI(modalList.value.enterpriseId)
        message.success("退租成功")
      }
  })
}
// 删除企业
const delEnterpriseAPI = (id) => {
  Modal.confirm({
    title:'提示',
    content: '是否确认删除当前企业?',
    async onOk(){
        await delEnterprise(id)
        getEnterpriseListAPI()
        message.success("删除企业成功")
      }
  })
}
// 删除合同
const delRentAPI = (id) => {
  Modal.confirm({
    title:'提示',
    content: '是否确认删除当前合同?',
    async onOk(){
        await delRent(id)
        await getEnterpriseList(list.value)
        await getRentListAPI(modalList.value.enterpriseId)
        message.success("删除合同成功")
      }
  })
}
// 跳转添加企业
const gotoAddEnterprise = () => {
  router.push('/addEnterprise')
}
// 跳转查看企业
const gotoWatch = (id) => {
  router.push({
    path:'/addEnterprise',
    query:{id:id,type:'watch'}
  })
}
// 跳转编辑企业
const gotoChange = id => {
  router.push({
    path:'/addEnterprise',
    query:{id:id,type:'change'}
  })
}
// 挂载调用
onMounted(() => {
  getEnterpriseListAPI()
})
</script>
<template>
  <div class="control">
    <div class="header">
      <a-space>
        <span>企业名称:</span>
        <a-input v-model:value="list.name" placeholder="请输入企业名称" style="width: 220px;border-radius: 4px;"></a-input>
        <a-button @click="searchBtn" type="primary" style="margin-left: 10px;">查询</a-button>
      </a-space>
    </div>
    <div class="body">
      <a-button type="primary" style="border-radius: 4px;margin-bottom: 20px;" @click="gotoAddEnterprise">添加企业</a-button>
      <!-- 表格 -->  
      <a-table 
      :columns="columns"
      :data-source="enterpriseList"
      class="components-table-demo-nested" 
      :row-key="(record) => record.id"
      @expand="getSonTable"
      :expandedRowKeys="expandedRowKeys"
      :pagination="false">
        <template #bodyCell="{ record,column,index }">
          <template v-if="column.key === 'action'">
           <a-button type="link" style="padding: 4px 15px 4px 0;" @click="changeDomal(record.id)">添加合同</a-button>
           <a-button type="link" style="padding: 4px 15px 4px 0;" @click="gotoWatch(record.id)">查看</a-button>
           <a-button type="link" style="padding: 4px 15px 4px 0;" @click="gotoChange(record.id)">编辑</a-button>
           <a-button 
           :disabled="record.existContractFlag == 1 ? true : false" 
           type="link" 
           style="padding: 4px 15px 4px 0;"
           @click="delEnterpriseAPI(record.id)"
           >删除</a-button>
          </template>
          <template v-if="column.key === 'number'">
            <span>{{ (list.page - 1) * list.pageSize +index +1}}</span>
          </template>
        </template>
        <template #expandedRowRender>
          <a-table :columns="innerColumns" :data-source="innerData" :pagination="false" >
            <template #bodyCell="{ record,column }">
              <template v-if="column.key === 'time'">
                <span>
                  {{ record.startTime }}到{{ record.endTime }}
                </span>
              </template>
              <template v-if="column.key === 'status'">
                <a-tag v-if="record.status === 0" color="blue">待生效</a-tag>
                <a-tag v-if="record.status === 1" color="green">生效中</a-tag>
                <a-tag v-if="record.status === 2" color="red">已到期</a-tag>
                <a-tag v-if="record.status === 3">已退租</a-tag>
              </template>
              <template v-if="column.key === 'action'">
                <a-button :disabled="record.renewFlag === 0 ? true : false" type="link" style="padding: 4px 15px 4px 0;" @click="renewal(record)">续租</a-button>
                <a-button :disabled="record.exitFlag === 0 ? true : false" type="link" style="padding: 4px 15px 4px 0;" @click="rentingInterfaceAPI(record.id)">退租</a-button>
                <a-button :disabled="record.exitFlag === 0 ? false : true" type="link" style="padding: 4px 15px 4px 0;" @click="delRentAPI(record.id)">删除</a-button>
              </template> 
            </template>
          </a-table>
        </template>
      </a-table>
      <!-- 表格结束 -->
      <!-- 分页 -->
      <div id="components-pagination-demo-mini">
        <span>共{{ total }}条</span>
        <a-pagination 
        v-model:current="list.page" 
        v-model:page-size="list.pageSize"
        size="small" 
        :total="total" 
        show-size-changer 
        show-quick-jumper 
        @change="onChangePagination"
        />
      </div>
    </div>
    <!-- 弹窗 -->
    <div ref="createCreative">
      <a-modal 
        v-model:visible="showDomal" 
        :getContainer="() => createCreative"
        keyboard
        title="添加合同"
        ok-text="确认"
        cancel-text="取消"
        @ok="handleOk"
        @cancel="onCancel"
        style="width: 580px;
      ">
        <a-form ref="formDom" layout="vertical" :model="modalList" :rules="modalRules">
            <a-form-item label="租赁楼宇" :label-col="{ span: 10 }" :wrapper-col="{ span: 24 }" name="buildingId">
              <a-select 
              v-model:value="modalList.buildingId" 
              :disabled="modalList.type === 1 ? true : false" 
              placeholder="请选择租赁的楼宇"
              >
                <a-select-option v-for=" item in bulidingList" :key="item.id" :value="item.id"> {{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="租赁起止时间" :label-col="{ span: 10 }" name="endTime" >
              <a-range-picker style="width: 100%;" @change="onTimeChange" v-model:value="times" :disabled="modalList.type === 0 ? [false, false] :[true,false]"/>
            </a-form-item>
            <a-form-item label="租赁合同" :label-col="{ span: 10 }" :wrapper-col="{ span: 24 }" name="contractUrl">
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
            </a-form-item>
          </a-form>
      </a-modal>
    </div>
  </div>
</template>

<style lang="less" scoped>
.control{
  width: 100%;
  height: 100%;
  padding: 20px;
  min-width: 1116px;
  background-color: #fff;
  .header{
    height: 52px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 20px;
  }
}
:deep(.ant-table-cell){
  padding: 8px !important;
}
#components-pagination-demo-mini {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
// 弹窗
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