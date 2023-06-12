<script setup>
import { ref, onMounted } from 'vue';
import { getMouthList, getMouthCard,delMouthList } from '../../api/areaPage'
import { Modal, message } from 'ant-design-vue'

const columns = [
  {
    title: '序号',
    width: 44,
    dataIndex: 'name',
    key: 'name',
    customCell: () => {
      return {
        style: {
          'min-width': "44px",
          "white-space": "nowrap",
          overflow: "hidden",
        }
      };
    }

  },
  {
    title: '车主名称',
    width: 72,
    dataIndex: 'personName',
    key: 'personName',
    customCell: () => {
      return {
        style: {
          'min-width': "72px",
          "white-space": "nowrap",
          "overflow": "hidden",
        }
      };
    }
  },
  {
    title: '联系方式',
    width: 100,
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    customCell: () => {
      return {
        style: {
          'min-width': "100px",
          "white-space": "nowrap",
          "overflow": "hidden",
        }
      };
    }
  },
  {
    title: '车牌号码',
    width: 85,
    dataIndex: 'carNumber',
    customCell: () => {
      return {
        style: {
          'min-width': "85px",
          "white-space": "nowrap",
          "overflow": "hidden",
          
        }
      };
    }
  },
  {
    title: '车辆品牌',
    width: 72,
    dataIndex: 'carBrand',
    customCell: () => {
      return {
        style: {
          'min-width': "72px",
          "white-space": "nowrap",
          "overflow": "hidden",
        }
      };
    }
  },
  {
    title: '剩余有效天数',
    dataIndex: 'totalEffectiveDate',
    width: 100,
    customCell: () => {
      return {
        style: {
          'min-width': "100px",
          "white-space": "nowrap",
          // "overflow": "hidden",

        }
      };
    }
  },
  {
    title: '状态',
    dataIndex: 'cardStatus',
    width: 44,
    customCell: () => {
      return {
        style: {
          'min-width': "44px",
          "white-space": "nowrap",
          // "overflow": "hidden",

        }
      };
    }
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    dataIndex: 'operation',
    width: 192,
    // slots: {
    //   customRender: 'action',
    // },
    customCell: () => {
      return {
        style: {
          'min-width': "192px",
          "white-space": "nowrap",
          "overflow": "hidden",
        }
      };
    }
  },
];
const mouthList = ref([])
// 获取月卡信息
const getMouthCardAPI = async() => {
  const res = await getMouthCard()
  console.log(res)
  infoData.value = res
}
const infoData = ref({})
const total = ref(null)
// 获取数据列表
const getMouthListAPI = async() => {
  const res = await getMouthList(mouthForm.value)
  total.value = res.total
  mouthList.value = res.rows
  console.log(mouthList.value)
}
// 删除月卡功能
const delMouthAPI = (id) => {
  console.log(id);
  
  Modal.confirm({
    content: '是否确定删除月卡',
    async onOk(){
      await delMouthList(id)
    if(id !== 1&& id !== 2 && id !== 3 && id !== 4 && id !== 5){
      message.success('删除月卡成功')
    }
  }
})
getMouthListAPI()
}
// 搜索功能
const serchList = () => {
  // console.log(mouthForm.value)
  getMouthListAPI()
}
const mouthForm = ref({
  page: 1,
  pageSize: 10,
  carNumber: '',
  personName: '',
  cardStatus: undefined
})
onMounted(() => {
  getMouthListAPI()
  getMouthCardAPI()
})
</script>
<template>
  <div style="padding: 20px 20px 0;overflow: hidden">
    <a-form>
      <a-form-item label="车牌号码">
        <a-input v-model:value="mouthForm.carNumber" placeholder="请输入车牌号码" style="width: 220px;margin-right: 15px;"></a-input>
      </a-form-item>
      <a-form-item label="车主姓名">
        <a-input v-model:value="mouthForm.personName" placeholder="请输入车主姓名" style="width: 220px;margin-right: 15px;"></a-input>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="mouthForm.cardStatus" placeholder="未选择" style="width: 220px;margin-right: 15px;">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="0">可用</a-select-option>
          <a-select-option value="1">已过期</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button style="border-radius: 4px;" type="primary" @click="serchList">查询</a-button>
      </a-form-item>
    </a-form>
    <div class="box">
      <a-button type="primary" style="margin-right: 10px;border-radius: 5px;">添加月卡</a-button>
      <a-button type="primary" style="margin-right: 10px;border-radius: 5px;">批量删除</a-button>
      <div class="info"><span class="icon">i</span> 本园区共计 {{infoData.spaceNumber}} 个车位, 月卡用户 {{infoData.cardCount}} 人, 车位占有率 {{ infoData.proportion }}</div>
    </div>
    <a-table
     :bordered="false" 
     :pagination="false" 
     :ellipsis="true" 
     :columns="columns" 
     :data-source="mouthList"
     :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
     >
        <template #bodyCell="{ record,column,index }">
          <template v-if="column.dataIndex === 'name'">
           <span>{{ (mouthForm.page - 1) * mouthForm.pageSize + index + 1  }}</span>
          </template>
          <template v-if="column.dataIndex === 'cardStatus'">
           <span>{{ record.cardStatus === 0 ? '可用' : '已过期' }}</span>
          </template>
          <div v-if="column.dataIndex === 'operation'">
            <a-button type="link">续费</a-button>
            <a-button type="link">查看</a-button>
            <a-button type="link">编辑</a-button>
            <a-button type="link" @click="delMouthAPI(record.id)">删除</a-button>
          </div>
        </template>
      </a-table>
      <div id="components-pagination-demo-mini">
        <a-pagination @change="onPageChange" @showSizeChange="onShowSizeChange" size="small" :total="total" show-size-changer :show-total="total => `共 ${total} 条`"/>
      </div>
  </div>
</template>
<style scoped>
:deep(.ant-table-thead > tr > th){
  padding: 8px !important;
  height: 48px;
  background-color: #f4f6f8;
  overflow: hidden;
}
:deep(.ant-table-cell){
  padding: 8px;
  height: 48px;
  overflow: hidden;
}
.ant-btn-link{
  padding: 4px 15px 4px 0;
}
:deep(.ant-table-content){
  overflow: hidden;
  min-width: 100px;
}
:deep(.ant-form){
  /* display: flex; */
  margin-bottom: 18px;
  border-bottom: 1px solid #efefef;
  overflow: hidden;
}
.ant-form-item{
  float: left;
}
.info{
  margin-bottom: 20px;
  float: right;
  /* display: inline-block; */
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  padding: 8px 15px;
}
#components-pagination-demo-mini{
  margin-top: 18px;
  float: right;
  margin-bottom: 20px;
}
.icon{
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #1890ff;
  display:inline-block;
  color: #fff;
  line-height: 14px;
  text-align: center;
  font-size: 12px;
  margin-right: 5px;
}
</style>