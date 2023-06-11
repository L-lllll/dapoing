<script setup>
import {onMounted, ref} from 'vue'
// import  { SelectProps } from 'ant-design-vue';
import {getRuleList} from '../../api/stop.js'
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
}

  //页面加载获取数据
onMounted(()=> {
  getRuleListApi()
})


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
      <a-table bordered:false :dataSource="data" :columns="columns">
        <template #bodyCell="{ column,index }">
          <template v-if="column.dataIndex === 'operate'">
           <a-button type="link" style="padding: 4px 15px 4px 0;">编辑</a-button>
           <a-button type="link" style="padding: 4px 15px 4px 0;">删除</a-button>
          </template>
          <template v-if="column.key === 'number'">
            <span>{{ (list.page - 1) * list.pageSize +index +1}}</span>
          </template>
          <template v-if="column.dataIndex === 'chargeType'">
            {{ data.chargeType === 'duration' ? '时长收费' : data.chargeType === 'turn' ? '按次收费' : '分段收费' }}
          </template>
        </template>
      </a-table>
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
