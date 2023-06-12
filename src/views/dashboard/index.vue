<script setup>
import { ref, onMounted } from 'vue'
import {getRentAdvent,getHomeInfo} from '@/api/dashboard'
// import AnnualRevenue from './annualRevenue.vue';
import AnTv from './AnTv.vue'
// 临期合同提醒
const columns = ref([
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index'
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
    title: '租赁时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '操作',
    key: 'operation'
  }
])
const rentAdvent = ref([])
const rentAdventPage = ref({
  page: 1,
  pageSize: 5
})
// 总收入
const annualIncome = ref(0)
// 企业总数
const enterpriseTotal = ref(0)
// 月卡总数
const monthCardTotal = ref(0)
// 一体杆总数
const chargePoleTotal = ref(0)
const totals = ref(0)
onMounted(() => {
  getRentAdventAPI()
  getHomeInfoAPI()
})
const getRentAdventAPI = async () => {
  const {total, rows} =  await getRentAdvent(rentAdventPage.value)
  rentAdvent.value = rows
  totals.value = total
}
const getHomeInfoAPI = async () => {
  const res = await getHomeInfo()
  annualIncome.value = res.annualIncome
  enterpriseTotal.value = res.enterpriseTotal
  monthCardTotal.value = res.monthCardTotal
  chargePoleTotal.value = res.chargePoleTotal
}

//分页
const onChange = (pageSize,page) => {
  rentAdventPage.value.page = page
  rentAdventPage.value.pageSize = pageSize
  getRentAdventAPI()
}
</script>

<template>
  <div class="main">
    <div class="content">
      <div class="left">
        <!-- 园区数据 -->
        <div class="parkData">
          <h2>园区数据</h2>
          <ul>
            <li>
              <h3>年度累计收费（元）</h3>
              <p>{{annualIncome}}</p>
            </li>
            <li>
              <h3>入驻企业总数（个）</h3>
              <p>{{enterpriseTotal}}</p>
            </li>
            <li>
              <h3>月卡车辆总数（辆）</h3>
              <p>{{monthCardTotal}}</p>
            </li>
            <li>
              <h3>一体杆总数（台）</h3>
              <p>{{chargePoleTotal}}</p>
            </li>
          </ul>
        </div>
        <!-- 年度收入统计 -->
        <div class="annualRevenue">
          <h2>年度收入统计</h2>
          <AnTv></AnTv>
        </div>
        <!-- 临期合同提醒 -->
        <div class="arriveContract">
          <h2>临期合同提醒</h2>
          <a-table :columns="columns" :dataSource="rentAdvent" :pagination="false">
            <template #bodyCell="{column,record,index}">
              <template v-if="column.key === 'index'">{{ index + 1 }}</template>
              <template v-if="column.key === 'time'">{{ record.startTime }}至{{ record.endTime }}</template>
              <template v-if="column.key === 'operation'">
                <a-button type="text" style="color:#4770ff">续租</a-button>
                <a-button type="text" style="color:#4770ff">退租</a-button>
              </template>
            </template>
          </a-table>
          <a-row class="pagination" style="justify-content: end;">
            共{{ totals }}条
            <a-pagination
              size="small"
              show-size-changer
              show-quick-jumper
              :total="totals"
              @change="onChange"
              style="justify-content: end;"
            />
          </a-row>
        </div>
      </div>
      <div class="right">
      <!-- 快捷入口 -->
        <div class="fast">
          <h2>快捷入口</h2>
          <ul>
            <li>
              <img src="../../assets/common/下载.png" alt="">
              <h3>添加企业</h3>
            </li>
            <li>
              <img src="../../assets/common/下载 (2).png" alt="">
              <h3>员工管理</h3>
            </li>
            <li>
              <img src="../../assets/common/下载 (3).png" alt="">
              <h3>添加账单</h3>
            </li>
            <li>
              <img src="../../assets/common/下载 (4).png" alt="">
              <h3>数据大屏</h3>
            </li>
          </ul>
        </div>
        <!-- 设置告警派单 -->
        <div class="warningBuil">
          <h2>设置告警派单</h2>
          <div class="cont" v-if="false">
          </div>
          <img src="./../../assets/common/Empty.png" alt="">
          <a-button type="primary">更多></a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.main {
  position: relative;
  width: 100%;
  background: #f4f6f8;
  height: calc(100%);
  overflow: hidden;
}
.content {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 70%;
  margin-right: 20px;
  div {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    min-width: 260px;
    h2 {
      font-size: 14px;
      color: #303035;
      font-weight: 500;
      margin-bottom: 20px;
    }
  }
  // 园区数据
  .parkData ul {
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    display: flex;
    justify-content: space-between;
    h3 {
      color: #909399;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: normal;
    }
    p {
      color: #303035;
      font-weight: 500;
      font-size: 24px;
      margin-bottom: 0;
    }
  }
  // 年度收入统计
  .annualRevenue {
    min-height: 382px;
  }
  //临期合同提醒
  .ant-table-wrapper {
    padding: 0;
    margin-bottom: 0;
  }
  :deep(.arriveContract) {
    padding-bottom: 0;
    button {
      padding-left: 0;
    }
    .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
      display: none;
    }
    .ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td {
      padding: 8px !important;
    }
    .search-table[data-v-773e5400] .ant-table-small .ant-table-thead>tr>th{
      height: 48px;
      background: #f4f6f8;
    }
    .ant-table-container table > thead > tr:first-child th:first-child {
      width: 5%;
    }
    .ant-table-container table > thead > tr:first-child th:nth-child(2) {
      width: 43%;
    }
    .ant-table-container table > thead > tr:first-child th:nth-child(3) {
      width: 23%;
    }
    .pagination {
      padding: 15px 0 15px 0;
      margin-bottom: 0;
    }
  }
}
.right {
  width: calc(30% - 20px);
  div {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    min-width: 260px;
    h2 {
      font-size: 14px;
      color: #303035;
      font-weight: 500;
      margin-bottom: 20px;
    }
  }
  .fast {
    ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
      padding-left: 0;
      margin-bottom: 0;

      li {
        cursor: pointer;
        img {
          width: 53px;
          height: 53px;
        }
        h3 {
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          margin-bottom: 0;
        }
      }
    }
  }
  .warningBuil {
    button {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      border-radius: 22px!important;
      height: 36px;
      width: 90%;
    }
    img {
      display: block;
      margin: 0 auto;
      width: 45%;
    }
  }
} 
</style>
