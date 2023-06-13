<script setup>
import { ref, watchEffect } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  infoForm: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['update:visible'])
const close = () => {
  emit('update:visible', false)
}
const time = ref([])
const dateFormat = 'YYYY-MM-DD'
watchEffect(()=> {
    if (props.visible) {
        // time.value = ref([props.infoForm.endTime, null])
        time.value = ref([dayjs(props.infoForm.endTime, dateFormat)])
        console.log(time.value.value[1])
    }
})
</script>
<template>
  <a-modal 
  :visible="props.visible" 
  @cancel="close" 
  keyboard 
  maskClosable
  :footer="null"
  width="580px"
  title="续租合同"
  >
    <a-form>
        <a-row>
            <a-form-item name="" label="租赁楼宇">
                <a-input disabled v-model:value="infoForm.buildingName"></a-input>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item name="" label="租赁起止时间">
                <a-range-picker v-if="props.visible === true" v-model:value="time" :disabled="[true,false]" />
                {{ time }}
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item name="" label="租赁合同">
                <a-button>上传文件</a-button>
                <p>支持扩展名: .doc,.docx,.pdf, 文件大小不得超过5M</p>
            </a-form-item>
        </a-row>
        <a-row>
            <a-form-item>
                <a-button>取消</a-button>
                <a-button>确认</a-button>
            </a-form-item>
        </a-row>
    </a-form>
  </a-modal>
</template>
<style scoped lang="less">
    
</style>
