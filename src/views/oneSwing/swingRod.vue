<script setup>
import { ref, onMounted, reactive,computed } from 'vue'
import { getOneList, delOne, addOneList,updateOne } from '@/api/oneSwing.js'
import { Modal,message } from 'ant-design-vue'
const list = ref([])
const options = ref([])
const showDialog = ref(false)
const showEditDialog = ref(false)
const formRef = ref(null)
const getOneListAPI = async () => {
  const { rows, total } = await getOneList(pageParams)
  // const list = data.data.rows
  // console.log(rows)
  list.value = rows
  options.value = rows
  pageParams.total = total
}
const columns = [
  {
    title: '序号',
    customRender({ index }) {
      return (pageParams.page - 1) * pageParams.pagesize + index + 1
    }
  },
  { title: '一体杆名称', dataIndex: 'poleName', key: 'state' },
  { title: '一体杆编号', dataIndex: 'poleNumber', key: 'poleNumber' },
  { title: '一体杆IP', dataIndex: 'poleIp', key: 'poleIp' },
  { title: '安装区域', dataIndex: 'areaName', key: 'areaName' },
  { title: '一体杆类型', dataIndex: 'poleType', key: 'poleType' },
  { title: '运行状态', dataIndex: 'poleStatus', key: 'poleStatus' },
  { title: '操作', dataIndex: 'operate' }
]
const pageParams = reactive({
  page: 1,
  pagesize: 10,
  total: 0,
  poleName: '',
  poleNumber: '',
  poleStatus: ''
})
onMounted(async () => {
  getOneListAPI()
  
})
const changePage = (page, pagesize, total) => {
  pageParams.page = page
  pageParams.pagesize = pagesize
  pageParams.total = total
  getOneListAPI()
}
// 删除
const delOneAPI = (id) => {
  Modal.confirm({
    content: '是否确认删除当前选中的一体杆?',
    async onOk() {
      await delOne(id)
      getOneListAPI()
    }
  })
}

const poleStatus = [
  {
    label: '全部',
    value: '0'
  },
  {
    label: '正常',
    value: '0'
  },
  {
    label: '异常',
    value: '1'
  }
]
const showTitle = computed(() => {
    return formData.value.id ? '编辑一体杆' : '添加一体杆'
  })
const close = () => {
  formRef.value.resetFields() 
  // editRows.value.resetFields() 
  showDialog.value = false
  showEditDialog.value = false
}
// 表单校验
const formData = ref({
  poleName: '',
  poleNumber: '',
  poleIp: '',
  areaId:'',
  poleType: '',
  areaName: ''
})
const rules = {
  poleName: [{ required: true, message: '请输入一体杆名称', trigger: 'change' }],
  poleNumber: [{ required: true, message: '请输入一体杆编号', trigger: 'change' }],
  poleIp: [{ required: true, message: '请输入一体杆IP', trigger: 'change' }],
  areaId: [{ required: true, message: '请选择关联区域', trigger: 'change' }],
  poleType: [{ required: true, message: '请选择一体杆类型', trigger: 'change' }]
}
const editRows = ref({
  id:'',
  poleName: '',
  poleNumber: '',
  poleIp: '',
  areaId:'',
  poleType: '',
  areaName: ''
})
const editOneAPI = async(record) => {
  showEditDialog.value = true
  editRows.value.id = record.id
  editRows.value.poleName = record.poleName
  editRows.value.poleNumber = record.poleNumber
  editRows.value.poleIp = record.poleIp
  editRows.value.areaId = record.areaId
  editRows.value.poleType = record.poleType
  editRows.value.areaName = record.areaName
  console.log(record)
  // await updateOne(id)
  
}
const onFinished = async (values) => {
  await addOneList(values)
  close() // 关闭弹层
}
const onFinish = async (editRows) =>{
  await updateOne(editRows)
  console.log(editRows)
  close() 
}
const delId = ref('')
// 获取选中行的id
const rowSelection = {
 onChange: (selectedRowKeys) => {
  console.log(`1: ${selectedRowKeys}`, '选中的值: ');
  delId.value = `${selectedRowKeys}`
 }
};
const delSome = ()=>{
   if(!delId.value) {
  message.info('请选择月卡')
 } else {
  Modal.confirm({
  content: '是否确定删除月卡',
  async onOk(){
   if(delId.value.includes(1) || delId.value.includes(2) || delId.value.includes(3) || delId.value.includes(4) || delId.value.includes(5)){
    message.error('演示数据不允许操作')
   } else {
    await delOne(delId)
    message.success('删除月卡成功')
   }
  }
 })
 }
}
</script>
<template>
  <div class="main">
    <div class="main-top">
      <a-form type="flex" justify="space-between" style="border-bottom: 1px solid #e3e3e3">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item :label="`添加一体杆`" name="poleName">
              <a-input placeholder="请输入一体杆名称" v-model:value="pageParams.poleName" style="width: 100%"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="`一体杆编号`" name="poleNuber">
              <a-input placeholder="请输入一体杆编号" v-model:value="pageParams.poleNumber"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item :label="`运行状态`" name="poleStatus" >
              <a-select :options="poleStatus" v-model:value="pageParams.poleStatus"  placeholder="请选择一体杆状态" ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-button type="primary" html-type="submit" @click="getOneListAPI">查询</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="search-button">
      <a-button
        type="primary"
        style="margin-right: 20px; border-radius: 5px"
        @click="showDialog = true"
        >添加一体杆</a-button
      >
      <a-button style="border-radius: 5px" @click="delSome">批量删除</a-button>
    </div>
    <a-table
      :columns="columns"
      :dataSource="list"
      checkStrictly
      :pagination="{
        current: pageParams.page,
        pageSize: pageParams.pagesize,
        total: pageParams.total,
        onChange: changePage,
       }"
       :row-selection="rowSelection"
        rowKey="id"
    >
    <!-- :row-selection="{ selectedRowKeys:selectedRowKeys }" -->
    <!-- , onChange: onSelectChange  -->
      <template #bodyCell="{ record, column }">
        <template v-if="column.dataIndex === 'operate'">
          <a-space>
            <a-button type="primary" size="small"  @click="editOneAPI(record)">编辑</a-button>
            <a-button size="small" @click="delOneAPI(record.id)">删除</a-button>
          </a-space>
        </template>
        <template v-if="column.dataIndex === 'poleStatus'">
          <span v-if="record.poleStatus === 0">正常</span>
          <span v-if="record.poleStatus === 1">异常</span>
        </template>
        <template v-if="column.dataIndex === 'poleType'">
          <span v-if="record.poleType === 'entrance'">入口</span>
          <span v-if="record.poleType === 'export'">出口</span>
          <span v-if="record.poleType === 'center'"></span>
        </template>
      </template>
    </a-table>
    <div class="ant-modal-content">
      <a-modal :footer="null" :visible="showDialog" :title="showTitle" @cancel="close">
        <a-form ref="formRef" :model="formData" :rules="rules" @finish="onFinished">
          <a-form-item name="poleName" label="一体杆名称" style="display: block">
            <a-input v-model:value="formData.poleName" placeholder="请输入一体杆名称"></a-input>
          </a-form-item>
          <a-form-item name="poleNumber" label="一体杆编号" style="display: block">
            <a-input v-model:value="formData.poleNumber" placeholder="请输入一体杆编号"></a-input>
          </a-form-item>
          <a-form-item name="poleIp" label="一体杆IP" style="display: block">
            <a-input v-model:value="formData.poleIp" placeholder="请输入一体杆IP"></a-input>
          </a-form-item>
          <a-form-item name="areaId" label="关联区域" style="display: block">
            <a-select
              :field-names="{ label: 'areaName', value: 'areaId' }"
              v-model:value="formData.areaId"
              show-search
              placeholder="请选择关联区域"
              :options="options"
            ></a-select>
          </a-form-item>
          <a-form-item name="poleType" label="一体杆类型" style="display: block">
            <a-select v-model:value="formData.poleType" placeholder="请选择一体杆类型">
              <a-select-option :value="'entrance'">入口</a-select-option>
              <a-select-option :value="'export'">出口</a-select-option>
            </a-select>
          </a-form-item>
          <div class="modal-footer">
            <a-form-item type="flex" justify="center">
              <a-row type="flex" justify="end">
                <a-space>
                  <a-button @click="close">取消</a-button>
                  <a-button type="primary" html-type="submit">确定</a-button>
                </a-space>
              </a-row>
            </a-form-item>
          </div>
        </a-form>
      </a-modal>
    </div>
    <div class="ant-modal-eidtcontent">
      <a-modal :footer="null" :visible="showEditDialog" title="编辑一体杆" @cancel="close">
        <a-form ref="formRef" :model="editRows" :rules="rules" @finish="onFinish">
          <a-form-item name="poleName" label="一体杆名称" style="display: block">
            <a-input v-model:value="editRows.poleName" placeholder="请输入一体杆名称"></a-input>
          </a-form-item>
          <a-form-item name="poleNumber" label="一体杆编号" style="display: block">
            <a-input v-model:value="editRows.poleNumber" placeholder="请输入一体杆编号" :disabled="true"></a-input>
          </a-form-item>
          <a-form-item name="poleIp" label="一体杆IP" style="display: block">
            <a-input v-model:value="editRows.poleIp" placeholder="请输入一体杆IP"></a-input>
          </a-form-item>
          <a-form-item name="areaId" label="关联区域" style="display: block">
            <a-select
              :field-names="{ label: 'areaName', value: 'areaId' }"
              v-model:value="editRows.areaId"
              show-search
              placeholder="请选择关联区域"
              :options="options"
            ></a-select>
          </a-form-item>
          <a-form-item name="poleType" label="一体杆类型" style="display: block">
            <a-select v-model:value="editRows.poleType" placeholder="请选择一体杆类型">
              <a-select-option :value="'entrance'">入口</a-select-option>
              <a-select-option :value="'export'">出口</a-select-option>
            </a-select>
          </a-form-item>
          <div class="modal-footer">
            <a-form-item type="flex" justify="center">
              <a-row type="flex" justify="end">
                <a-space>
                  <a-button @click="close">取消</a-button>
                  <a-button type="primary" html-type="submit">确定</a-button>
                </a-space>
              </a-row>
            </a-form-item>
          </div>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<style>
.main-top {
  margin: 20px;
}
.search-button {
  margin: 0px 20px 20px 20px;
  font-size: 12px;
  /* margin-bottom: 20px; */
}
.ant-modal-content {
  padding-left: 40px;
  padding-right: 40px;
}
</style>
