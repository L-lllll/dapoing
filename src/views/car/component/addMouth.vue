<script setup>
import {ref} from 'vue'
import {ArrowLeftOutlined,CalendarOutlined} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'; 
import { addMouthList } from '../../../api/areaPage.js'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue';
const router = useRouter()
// 返回
const goback = () => {
  router.go(-1)
}
// 表单数据
const formData = ref({
    personName: undefined, // 车主姓名
    phoneNumber: undefined, // 联系方式
    carNumber: undefined, // 车牌号码
    carBrand: undefined, // 车辆品牌
    cardStartDate: undefined, // 有效时间开始
    cardEndDate: undefined, // 有效时间结束
    paymentAmount: undefined, // 支付金额
    paymentMethod: undefined, // 支付方式
})
// 日期选择
const onChange = (date, dateString) => {
    console.log(date, dateString);
    formData.value.cardStartDate = dateString[0]
    formData.value.cardEndDate = dateString[1]
};
// 禁止选择之前日期
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf("day");
};
// 添加月卡发送请求
const addMouthAPI = async() => {
    // console.log(formData.value)
    try {
        await addMouthList(formData.value)
        goback()
        message.success('添加月卡成功')
    } catch {
        console.log(1)
    }
}
// 重置表单
const form = ref(null)
const form1 = ref(null)
const resetForm = () => {
    formData.value = {
    personName: undefined, 
    phoneNumber: undefined, 
    carNumber: undefined, 
    carBrand: undefined, 
    cardStartDate: undefined, 
    cardEndDate: undefined, 
    paymentAmount: undefined, 
    paymentMethod: undefined, 
    }
    form.value.resetFields()
    form1.value.resetFields()
}
</script>

<template>
    <a-layout>
    <a-layout-header style="background-color: #fff;padding: 0 20px;min-width: 1116px;">
      <span class="back" @click="goback">
        <arrow-left-outlined style="margin-right: 8px;"/>
        返回
      </span>
      <span style="font-size: 16px;color: #dcdfe5;margin: 0 10px;">|</span>
      <span style="font-size: 16px;">添加月卡</span>
      <span style="float: right;font-size: 16px;">黑马管理员</span>
    </a-layout-header>
    <a-layout-content class="content">
        <a-card title="车辆信息" :bordered="false">
            <a-form ref="form" class="first" :model="formData">
                <a-row>
                    <a-form-item label="车主姓名" name="personName" :rules="[{ required: true, message: '请输入车主姓名!', trigger: 'blur' }]">
                        <a-input v-model:value="formData.personName" placeholder="请输入车主姓名"></a-input>
                    </a-form-item>
                    <a-form-item label="联系方式" name="phoneNumber" :rules="[{ required: true, message: '请输入联系方式!', trigger: 'blur' }, { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }]">
                        <a-input v-model:value="formData.phoneNumber" placeholder="请输入联系方式"></a-input>
                    </a-form-item>
                </a-row>
                <a-row>
                    <a-form-item label="车牌号码" name="carNumber" :rules="[{ required: true, message: '请输入车牌号码!', trigger: 'blur' }, { pattern: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/, message: '请输入正确的车牌号', trigger: 'blur' }]">
                        <a-input v-model:value="formData.carNumber" placeholder="请输入车牌号码"></a-input>
                    </a-form-item>
                    <a-form-item label="车辆品牌" name="carBrand" :rules="[{ required: true, message: '请输入车辆品牌!', trigger: 'blur' }]">
                        <a-input v-model:value="formData.carBrand" placeholder="请输入车辆品牌"></a-input>
                    </a-form-item>
                </a-row>
            </a-form>
        </a-card>
        <a-card title="最近一次月卡缴费信息" :bordered="false" class="card">
            <a-form ref="form1" class="first" :model="formData">
                <a-row>
                    <a-form-item label="有效日期" name="cardEndDate" :rules="[{ required: true, message: '请输入有效日期!', trigger: 'blur' }]">
                        <a-range-picker :disabled-date="disabledDate" @change="onChange">
                            <template #suffixIcon>
                                <CalendarOutlined />
                            </template>
                        </a-range-picker>
                    </a-form-item>
                    <a-form-item label="支付金额" name="paymentAmount" :rules="[{ required: true, message: '请输入支付金额!', trigger: 'blur' }]">
                        <a-input v-model:value="formData.paymentAmount" placeholder="请输入支付金额"></a-input>
                    </a-form-item>
                </a-row>
                <a-row>
                    <a-form-item label="支付方式" name="paymentMethod" :rules="[{ required: true, message: '请选择支付方式!', trigger: 'blur' }]">
                        <a-select v-model:value="formData.paymentMethod" placeholder="请选择支付方式">
                            <a-select-option value="Alipay">支付宝</a-select-option>
                            <a-select-option value="WeChat">微信</a-select-option>
                            <a-select-option value="Cash">现金支付</a-select-option>
                        </a-select>
                    </a-form-item>
                    
                </a-row>
            </a-form>
        </a-card>
    </a-layout-content>
    <a-layout-footer class="footer">
        <a-space>
            <a-button @click="resetForm">重置</a-button>
            <a-button type="primary" @click="addMouthAPI">确定</a-button>
        </a-space>
    </a-layout-footer>
  </a-layout>
</template>

<style lang="less" scoped>
:deep(.content){
  height: 793px;
  min-width: 1116px;
  padding: 20px 130px;
  .enterpriseInfo{
    background-color: #fff;
    margin-bottom: 20px;
    position: relative;
    padding: 60px 65px 24px;
    .title{
      font-size: 14px;
      font-weight: 500;
      position: absolute;
      top: 20px;
      left: 10px;
      .side{
        content: "";
        height: 80%;
        width: 2px;
        background-color: #4770ff;
        position: absolute;
        left: -10px;
        top: 2px;
      }
    }
  }
}
.card{
    margin-top: 20px;
}
.footer{
    height: 80px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    min-width: 1116px;
    display: flex;
    justify-content: center;
}
:deep(.ant-form label){
    width: 80px;
    margin-left: 50px;
}
.ant-form-item{
    width: 48%;
}
.back{
  width: 56px;
  font-size: 16px;
  cursor: pointer;
}
</style>