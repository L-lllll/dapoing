<script setup>
//使用defineProps方法来接收props
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <a-modal :visible="props.showDialog" title="添加计费规则">
    <a-form layout="Vertical">
      <a-form-item label="计费规则编号" :label-col="{ span: 5 }" :wrapper-col="{ span: 20 }">
        <a-input placeholder="请输入计费规则编号" />
      </a-form-item>
      <a-form-item label="计费规则名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 20 }">
        <a-input placeholder="请输入计费规则名称" />
      </a-form-item>
      <a-form-item
        label="计算方式（全天收费）"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 20 }"
      >
        <a-radio-group v-model:value="value">
          <a-radio :value="1">时长收费</a-radio>
          <a-radio :value="2">按次收费</a-radio>
          <a-radio :value="3">分段收费</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
/* // :deep(.ant-modal-content){
//   width: 537.6px;
//   height: 615px;
// }
// :deep(.ant-modal-body){
//   width: 538px;
//   height: 509px;
//   padding: 20px 100px;
// } */
</style>
