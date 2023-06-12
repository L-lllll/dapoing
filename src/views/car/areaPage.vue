<script setup>
import { ref, onMounted } from 'vue';
import {getAreaList,delAreaList, getSelectList, addAreaList,updateAreaList} from '../../api/areaPage'
import { Modal, message } from 'ant-design-vue'
// import { defineComponent } from 'vue';
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
    title: '区域名称',
    width: 87,
    dataIndex: 'areaName',
    key: 'areaName',
    customCell: () => {
      return {
        style: {
          'min-width': "87px",
          "white-space": "nowrap",
          "overflow": "hidden",
        }
      };
    }
  },
  {
    title: '车位数 (个)',
    width: 100,
    dataIndex: 'spaceNumber',
    key: 'spaceNumber',
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
    title: '面积 (m²)',
    width: 86,
    dataIndex: 'areaProportion',
    customCell: () => {
      return {
        style: {
          'min-width': "86px",
          "white-space": "nowrap",
          "overflow": "hidden",
          
        }
      };
    }
  },
  {
    title: '计费规则',
    width: 86,
    dataIndex: 'ruleName',
    customCell: () => {
      return {
        style: {
          'min-width': "86px",
          "white-space": "nowrap",
          "overflow": "hidden",
        }
      };
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 72,
    customCell: () => {
      return {
        style: {
          'min-width': "72px",
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
    width: 100,
    // slots: {
    //   customRender: 'action',
    // },
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
];
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const getAreaListAPI = async() => {
  const res = await getAreaList({page: page.value,pageSize: pageSize.value})
  // console.log(res)
  data.value = res.rows
  total.value = res.total
}
const ruleRef = ref(null)
const onShowSizeChange = (current, size) => {
  page.value = current
  pageSize.value = size
  getAreaListAPI()
};
const onPageChange = (val) => {
  page.value = val
  getAreaListAPI()
};
const getSeleList = async() => {
  const res = await getSelectList()
  selectList.value = res
  // console.log(selectList.value)
}
const delAreaListAPI = (id) => {
// console.log(id)
Modal.confirm({
  title: '提示',
  content: '是否确认删除当前区域?',
  async onOk(){
    await delAreaList(id)
    message.success('区域已删除')
    getAreaListAPI()
  }
})
}
const addAreaListAPI = (record) => {
  console.log(record)
  title.value = '编辑区域'
  ruleList.value.areaName = record.areaName
  ruleList.value.id = record.id
  ruleList.value.spaceNumber = record.spaceNumber
  ruleList.value.areaProportion = record.areaProportion
  ruleList.value.ruleId = record.ruleId
  ruleList.value.remark = record.remark
  showDialog.value = true
}
const close = () => {
  ruleRef.value.resetFields()
  showDialog.value = false
}
const addArea = () => {
  ruleList.value = {
  areaName:'',
  spaceNumber: '',
  areaProportion: '',
  ruleId: undefined,
  remark: ''
}
title.value = '添加区域'
showDialog.value = true
}
const selectList = ref([])
const createCreative = ref(null);
const data = ref([])
const showDialog = ref(false)
const ruleList = ref({
  areaName:'',
  spaceNumber: '',
  areaProportion: '',
  ruleId: '',
  remark: ''
})
const title = ref('')
const submit = async() => {
  console.log(ruleList)
  if(ruleList.value.id){
    await updateAreaList(ruleList.value)
    message.success('修改区域成功')
  } else {
    await addAreaList(ruleList.value)
    message.success('添加区域成功')
  }
  getAreaListAPI()
  close()
}
onMounted(() => {
  getSeleList()
  getAreaListAPI()
})
</script>
<template>
  <div style="padding: 20px 20px 0;overflow: hidden">
    <a-button style="border-radius: 4px;margin-bottom: 20px;" type="primary" @click="addArea">添加区域</a-button>
    <div style="width: 100%;height: 100%;background-color: #fff;">
      <a-table :bordered="false" :pagination="false" :ellipsis="true" :columns="columns" :data-source="data">
        <template #bodyCell="{ record,column,index }">
          <template v-if="column.dataIndex === 'name'">
           <span>{{ (page - 1) * pageSize + index + 1  }}</span>
          </template>
          <template v-if="column.dataIndex === 'remark'">
           <span>{{ record.remark ? record.remark : '--' }}</span>
          </template>
          <div v-if="column.dataIndex === 'operation'">
            <a-button type="link" @click="addAreaListAPI(record)">编辑</a-button>
            <a-button type="link" @click="delAreaListAPI(record.id)">删除</a-button>
          </div>
        </template>
      </a-table>
    </div>
    <div id="components-pagination-demo-mini">
      <a-pagination @change="onPageChange" @showSizeChange="onShowSizeChange" size="small" :total="total" show-size-changer show-quick-jumper :show-total="total => `共 ${total} 条`"/>
    </div>
  </div>
  <div ref="createCreative">
    <a-modal
    :getContainer="() => createCreative"
     :visible="showDialog" 
     :title="title"
     @cancel="close"
     @ok="submit"
     destroyOnClose>
      <a-form ref="ruleRef" layout="vertical" :model="ruleList">
        <a-form-item label="区域名称" name="areaName" :rules="[{ required: true, message: '区域名称不能为空', trigger: 'blur' }]">
            <a-input v-model:value="ruleList.areaName" placeholder="请输入区域名称"></a-input>
        </a-form-item>
        <a-form-item label="车位数 (个)" name="spaceNumber" :rules="[{ required: true, message: '车位数不能为空', trigger: 'blur' }]">
          <a-input v-model:value="ruleList.spaceNumber" placeholder="请输入车位个数"></a-input>
        </a-form-item>
        <a-form-item label="面积 (m²)" name="areaProportion" :rules="[{ required: true, message: '面积不能为空', trigger: 'blur' }]">
          <a-input v-model:value="ruleList.areaProportion" placeholder="请输入面积" addonAfter="m²"></a-input>
        </a-form-item>
        <a-form-item label="关联计费规则" name="ruleId" :rules="[{ required: true, message: '计费规则不能为空', trigger: 'blur' }]">
          <a-select
          placeholder="请选择"
          v-model:value="ruleList.ruleId"
          :options="selectList"
          :field-names="{label: 'ruleName', value: 'ruleId'}"
          >
          </a-select>
        </a-form-item>
        <a-form-item label="备注" name="remark">
            <a-textarea v-model:value="ruleList.remark" placeholder="请输入备注"></a-textarea>
        </a-form-item>
        
      </a-form>
    </a-modal>
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
:deep(.ant-table-content){
  overflow: hidden;
  min-width: 100px;
}
#components-pagination-demo-mini{
  margin-top: 18px;
  float: right;
  margin-bottom: 20px;
}
.ant-btn-link{
  padding: 4px 15px 4px 0;
}
:deep(.ant-modal-header){
  margin-bottom:0px;
}
:deep(.ant-modal-root .ant-modal .ant-modal-content .ant-btn){
  border-radius: 8px;
  background-color: #f2f3f5;
  color: #71747a;
}
:deep(.ant-modal-footer .ant-btn + .ant-btn:not(.ant-dropdown-trigger)){
  background: #4770FF;
    color: #fff;
}
:deep(.ant-modal-content){
  border-radius: 10px;
  overflow: hidden;
  width: 580px;
  /* height: 608px; */
}
:deep(.ant-modal-body){
  padding: 20px 100px;
}
:deep(.ant-modal-footer){
  background-color: #f4f6f8 !important;
}
</style>