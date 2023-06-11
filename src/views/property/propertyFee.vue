<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTableList } from '@/api/propertyFee.js'
const format = ref([])
const searchForm = computed(() => {
  return {
    page: 1,
    pageSize: 10,
    start: format.value[0],
    end: format.value[1]
  }
})
const onFinish = () => {
  // 提交
}
// 列名称
const columns = ref([
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index'
  },
  {
    title: '账单编号',
    dataIndex: 'billNumber',
    key: 'billNumber'
  },
  {
    title: '企业名称',
    dataIndex: 'enterpriseName',
    key: 'enterpriseName'
  },
  {
    title: '租赁楼宇',
    dataIndex: 'buildingName',
    key: 'buildingName'
  },
  {
    title: '物业费(元/m',
    dataIndex: 'propertyFeePrice',
    key: 'propertyFeePrice'
  },
  {
    title: '账单金额(元)',
    dataIndex: 'paymentAmount',
    key: 'paymentAmount'
  },
  {
    title: '缴费时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
])
// 表格列表
const tableList = ref([])
// 总条数
const totals = ref(0)
// 获取数据
onMounted(() => {
  getTableListAPI()
})
const getTableListAPI = async () => {
  const { total, rows } = await getTableList(searchForm.value)
  tableList.value = rows
  totals.value = total
}
// 获取页数
const onChange = (pageSize,page) => {
  searchForm.value.page = pageSize
  searchForm.value.pageSize = page
  getTableListAPI()
}
const res = ref('')
</script>
<template>
  <div class="search" :model="searchForm" @finish="onFinish">
    <a-form>
      <a-row>
        <a-space :size="16">
          <a-form-item label="企业名称">
            <a-input
              v-model.value="searchForm.enterpriseName"
              placeholder="请输入企业名称"
              style="width: 220px"
            ></a-input>
          </a-form-item>
          <a-form-item label="缴费时间">
            <a-range-picker
              v-model:value="format"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              style="width: 260px"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary">查询</a-button>
          </a-form-item>
        </a-space>
      </a-row>
    </a-form>
  </div>
  <div class="table">
    <a-button type="primary" class="add">添加账单</a-button>
    <a-table :dataSource="tableList" :columns="columns" :pagination="false" :scroll="{ x: 1200 }">
      <template #headerCell="{ title, column }">
        <span v-if="column.key === 'propertyFeePrice'">{{ title }} <sub>2</sub>)</span>
      </template>
    </a-table>
  </div>
  <a-row class="pagination">
    共{{ totals }}条
    <a-pagination
      size="small"
      show-size-changer
      v-model="res"
      show-quick-jumper
      :total="totals"
      @change="onChange"
    />
  </a-row>
</template>
<style lang="less">
.ant-layout-content {
  padding: 20px;
}
.search {
  border-bottom: 1px solid rgba(237, 237, 237, 0.9);
  margin-bottom: 20px;
  height: 53px;
}
input,
.ant-picker,
.ant-btn {
  border-radius: 4px;
}
.table {
  margin-bottom: 16px;
  .add {
    margin-bottom: 20px;
  }
  sub {
    top: -0.3em;
    left: -0.2em;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not(
      [colspan]
    )::before {
    display: none;
  }
  table {
    border-collapse: collapse;
    overflow: hidden;
  }
}
.pagination {
  float: right;
}
</style>
