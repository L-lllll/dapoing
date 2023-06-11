<script setup>
import {onMounted, ref} from 'vue'
import  { Modal, message } from 'ant-design-vue';
import {getRuleList,DelRule} from '../../api/stop.js'
import addRules from './component/add-rules.vue'
//列表title
const columns = [
  { title: '序号', key: 'number' },
  { title: '计费规则编号', dataIndex: 'ruleNumber', key: 'ruleNumber' },
  { title: '计费规则名称', dataIndex: 'ruleName', key: 'ruleName' },
  { title: '免费时长（分钟）', dataIndex: 'freeDuration', key: 'freeDuration' },
  { title: '收费上限（元）', dataIndex: 'chargeCeiling', key: 'chargeCeiling' },
  { title: '计费方式', dataIndex: 'chargeType', key: 'chargeType' },
  { title: '计费规则', dataIndex: 'ruleNameView', key: 'ruleNameView' },
  { title: '操作', dataIndex: 'operate' }
]
//总计
const total = ref('')
const list = ref({
  page: 1,
  pageSize: 10
})
//渲染数据列表
const data = ref(null)
const getRuleListApi = async()=>{
  const res = await getRuleList(list.value)
  total.value = res.total
  data.value = res.rows
  console.log(res);
}

const onPageChange = (page,pageSize) => {
  list.value.page = page
  list.value.pageSize = pageSize
  getRuleListApi()
};

  //页面加载获取数据
onMounted(()=> {
  getRuleListApi()
})
//删除功能
const DelRuleApi = (id) =>{
  Modal.confirm({
    content:'是否确认删除当前计费规则？',
    async onOk(){
      await DelRule(id)
      message.success('删除计费规则成功')
      getRuleListApi()
    }
  })
}
//弹层状态
let showDialog = ref(false)

</script>
<template>
  <div class="search_table">
    <!-- 头部搜索框 -->
    <div class="search-table__header">
      <!-- 查询按钮 -->
      <a-button type="primary" @click="showDialog = true">增加停车计费规则</a-button>
      <!-- 增加停车计费规则弹层 -->
    </div>
    <!-- 列表内容 -->
    <div class="search-table__main">
      <a-table bordered:false :dataSource="data" :pagination="false" :ellipsis="true"  :columns="columns">
        <template #bodyCell="{ column,text,index,record }">
          <template v-if="column.dataIndex === 'operate'">
           <a-button type="link" style="padding: 4px 15px 4px 0;">编辑</a-button>
           <a-button type="link" style="padding: 4px 15px 4px 0;" @click="DelRuleApi(record.id)">删除</a-button>
          </template>
          <template v-if="column.key === 'number'">
            <span>{{ (list.page - 1) * list.pageSize +index +1}}</span>
          </template>
          <template v-if="column.dataIndex === 'chargeType'">
            {{ text === 'duration' ? '时长收费' : text === 'turn' ? '按次收费' : '分段收费' }}
          </template>
        </template>
      </a-table>
    </div>
    <div id="components-pagination-demo-mini">
      <a-pagination @change="onPageChange" @showSizeChange="onShowSizeChange" size="small" :total="total" show-size-changer show-quick-jumper :show-total="total => `共 ${total} 条`"/>
      </div>
    </div>
    <add-rules v-model:showDialog="showDialog"></add-rules>
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
#components-pagination-demo-mini{
  margin-top: 20px;
  float: right;
  padding-bottom: 20px;
}
</style>
