<script setup>
import {message} from 'ant-design-vue'
import { ref,onMounted,computed,watchEffect } from 'vue';
import {getEntrepreneur, getBuilding, getPayment,addBill,getTableList} from '@/api/propertyFee'
// 新增
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  modelId: {
    type: Number,
    default: 0
  }
})
const addFormRef = ref(null)
// 关闭弹窗
const emit = defineEmits(['update:visible', 'addSuccess'])
const close = () => {
  if (!props.modelId) {
    addFormRef.value.resetFields()
    addForm.value = {
      buildingId:null,
      time:[null,null],
    }
  }

  emit('update:visible', false)
}
// entrepreneurList 获取租户下拉列表
const entrepreneurList = ref([])
onMounted(() =>{
  if (props.modelId) {
    getbuil()
  } else {
    getEntrepreneurAPI()
    getBuildingAPI()
  }
})
const getEntrepreneurAPI = async () => {
  entrepreneurList.value = await getEntrepreneur()
}
// 获取楼宇
const buildingList = ref ([])
const getBuildingAPI = async () => {
  buildingList.value = await getBuilding()
}
// 支付方式列表
const paymentMethodList = ref([
  {name:'微信', value:1},
  {name:'支付宝', value:2},
  {name:'现金', value:3}
])
// 获取金额预算
const getPaymentAPI = async () => {
  addForm.value.paymentAmount =  await getPayment({buildingId:addFormData.value.buildingId,startTime:addFormData.value.startTime,endTime:addFormData.value.endTime})
}

// 最终数据
const addFormData = computed(() => {
  return {
    enterpriseId: addForm.value.enterpriseId,
    buildingId: addForm.value.buildingId,
    startTime:addForm?.value?.time[0],
    endTime:addForm?.value?.time[1],
    paymentAmount:addForm.value.paymentAmount,
    paymentMethod:addForm.value.paymentMethod
  }
})
// 绑定载体
let addForm = ref({
  buildingId:null,
  time:[null,null],
  paymentMethod:null
})
// 表单校验
const addFormRules = ref({
  enterpriseId: [{ required: true, message: '请选择租户', trigger: 'blur'}],
  buildingId: [{ required: true, message: ' 请选择租赁楼宇', trigger: 'blur'}],
  time:[{ required: true, message: '请选择缴费周期',trigger: 'blur' }],
  paymentAmount: [{ required: true, message: '请输入支付金额',trigger: 'blur'}],
  paymentMethod: [{ required: true, message: '请选择支付方式',trigger: 'blur'}]
})
// 金额载体
watchEffect(() => {
  if (addForm.value.buildingId && addForm.value.time[0] && addForm.value.time[1]) {
    getPaymentAPI()
  }
})
  // 提交表单
const onFinish = async () => {
  if (!props.modelId) {
    await addFormRef.value.validateFields()
    await addBill(addFormData.value)
    emit('addSuccess')
    message.success('添加成功')
  }
  close()
}

// 查看表单
const modalTitle = ref('添加账单')
if (props.modelId) {
  modalTitle.value = '查看账单'
}
// 获取账单详情
const buil = ref({})
const getbuil = async () => {
  buil.value =  await getTableList(props.modelId)
}
</script>

<template>
  <a-modal
    :visible="props.visible"
    keyboard
    maskClosable
    @cancel="close"
    :title="modalTitle"
    :footer="null"
    width="580px"
  >
    <a-form :model="addForm" @finish="onFinish" ref="addFormRef" :rules="addFormRules" v-if="!props.modelId">
      <a-row>
        <a-form-item label="选择租户" name="enterpriseId">
          <a-select
            v-model:value="addForm.enterpriseId"
            style="width: 100%"
            placeholder="请选择租户"
            :options="entrepreneurList"
            :field-names="{ label: 'name', value: 'id', options: 'children', validateTrigger: 'blur' }"
            :showArrow="false"
          ></a-select>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="租赁楼宇" name='buildingId'>
          <a-select
            v-model:value="addForm.buildingId"
            style="width: 100%"
            placeholder="请选择租赁楼宇"
            :options="buildingList"
            :field-names="{ label: 'name', value: 'id', options: 'children' }"
            :showArrow="false"
          ></a-select>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="缴费周期" name="time" >
          <a-range-picker v-model:value="addForm.time" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" />
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="支付金额" name="paymentAmount">
          <a-input v-model:value="addForm.paymentAmount" disabled placeholder="请输入支付金额"></a-input>
        </a-form-item>
      </a-row>
      <a-row>
        <a-form-item label="支付方式" name="paymentMethod">
          <a-select
            style="width: 100%"
            placeholder="请选择支付方式"
            :options="paymentMethodList"
            :field-names="{ label: 'name', value: 'value', options: 'children' }"
            :showArrow="false"
            v-model:value="addForm.paymentMethod"
          ></a-select>
        </a-form-item>
      </a-row>
    </a-form>
    <ul class="lookBuil" v-else>
      <li><span>租户名称:</span><p>{{ buil.enterpriseName }}</p></li>
      <li><span>租赁楼宇:</span><p>{{ buil.buildingId }}</p></li>
      <li><span>缴费周期:</span><p>{{ buil.startTime }}至{{ buil.endTime }}</p></li>
      <li><span>物业费(元/m<sub>2</sub>):</span><p>{{ buil.propertyFeePrice }}</p></li>
      <li><span>账单金额(元):</span><p>{{ buil.paymentAmount }}</p></li>
      <li><span>支付方式:</span><p>{{ buil.paymentMethodValue }}</p></li>
      <li><span>缴费时间:</span><p>{{ buil.createTime }}</p></li>
    </ul>
    <a-row class="footerBtn" type="flex" justify="end">
      <a-button type="text" @click="close">取消</a-button>
      <a-button type="primary" style="border-radius: 8px;" html-type="submit" @click="onFinish">确定</a-button>
    </a-row>
  </a-modal>
</template>

<style lang="less">
.ant-modal-body {
  padding: 0;
}
.footerBtn {
  background-color: rgb(244 246 248);
  border-radius: 0 0 8px 8px;
  padding: 10px 16px;
  border-top: 1px solid #f0f0f0;
}
.ant-modal-root .ant-modal .ant-modal-content {
  border-radius: 8px;
}
.ant-form-horizontal .ant-form-item-label {
  text-align: left;
}
.ant-modal-header {
  border-bottom: none;
  border-radius: 10px 10px 0 0;
}
.ant-modal .ant-form {
  padding: 20px 100px;
  .ant-row {
    flex-direction: column;
    margin-bottom: 24px;
  }
  .ant-form-horizontal .ant-form-item-label {
    text-align: left;
  }
  .ant-picker {
    width: 100%;
  }
}

.lookBuil {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: center;

  li {
    width: 92%;
    display: flex;
    justify-content: left;
    margin-bottom: 10px;
  }

  span {
    display: inline-block;
    width: 35%;
    margin-right: 5%;
    text-align: right;
    color: #909399;
  }
  p {
    width: 60%;
    text-align: left;
  }
}
</style>
