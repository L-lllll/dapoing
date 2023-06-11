<script setup>
import { addBuilding, getBuildingDetails, updateBuilding } from '@/api/building'
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  }
})
const getBuildingDetailsAPI = async (id) => {
  formData.value = await getBuildingDetails(id)
}
defineExpose({
  getBuildingDetailsAPI
})
const formRef = ref(null)
const formData = ref({
  name: '',
  floors: 0,
  area: 0,
  propertyFeePrice: 0
})
const rules = {
  name: [{ required: true, message: '请输入楼宇名称', trigger: 'blur' }],
  floors: [{ required: true, message: '请输入楼宇层数', trigger: 'blur' }],
  area: [{ required: true, message: '请输入在管面积', trigger: 'blur' }],
  propertyFeePrice: [{ required: true, message: '请输入物业费', trigger: 'blur' }]
}
const emit = defineEmits(['update:showDialog', 'addSuccess'])
const close = () => {
  formData.value = {
    name: '',
    floors: 0,
    area: 0,
    propertyFeePrice: 0
  }
  formRef.value.resetFields() //重置表单
  emit('update:showDialog', false)
}
const onFinisheed = async (values) => {
  if (formData.value.id) {
    await updateBuilding(formData.value.id)
    message.success('编辑成功')
  } else {
    await addBuilding(values)
    message.success('新增成功')
  }

  close()
  emit('addSuccess')
}
const showTitle = computed(() => {
  return formData.value.id ? '编辑楼宇' : '新增楼宇'
})
</script>
<template>
  <a-modal :footer="null" :visible="props.showDialog" @cancel="close" :title="showTitle">
    <a-form
      ref="formRef"
      :rules="rules"
      @finish="onFinisheed"
      :model="formData"
      :label-col="{ span: 4 }"
    >
      <a-form-item name="name" label="楼宇名称">
        <a-input v-model:values="formData.name" placeholder="请输入楼宇名称"></a-input>
      </a-form-item>
      <a-form-item name="floors" label="楼宇层数">
        <a-input v-model:values="formData.floors" placeholder="请输入楼宇层数"></a-input>
      </a-form-item>
      <a-form-item name="area" label="在管面积">
        <a-input v-model="formData.area" placeholder="请输入在管面积"></a-input>
      </a-form-item>
      <a-form-item name="propertyFeePrice" label="物业费">
        <a-input v-model="formData.propertyFeePrice" placeholder="请输入物业费"></a-input>
      </a-form-item>
      <a-form-item>
        <div class="ant-modal-footer">
          <a-row type="flex" justify="center">
            <a-space>
              <a-button style="border-radius: 10px" @click="close">取消</a-button>
              <a-button style="border-radius: 10px" type="primary" html-type="submit"
                >确定</a-button
              >
            </a-space>
          </a-row>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.ant-modal-footer {
  background-color: rgb(244, 246, 248);
  padding: 10px 16px;
}
</style>