<script setup>
import {getWarnList,delWarn,getWarnDetail} from '@/api/warningPage'
import { onMounted,reactive,ref} from 'vue'
import { Modal } from 'ant-design-vue'
import { useRouter } from 'vue-router'; 
import { setId } from '../../untils/storage';
const router = useRouter()
const list = ref([])
// const searchList=ref([])
const columns = [ 
  {
    title: '序号',
    customRender( {index} ) {
      return (pageParams.page - 1) * pageParams.pagesize + index + 1
    }
  },
 {title: '一体杆名称', dataIndex: 'poleName', key: 'state'}, 
 {title: '一体杆编号', dataIndex: 'poleNumber', key: 'poleNumber'}, 
 {title: '故障类型', dataIndex: 'errorType', key: 'errorType'},
 {title: '处置状态', dataIndex: 'handleStatus', key: 'handleStatus'},
 {title: '告警时间', dataIndex: 'warningTime', key: 'warningTime'},
 {title: '操作',dataIndex: 'operate'}]
 const pageParams = reactive({
  page: 1,
  pagesize: 10,
  total:0,
  poleName:'',
  poleNumber:'',
  handleStatus:''
})
const getWarnListAPI = async() => {
  const { rows,total }  = await getWarnList(pageParams)
  // console.log(rows,total)
  // const list = data.data.rows
  list.value = rows
  pageParams.total = total
}
 onMounted(() => {
    getWarnListAPI()
 })
 const delWarnAPI = (id) =>{
  Modal.confirm({
    content:'是否确认删除当前告警记录？',
    async onOk(){
      await delWarn(id)
     getWarnListAPI()
    }
  })

 }
const getDetail = async(id) =>{
  const res = await getWarnDetail(id)
  console.log(res)
  console.log(id)
  setId(res)
  router.push({
    path:'/warningPageDetail',
    query:{
      id:res.id
    }
  })
}
 
 const changePage = (page, pagesize,total) => {
  console.log(page,pagesize,total)
  pageParams.page = page
  pageParams.pagesize = pagesize
  pageParams.total = total
  getWarnListAPI()
}
</script>
<template>
   <div class="main-top">
    <a-form type="flex" justify="space-between" style="border-bottom: 1px solid #e3e3e3;">
      <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item 
              name="poleName"
              :label="`一体杆名称`" >
              <a-input  v-model:value="pageParams.poleName" placeholder="请输入一体杆名称" style="width:100%"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :label="`一体杆编号`" 
              name="poleNumber">
              <a-input  v-model:value="pageParams.poleNumber" placeholder="请输入一体杆编号" style="width:100%"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              :label="`运行状态`" name="handleStatus">
              <!-- <a-select :options="poleStatus"></a-select> -->
              <a-select 
              placeholder="请选择状态"
              v-model:value="pageParams.handleStatus">
              <a-select-option :value="0">
                未派单
              </a-select-option>
              <a-select-option :value="1">
                已派单
              </a-select-option>
              <a-select-option :value="2">
                已接单
              </a-select-option>
              <a-select-option :value="3">
                已完成
              </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-button type="primary" html-type="submit" @click="getWarnListAPI">查询</a-button>
            </a-form-item>
          </a-col>
      </a-row>
    </a-form>
  </div>
  <a-table :dataSource="list"
   :columns="columns"
   :pagination="{
            current: pageParams.page,
            pageSize: pageParams.pagesize,
            total: pageParams.total,
            onChange: changePage,
          }"
    >
    <template #bodyCell="{ record,column }">
            <template v-if="column.dataIndex === 'operate'">
              <a-space>
                <a-button  type="text" size="small" :disabled="true">派单</a-button>
                <a-button  type="link"  size="small" @click="getDetail(record.id)">详情</a-button>
                <a-button  type="link" size="small" @click="delWarnAPI(record.id)">删除</a-button>
              </a-space>
            </template>
            <template v-if="column.dataIndex === 'handleStatus'">
            <span v-if="record.handleStatus === 0">未派单</span>
            <span v-if="record.handleStatus === 1">已派单</span>
            <span v-if="record.handleStatus === 2">已接单</span>
            <span v-if="record.handleStatus === 3">已完成</span>
            </template>
      </template>
  </a-table>
  <!-- <span>{{ `共${pageParams.total}条`}}</span> -->
</template>
<style>
.main-top{
  margin: 20px;
}
</style>