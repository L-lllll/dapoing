<script setup>
import {ref,onMounted } from 'vue'
import { getBuilding } from '@/api/building'

const list = ref([])
const columns = [
  { title: '序号', dataIndex: 'id', key: 'id' },
  { title: '楼宇名称', dataIndex: 'name', key: 'name' },
  { title: '层数', dataIndex: 'floors', key: 'floors' },
  { title: '在管面积(㎡)', dataIndex: 'area', key: 'area' },
  { title: '层物业费(元/㎡)', dataIndex: 'propertyFeePrice', key: 'propertyFeePrice' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', dataIndex: 'demoFlag', key: 'demoFlag' },

]

const getBuildingAPI = async () => {
  const res = await getBuilding()
  console.log(res)
  list.value = res.rows

}

onMounted(() => {
  getBuildingAPI()
})
</script>
<template>
  <div class="search-table">
    <div class="search-table_header">
      <a-space>
      <span>楼宇名称:</span>
      <a-input v-model:value="value" placeholder="请输入楼宇名称" style="width: 220px;"/>
      <a-button type="primary">查询</a-button>
      </a-space>
   
    </div>
    <a-button type="primary">添加楼宇</a-button>
    <a-table :dataSource="list" :columns="columns" />
    <div class="my-pagination-wrapper">
    <a-pagination :show-total="total => `共 ${total} 条`" v-model:current="current1" show-quick-jumper :total="500" @change="onChange" />
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
.my-pagination-wrapper {
  float: right;
  margin: 0;
  padding: 0;
}
</style>