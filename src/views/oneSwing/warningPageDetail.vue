<script setup>

</script>
<template>
 <div class="main">
 <div class="warnTitle">
    <a-form type="flex" justify="start">   
        <a-row :gutter="24">
            <a-col :span="8">
            <a-form-item >
              告警详情
         </a-form-item>
     </a-col>
    </a-row>
    </a-form>
    </div> 
    <div class="warnDetail">
     <a-form type="flex" justify="space-between">
        <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item 
                name="warningTime"
                :label="`告警时间`" >
              {{ `时间`}}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
              name="poleName"
                :label="`一体杆名称`" >
                {{ `名称` }}
              </a-form-item>
            </a-col>
            </a-row>
            <a-row>
            <a-col :span="8">
              <a-form-item
                name="areaName"
                :label="`告警区域`">
               {{ `区域` }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="poleNumber"
                :label="`一体杆编号`">
               {{ `区域` }}
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item
              name="errorType"
                :label="`故障类型`">
               {{ `区域` }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                name="handleStatus"
                :label="`处置状态`">
               {{ `区域` }}
              </a-form-item>
            </a-col>
          </a-row>
      </a-form>
    </div>  
    <div class="warnTitle2">
     <a-form type="flex" justify="start">   
        <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item >
              告警详情
              </a-form-item>
            </a-col>
    </a-row>
    </a-form>  
</div> 
    <div class="warn-work">
      <a-form type="flex" justify="space-between">
        <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item 
              name="handleUser"
                :label="`处理人`" >
              {{ `时间`}}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
              name="phonenumber"
                :label="`联系方式`" >
                {{ `名称` }}
              </a-form-item>
            </a-col>
            </a-row>
            <a-row>
            <a-col :span="8">
              <a-form-item
              name="handleResult"
                :label="`处理结果`">
               {{ `区域` }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
              name="handleTime"
                :label="`完成时间`">
               {{ `区域` }}
              </a-form-item>
            </a-col>
          </a-row>
      </a-form>
    </div> 
    </div>
  </template>
<style>
.main{
    background-color: rgb(244, 246, 246)
}

.warnTitle{
    background-color: #fff;
    padding-top: 15px;
    padding-left: 10px;
}
.warnDetail{
    
  padding: 0px 65px 24px;
  background-color: #fff;
 padding-left: 150px;
 margin-bottom: 30px;
}
.warn-work{
padding: 0px 65px 24px;
  background-color: #fff;
  height: 200px;
  padding-left: 150px;

}
.warnTitle2{
    padding-top: 10px;
    padding-left: 10px;
     margin-top: 10px;
    background-color: #fff;

}
</style>
