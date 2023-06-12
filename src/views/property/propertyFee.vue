<script setup>
import { ref, computed, onMounted } from 'vue'
import { getTableList,delBill } from '@/api/propertyFee.js'
import ModalIndex from './components/modalIndex.vue';
import { Modal,message } from 'ant-design-vue';
const format = ref([])
const searchName = ref('')
const searchForm = computed(() => {
  return {
    page: 1,
    pageSize: 10,
    start: format.value[0],
    end: format.value[1],
    enterpriseName: searchName.value
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
// 显示弹框
const visible = ref(false)
//查看
const modelId = ref('')
const showModal = (id) => {
  if(typeof(id) === 'number') {
    modelId.value = id
  } else {
    modelId.value = false
  }
  visible.value = true
}

const delBillAPI = async (id) => {
  Modal.confirm({
    title:"你确定要删除这条信息嘛",
    async onOk() {
      await delBill(id)
      getTableListAPI()
      message.success('删除成功')
    }
  })

}
</script>
<template>
  <div class="search" :model="searchForm" @finish="onFinish">
    <a-form>
      <a-row>
        <a-space :size="16">
          <a-form-item label="企业名称">
            <a-input
              v-model:value="searchName"
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
            <a-button type="primary" @click="getTableListAPI">查询</a-button>
          </a-form-item>
        </a-space>
      </a-row>
    </a-form>
  </div>
  <div class="table">
    <a-button type="primary" class="add" @click="showModal">添加账单</a-button>
    <a-table :dataSource="tableList" :columns="columns" :pagination="false" :scroll="{ x: 1200 }">
      <template #headerCell="{ title, column }">
        <span v-if="column.key === 'propertyFeePrice'">{{ title }} <sub>2</sub>)</span>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'index'" >
          <span>{{ tableList.indexOf(record) + 1 }}</span>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="text" style="color:#4770ff" @click="showModal(record.id)">查看</a-button>
          <a-button type="text" style="color:#4770ff" @click="delBillAPI(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
  <a-row class="pagination">
    共{{ totals }}条
    <a-pagination
      size="small"
      show-size-changer
      show-quick-jumper
      :total="totals"
      @change="onChange"
    />
  </a-row>
  <ModalIndex v-model:visible="visible" v-model:modelId="modelId" @addSuccess="getTableListAPI" v-if="modelId"></ModalIndex>
  <ModalIndex v-model:visible="visible" @addSuccess="getTableListAPI" v-else></ModalIndex>
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
    font-size: 12px;
    transform: scale(0.8);
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
    .ant-btn {
      padding-left: 0;
      font-size: 14px;
    }
  }
}
.ant-table-container table > thead > tr:first-child th:last-child {
  width: 15%;
}
.ant-table-container table > thead > tr:first-child th:first-child {
  width: 6.5%;
}
.ant-table-container table > thead > tr:first-child th:nth-child(3) {
  width: 15.5%;
}
.ant-table-container table > thead > tr:first-child th:nth-child(2) {
  width: 14.6%;
}
.ant-table-container table > thead > tr:first-child th:nth-child(4) {
  width: 13%;
}
.ant-table-container table > thead > tr:first-child th:nth-child(5) {
  width: 9.5%;
}
.pagination {
  float: right;
}
.ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td {
  padding: 8px;
}
.ant-table-thead > tr > th {
  height: 48px;
  background: #f4f6f8;
}
.ant-picker {
  width: 100%;
}
</style>
