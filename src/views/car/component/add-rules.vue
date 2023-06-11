<script setup>

//使用defineProps方法来接收props
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  }
})
console.log(props.showDialog)


</script>
<template>
  <a-modal :visible="props.showDialog" title="添加计费规则">

  </a-modal>
</template>

<style lang="less" scoped>

</style>