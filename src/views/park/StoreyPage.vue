<script setup>
import { ref, onMounted } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { getBuilding, delBuilding } from '@/api/building'
import addBuliding from './commpent/add-buliding.vue'

const list = ref([])
//列表
const columns = [
  { title: '序号', key: 'number' },
  { title: '楼宇名称', dataIndex: 'name', key: 'name' },
  { title: '层数', dataIndex: 'floors', key: 'floors' },
  { title: '在管面积(㎡)', dataIndex: 'area', key: 'area' },
  { title: '层物业费(元/㎡)', dataIndex: 'propertyFeePrice', key: 'propertyFeePrice' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', dataIndex: 'demoFlag', key: 'demoFlag' }
]
const data = ref({
  page: 1,
  pageSize: 10,
  total: 0,
  name: ''
})
//渲染列表
const getBuildingAPI = async () => {
  const res = await getBuilding(data.value)
  console.log(res)
  list.value = res.rows
  total.value = res.total
}
//分页
const total = ref(0)
const onPageChange = (val1, val2) => {
  data.value.page = val1
  data.value.pageSize = val2
  getBuildingAPI()
}
const showDialog = ref(false)
//页面加载获取数据
onMounted(() => {
  getBuildingAPI()
})
// 子传父 编辑
const addBuildingRef = ref(null)
const editRow = (id) => {
  showDialog.value = true
  addBuildingRef.value.getBuildingDetailsAPI(id)
}

//删除

const delBuildingAPI = (id) => {
  Modal.confirm({
    title: '提示',
    content: '是否确认删除当前楼宇',
    async onOk() {
      await delBuilding(id)
      message.success('删除楼宇成功')
      getBuildingAPI()
    }
  })
}

// 搜索按钮
const searchBtn = () => {
  getBuildingAPI()
}
</script>
<template>
  <!-- 头部搜索框 -->
  <div class="search-table">
    <!--按钮查询  -->
    <div class="search-table_header">
      <a-space>
        <span>楼宇名称:</span>
        <a-input
          v-model:value="data.name"
          placeholder="请输入楼宇名称"
          style="width: 220px; border-radius: 4px"
        />
        <a-button @click="searchBtn" type="primary" style="margin-left: 10px">查询</a-button>
      </a-space>
    </div>
    <div class="search-table__main">
      <a-button type="primary"  style="border-radius: 4px;margin-bottom: 5px;" @click="showDialog = true">添加楼宇</a-button>
      <add-buliding :showDialog="showDialog"></add-buliding>
      <!-- 表单区域 -->
      <a-table :dataSource="list" :columns="columns" :pagination="false">
        <template #bodyCell="{ index, column, record }">
          <a-space v-if="column.dataIndex === 'demoFlag'">
            <a-button type="link" style="padding: 4px 15px 4px 0" @click="editRow(record.id)"
              >编辑</a-button>
            <!-- 删除禁用  disabled  租赁中删除禁用-->
            <a-button
              :disabled="record.status === 1 ? true : false"
              type="link"
              style="padding: 4px 15px 4px 0"
              @click="delBuildingAPI(record.id)"
              >删除</a-button
            >
          </a-space>
          <template v-if="column.key === 'number'">
            <span>{{ (data.page - 1) * data.pageSize + index + 1 }}</span>
          </template>
          <template v-if="column.dataIndex === 'status'">
            <span>{{ record.status === 0 ? '空置中' : '租赁中' }}</span>
          </template>
        </template>
      </a-table>
      <!-- 弹层 -->
      <add-buliding
        ref="addBuildingRef"
        v-model:showDialog="showDialog"
        @addSuccess="getBuildingAPI">
      </add-buliding>
    </div>
    <!-- 分页 -->
    <div class="my-pagination-wrapper">
      <a-pagination
        :current="data.page"
        :pageSize="data.pageSize"
        :pageSizeOptions="[10, 20, 40, 50]"
        @change="onPageChange"
        size="small"
        :total="total"
        show-size-changer
        show-quick-jumper
        :show-total="(total) => `共 ${total} 条`"
      />
    </div>
  </div>
</template>

<style scoped>
.search-table {
  width: 100%;
  height: 100%;
  padding: 20px;
  min-width: 1116px;
  background-color: #fff;
}
.search-table_header {
  height: 52px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 20px;
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