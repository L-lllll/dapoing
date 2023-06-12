<script setup>

</script>
<template>
  <div style="padding: 20px 20px 0;overflow: hidden">
    <a-form class="top">
      <a-form-item label="车牌号码">
        <a-input placeholder="请输入车牌号码" style="width: 220px;margin-right: 15px;"></a-input>
      </a-form-item>
      <a-form-item label="车主姓名">
        <a-input placeholder="请输入车主姓名" style="width: 220px;margin-right: 15px;"></a-input>
      </a-form-item>
      <a-form-item label="状态">
        <a-input placeholder="未选择" style="width: 220px;margin-right: 15px;"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button style="border-radius: 4px;margin-bottom: 20px;" type="primary">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style scoped>
:deep(.ant-form){
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #efefef;
}
</style>