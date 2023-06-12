<script setup>
import {ref,onMounted} from 'vue'
import {getEnterpriseList,getRentList,getBulidingList} from '@/api/enterPrise.js'
import dayjs from 'dayjs';
// 渲染列表
const enterpriseList = ref(null)
// 总计
const total = ref(0)
// 展示合同租赁表单
const showDomal = ref(false)
// 指定modal挂载的节点
const createCreative = ref(null);
const times = ref([dayjs('2015/01/01', 'YYYY/MM/DD'), dayjs('2015/01/01', 'YYYY/MM/DD')])
const handleOk = () => {
  console.log(times.value)
}
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
  const res = await getRentList(id)
  innerData.value = res
}
const expandedRowKeys = ref([]);
const getSonTable = (expanded, record) => {
      // 只展开一行
      if (expandedRowKeys.value.length > 0) { 
       //进这个判断说明当前已经有展开的了
       //返回某个指定的字符串值在字符串中首次出现的位置，下标为0
        let index = expandedRowKeys.value.indexOf(record.id);
        if (index > -1) { //如果出现则截取这个id,1d到1相当于0，针对重复点击一个
          expandedRowKeys.value.splice(index, 1);
        } else {
        //如果没出现则截取所有id,添加点击id，0到1，针对已经有一个展开，点另一个会进入判断
          getRentListAPI(record.id)
          expandedRowKeys.value.splice(0, expandedRowKeys.value.length);
          expandedRowKeys.value.push(record.id);
        }
      } else {
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
const modalList = ref({
  buildingId:'',
  startTime:'',
  endTime:'',
  contractUrl:'',
  contractId:'',
  type:'',
  enterpriseId:''
})
const bulidingList = ref(null)
const changeDomal = async() => {
  bulidingList.value = await getBulidingList()
  showDomal.value = true
  console.log(bulidingList.value)

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
      <a-button type="primary" style="border-radius: 4px;margin-bottom: 20px;">添加企业</a-button>
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
           <a-button type="link" style="padding: 4px 15px 4px 0;">查看</a-button>
           <a-button type="link" style="padding: 4px 15px 4px 0;">编辑</a-button>
           <a-button :disabled="record.existContractFlag == 1 ? true : false" type="link" style="padding: 4px 15px 4px 0;">删除</a-button>
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
                <a-button :disabled="record.renewFlag === 0 ? true : false" type="link" style="padding: 4px 15px 4px 0;">续租</a-button>
                <a-button :disabled="record.exitFlag === 0 ? true : false" type="link" style="padding: 4px 15px 4px 0;">退租</a-button>
                <a-button :disabled="record.exitFlag === 0 ? false : true" type="link" style="padding: 4px 15px 4px 0;">删除</a-button>
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
          style="width: 580px;
        ">
        <a-form ref="formDom" layout="vertical">
            <a-form-item label="租赁楼宇" :label-col="{ span: 10 }" :wrapper-col="{ span: 24 }">
              <a-select v-model:value="modalList.buildingId">
                <a-select-option v-for=" item in bulidingList" :key="item.id" :value="item.id"> {{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="租赁起止时间" :label-col="{ span: 10 }">
              <a-range-picker v-model:value="times" style="width: 100%;"/>
            </a-form-item>
            <a-form-item label="租赁合同" :label-col="{ span: 10 }" :wrapper-col="{ span: 24 }">
              <a-input-password placeholder="请输入" style="width: 100%;"></a-input-password>
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