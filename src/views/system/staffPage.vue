<script setup>
import { ref,onMounted} from "vue";
import {getUserManagement} from '../../api/system/staff.js'
import addVisible from '../system/components/addVisible.vue'
//获取分页数据的请求信息
const userInfo=ref({page:1,pageSize:10,name:''})
// 分页数据的结果
const dataSource=ref([])
//total
const total=ref('')
//
const pageSizeOptions=ref(['10','20','50','100'])
// 对话框
const Staff=ref(false)
const columns = [{title: '序号', dataIndex: 'index', key: 'index',width:'8%'},
 {title: '员工姓名', dataIndex: 'name', key: 'name',width:'15%'}, 
 {title: '登录账号', dataIndex: 'userName', key: 'userName',width:'15%'}, 
 {title: '联系方式', dataIndex: 'phonenumber', key: 'phonenumber',width:'15%'},
 {title:'角色',dataIndex: 'roleName', key: 'roleName',width:'15%'},
 {title:'状态',dataIndex: 'status', key: 'status',width:'15%'},
 {title:'添加时间',dataIndex: 'createTime', key: 'createTime',width:'20%'},
 {title:'操作',dataIndex:'adit',width:'10%'}]
onMounted(()=>{
  getUser()
})
 const getUser=async ()=>{
  const res=await getUserManagement(userInfo.value)
  console.log(res)
  total.value=res.total
  dataSource.value=res.rows
 }
 //查询
 const Inquire=()=>{
  getUser()
  userInfo.value.name=''
 }
//  打开弹窗
const IncreaseStaff=()=>{
  Staff.value=true
}
</script>
<template>
<div class="content">
  <!-- 顶部 -->
<div class="header">
  <!-- form表单 -->
  <a-form layout="inline" :model="userInfo">
    <a-form-item label="员工姓名：" name="name">
      <a-input class="input" placeholder="请输入员工姓名" v-model:value="userInfo.name"></a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" style="margin-left:40px ;" @click="Inquire">查询</a-button>
    </a-form-item>
  </a-form>
</div>
<!-- 顶部结束 -->
<div>
  <a-button type="primary" class="btn" @click="IncreaseStaff">添加员工</a-button>
</div>
<!-- 表格 -->
<div>
<a-table :dataSource="dataSource" :columns="columns" :pagination="false">
  <template #bodyCell="{ record, column ,index}">
    <template v-if="column.dataIndex === 'index'">

      {{ (userInfo.page - 1) * userInfo.pageSize + index + 1 }}
    </template>
    <template v-if="column.dataIndex === 'status'">
{{record.status?'启用':'未启用'  }}
    </template>
    <template v-if="column.dataIndex === 'createTime'">
{{record.createTime  }}
    </template>
      <div v-if="column.dataIndex === 'adit'" class="operate">
         <a-button type="text" style="color: #7094ff;">编辑</a-button>
         <a-button  type="text" style="color: #7094ff;">删除</a-button>
         <a-button  type="text" style="color: #7094ff;">重置密码</a-button>
      </div>
      </template>
    </a-table>
    <a-pagination
      v-model:current="userInfo.page"
      v-model:page-size="userInfo.pageSize"
      :total="total"
      :show-total="total => `共 ${total} 条`"
      :showSizeChanger="true"
      size="small"
      :pageSizeOptions="pageSizeOptions"
      style="margin-top: 20px;float: right;"
    >
  </a-pagination>
</div>
</div>
<addVisible v-model:Staff="Staff"></addVisible>
</template>
<style scoped lang="less">
.content{
  width: 100%;
  padding: 20px 20px 0px;
  /* background-color: pink; */
  .header{
    width: 100%;
    height: 51.6px;
    color: #000000D9;
    border-bottom: 1px solid #f0ececd9;
    .input{
      width: 120%;
    }
  }
  .btn{
    margin: 20px 0px 20px;
  }
}
.operate{
  display: flex;
  justify-content: space-between;
}
</style>