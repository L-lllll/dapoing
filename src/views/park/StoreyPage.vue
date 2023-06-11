<script setup>
import { ref, onMounted } from 'vue'
import { getBuilding } from '@/api/building'
import addBuliding from './commpent/add-buliding.vue'

const list = ref([])
const columns = [
  { title: '序号', key: 'number' },
  { title: '楼宇名称', dataIndex: 'name', key: 'name' },
  { title: '层数', dataIndex: 'floors', key: 'floors' },
  { title: '在管面积(㎡)', dataIndex: 'area', key: 'area' },
  { title: '层物业费(元/㎡)', dataIndex: 'propertyFeePrice', key: 'propertyFeePrice' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', dataIndex: 'demoFlag', key: 'demoFlag' }
]

const getBuildingAPI = async () => {
  const res = await getBuilding()
  console.log(res)
  list.value = res.rows
}
const showDialog = ref(false)

onMounted(() => {
  getBuildingAPI()
})
const addBuildingRef = ref(null)
const editRow = (id) => {
  showDialog.value = true
  addBuildingRef.value.getBuildingDetailsAPI(id)
}
</script>
<template>
  <!-- 头部搜索框 -->
  <div class="search-table">
    <!--按钮查询  -->
    <div class="search-table_header">
      <a-space>
        <span>楼宇名称:</span>
        <a-input v-model:value="value" placeholder="请输入楼宇名称" style="width: 220px" />
        <a-button type="primary">查询</a-button>
      </a-space>
    </div>
    <!-- 表单区域 -->
    <div class="search-table__main">
      <a-button type="primary" @click="showDialog = true">添加楼宇</a-button>
      <add-buliding :showDialog="showDialog"></add-buliding>
      <a-table :dataSource="list" :columns="columns" :pagination="false">
        <template #bodyCell="{ index,text,column }">
          <a-space v-if="column.dataIndex === 'demoFlag'">
            <a-button type="link" style="padding: 4px 15px 4px 0" @click="editRow(index.id)">编辑</a-button>
            <a-button disabled type="link" style="padding: 4px 15px 4px 0">删除</a-button>
          </a-space>
          <template v-if="column.key === 'number'">
            <span>{{ (list.page - 1) * list.pageSize + index + 1 }}</span>
          </template>
          <template v-if="column.dataIndex === 'status'">
            <span>{{ text === '0' ? '空置中' : '租赁中'}}</span>
          </template>
        </template>
      </a-table>
      <add-buliding ref="addBuildingRef" v-model:showDialog="showDialog" @addSuccess="getBuildingAPI"></add-buliding>
    </div>
    <!-- 分页 -->
    <div class="my-pagination-wrapper">
      <a-pagination
        :show-total="(total) => `共 ${total} 条`"
        v-model:current="current1"
        show-quick-jumper
        :total="500"
        @change="onChange"
      />
    </div>
  </div>
</template>

<style scoped>
.search-table {
  padding: 20px 20px 0;
}
.search-table_header {
  margin-bottom: 20px;
  display: flex;
  border-bottom: 1px solid rgba(237, 237, 237, 0.9);
  height: 50px;
}
.search-table__main {
  margin-bottom: 20px;
}
.my-pagination-wrapper {
  float: right;
  margin: 0;
  padding: 0;
}
</style>