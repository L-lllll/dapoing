<script setup>
import { onMounted, ref } from 'vue'
// import  { SelectProps } from 'ant-design-vue';
import { getParkManagementList } from '../../api/stop.js'
//列表title
const columns = [
  { title: '序号', key: 'number' },
  { title: '车牌号码', dataIndex: 'carNumber', key: 'carNumber' },
  { title: '收费类型', dataIndex: 'chargeType', key: 'chargeType' },
  { title: '停车总时长', dataIndex: 'parkingTime', key: 'parkingTime' },
  { title: '缴纳费用（元）', dataIndex: 'actualCharge', key: 'actualCharge' },
  { title: '缴纳状态', dataIndex: 'paymentStatus', key: 'paymentStatus' },
  { title: '缴纳方式', dataIndex: 'paymentMethod', key: 'paymentMethod' },
  { title: '缴纳时间', dataIndex: 'paymentTime', key: 'paymentTime' }
]

//总计
const total = ref('')
const page = ref(1)
const pageSize = ref(10)

//渲染列表数据
const data = ref(null)
const getParkManagementListApi = async () => {
  const res = await getParkManagementList({page:page.value,pageSize:pageSize.value})
  total.value = res.total
  data.value = res.rows
}
//改变页码
const onShowSizeChange = (current, size) => {
  page.value = current
  pageSize.value = size
  getParkManagementListApi()
};
const onPageChange = (val) => {
  page.value = val
  getParkManagementListApi()
};
//页面加载获取数据
onMounted(() => {
  getParkManagementListApi()
})
</script>
<template>
  <div class="search_table">
    <!-- 头部搜索框 -->
    <div class="search-table__header">
      <!-- 车牌号码 -->
      <div class="number">
        <label>车牌号码：</label>
        <a-input v-model:value="value" placeholder="请输入车牌号码" />
      </div>
      <!-- 缴纳状态 -->
      <div class="state">
        <label>缴纳状态：</label>
        <a-select
          v-model:value="value2"
          :options="options"
          mode="multiple"
          :size="size"
          placeholder="未选择"
          style="width: 220px"
          @popupScroll="popupScroll"
        ></a-select>
      </div>
      <!-- 查询按钮 -->
      <a-button type="primary">查询</a-button>
    </div>
    <!-- 列表内容 -->
    <div class="search-table__main">
      <a-table bordered:false :dataSource="data" :pagination="false" :ellipsis="true" :columns="columns">
        <template #bodyCell="{ column,text, index }">
          <template v-if="column.key === 'number'">
            <span>{{ (page - 1) * pageSize + index + 1 }}</span>
          </template>
          <!-- 判断收费类型 -->
          <template v-if="column.dataIndex==='chargeType'">
            <span>{{ text === 'card' ? '月卡' : '临时停车' }}</span>
          </template>
          <!-- 判断缴纳状态 -->
          <template v-if="column.dataIndex==='paymentStatus'">
            <span>{{ text === '0' ? '未缴纳' : '已缴纳' }}</span>
          </template>
          <!-- 判断支付方式 -->
          <template v-if="column.dataIndex==='paymentMethod'">
            {{ text === 'Alipay' ? '支付宝' : data.paymentMethod === 'WeChat' ? '微信' : '线下' }}
          </template>
        </template>
      </a-table>
    </div>
    <div id="components-pagination-demo-mini">
      <a-pagination @change="onPageChange" @showSizeChange="onShowSizeChange" size="small" :total="total" show-size-changer show-quick-jumper :show-total="total => `共 ${total} 条`"/>
    </div>
  </div>
</template>
<style scoped>
.search_table {
  padding: 20px 50px 0;
  background-color: #fff;
}
.search-table__header {
  width: 1196px;
  height: 52px;
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(237, 237, 237, 0.9);
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
#components-pagination-demo-mini{
  margin-top: 20px;
  float: right;
  padding-bottom: 20px;
}
</style>
