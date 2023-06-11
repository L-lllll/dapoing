<script setup>
import {ref,onMounted} from 'vue'
import {getEnterpriseList} from '@/api/enterPrise.js'
// 渲染列表
const enterpriseList = ref(null)
// 总计
const total = ref('')
const list = ref({
  name:'',
  page:1,
  pageSize:10
})
const getEnterpriseListAPI = async() => {
  const res = await getEnterpriseList(list.value)
  total.value = res.total
  enterpriseList.value = res.rows
  console.log(enterpriseList)
}
// 表格专用区
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
  width:'23%',
  key:'action'
}];
// 结束

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
        <a-input placeholder="请输入企业名称" style="width: 220px;border-radius: 4px;"></a-input>
        <a-button type="primary" style="margin-left: 10px;">查询</a-button>
      </a-space>
    </div>
    <div class="body">
      <a-button type="primary" style="border-radius: 4px;margin-bottom: 20px;">添加企业</a-button>
      <!-- 表格 -->
      <a-table :columns="columns" :data-source="enterpriseList">
        <template #bodyCell="{ column,index }">
          <template v-if="column.key === 'action'">
           <a-button type="link" style="padding: 4px 15px 4px 0;">添加合同</a-button>
           <a-button type="link" style="padding: 4px 15px 4px 0;">查看</a-button>
           <a-button type="link" style="padding: 4px 15px 4px 0;">编辑</a-button>
           <a-button type="link" style="padding: 4px 15px 4px 0;">删除</a-button>
          </template>
          <template v-if="column.key === 'number'">
            <span>{{ (list.page - 1) * list.pageSize +index +1}}</span>
          </template>
        </template>
        <template #expandedRowRender="{ record }">
          <p style="margin: 0">
            {{ record.id }}
          </p>
        </template>
      </a-table>
      <!-- 结束 -->
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
</style>