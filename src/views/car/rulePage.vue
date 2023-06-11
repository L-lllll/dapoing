<script setup>
import {onMounted, ref} from 'vue'
// import  { SelectProps } from 'ant-design-vue';
import {getParkManagementList} from '../../api/stop.js'
//列表title
const columns = [
  { title: '序号', dataIndex: 'id', key: 'id' },
  { title: '车牌号码', dataIndex: 'carNumber', key: 'carNumber' },
  { title: '收费类型', dataIndex: 'chargeType', key: 'chargeType' },
  { title: '停车总时长', dataIndex: 'parkingTime', key: 'parkingTime' },
  { title: '缴纳费用（元）', dataIndex: 'actualCharge', key: 'actualCharge' },
  { title: '缴纳状态', dataIndex: 'paymentStatus', key: 'paymentStatus' },
  { title: '缴纳方式', dataIndex: 'paymentMethod', key: 'paymentMethod' },
  { title: '缴纳时间', dataIndex: 'paymentTime', key: 'paymentTime' }
]

const data = ref([])

onMounted(()=> {
  //页面加载获取数据
  getParkManagementListApi()
})

const getParkManagementListApi = async()=>{
  const res = await getParkManagementList()
  console.log(res)
  
  data.value = res.rows
}
</script>
<template>
  <div class="search_table">
    <!-- 头部搜索框 -->
    <div class="search-table__header">
      <!-- 查询按钮 -->
      <a-button type="primary">增加停车计费规则</a-button>
    </div>
    <!-- 列表内容 -->
    <div class="search-table__main">
      <a-table bordered:false :dataSource="data" :columns="columns" />
    </div>
  </div>
</template>
<style scoped>
.search_table {
  padding: 20px 20px 0;
  background-color: #fff;
}
.search-table__header {
  width: 1196px;
  height: 52px;
  display: flex;
  /* margin-bottom: 20px; */
}
.ant-input {
  width: 220px;
  height: 32px;
  border-radius: 4px !important;
}
.number,
.state {
  width: 290px;
  height: 52px;
  margin-right: 16px;
}
.search-table__header > label {
  display: inline-flex;
  align-items: center;
}
.ant-btn {
  border-radius: 4px;
}
</style>
