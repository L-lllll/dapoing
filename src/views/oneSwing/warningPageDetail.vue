<script setup>
import { useRouter } from 'vue-router'; 
import { getId } from '../../untils/storage';
const list = getId()
const router = useRouter()
// 返回
const goback = () => {
  router.go(-1)
}

// 提交表单
// const formData = ref({
// })


</script>

<template>
    <a-layout>
    <a-layout-header style="background-color: #fff;padding: 0 20px;min-width: 1116px;">
      <span class="back" @click="goback">
        <arrow-left-outlined style="margin-right: 8px;"/>
        返回
      </span>
      <span style="font-size: 16px;color: #dcdfe5;margin: 0 10px;">|</span>
      <span style="font-size: 16px;">告警详情</span>
      <span style="float: right;font-size: 16px;">黑马管理员</span>
    </a-layout-header>
    <a-layout-content class="content">
      <div>
        <a-form>
        <div class="enterpriseInfo">
          <span class="title"><span class="side"></span>告警详情</span>
          <a-row>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="告警时间:" :label-col="{ span: 3 }">
                {{list.warningTime}}
                </a-form-item>
              </a-col>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="体杆名称:" :label-col="{ span: 3 }">
                    {{ list.poleName}}
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="告警区域:" :label-col="{ span: 3 }">
                    {{ list.areaName}}
                </a-form-item>
              </a-col>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="体杆编号:" :label-col="{ span: 3 }">
                    {{ list.handleStatus}}
                </a-form-item>
              </a-col>
            </a-row>
          <a-row>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="故障类型" :label-col="{ span: 3 }">
                {{ list.errorType}}
              </a-form-item>
            </a-col>
            <a-col :span="12" style="padding: 0 16px;">
              <a-form-item label="处置状态" :label-col="{ span: 3 }">
                {{list.handleResult}}
            </a-form-item>
            </a-col>
          </a-row>
        </div>

        <div>
          <div class="enterpriseInfo">
          <span class="title"><span class="side"></span>告警处理</span>
            <a-row>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="处理人:" :label-col="{ span: 3 }">
                    {{list.handleUser}}
                </a-form-item>
              </a-col>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="联系方式:" :label-col="{ span: 3 }">
                    {{list.phonenumber}}
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="处理结果:" :label-col="{ span: 3 }">
                    {{list.handleResult}}
                </a-form-item>
              </a-col>
              <a-col :span="12" style="padding: 0 16px;">
                <a-form-item label="完成时间:" :label-col="{ span: 3 }">
                    {{list.handleTime}}
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-form>
      </div>
    </a-layout-content>
    <!-- <a-layout-footer style="height: 80px;width: 100%;;position: fixed;bottom: 0;background-color: #fff;min-width: 1116px;">Footer</a-layout-footer> -->
  </a-layout>
</template>

<style lang="less" scoped>
:deep(.content){
  height: 793px;
//   min-width: 1116px;
  padding: 20px 130px;
  .enterpriseInfo{
    width: 1250px;
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
.back{
  width: 56px;
  font-size: 16px;
  cursor: pointer;
}
</style>