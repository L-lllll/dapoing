<script setup>
import { ref, computed} from 'vue'
import { getRuleDetail, AddRule, updateRule } from '../../../api/stop.js'
import { message } from 'ant-design-vue'
//使用defineProps方法来接收props
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  }
})
const formList = ref({
  ruleNumber: '', //计费规则编号
  ruleName: '', //计费规则名称
  durationType: '', //时长收费类型 minute:分钟，hour:小时
  chargeType: 'duration', //收费类型，时长收费:duration,按次收费:turn,分段收费:partition
  freeDuration: null, //免费时长，单位:分钟
  chargeCeiling: null, //收费上限
  durationTime: null, //分段计费，时间数
  durationPrice: null, //分段计费，单价
  turnPrice: null, //按次收费，每次价格
  partitionFrameTime: null, //分段收费:段内时间
  partitionFramePrice: null, //分段收费:段内费用
  partitionIncreaseTime: null, //分段收费:超出时间
  partitionIncreasePrice: null //分段收费:超出范围收费价钱
})
//校验规则
const rules = {
  ruleNumber: [{ required: true, message: '请输入计费规则编号', trigger: 'blur' }],
  ruleName: [{ required: true, message: '请输入计费规则名称', trigger: 'blur' }],
  durationType: [{ required: true, message: '请输入计费事件单位', trigger: 'blur' }]
}
const getRuleDetailApi = async (id) => {
  formList.value = await getRuleDetail(id)
}
//向外暴露的方法
defineExpose({
  getRuleDetailApi
})

//defineEmits 触发事件
const emit = defineEmits(['update:showDialog', 'addSuccess'])
const close = () => {
  //子传父
  emit('update:showDialog', false)
  //关闭时重置表单
  formReset.value.resetFields() //重置表单--只能重置表单当中的数据

  //清空非标单数据
  formList.value = {
    ruleNumber: '', //计费规则编号
    ruleName: '', //计费规则名称
    durationType: '', //时长收费类型 minute:分钟，hour:小时
    chargeType: 'duration', //收费类型，时长收费:duration,按次收费:turn,分段收费:partition
    freeDuration: null, //免费时长，单位:分钟
    chargeCeiling: null, //收费上限
    durationTime: null, //分段计费，时间数
    durationPrice: null, //分段计费，单价
    turnPrice: null, //按次收费，每次价格
    partitionFrameTime: null, //分段收费:段内时间
    partitionFramePrice: null, //分段收费:段内费用
    partitionIncreaseTime: null, //分段收费:超出时间
    partitionIncreasePrice: null //分段收费:超出范围收费价钱
  }
}
//表单重置
const formReset = ref(null)
//提交
const submit = async () => {
  if (formList.value.id) {
    await updateRule(formList.value)
    message.success('更新成功')
  } else {
    await AddRule(formList.value)
    message.success('新增成功')
  }

  close()
  emit('addSuccess')
}
const showTitle = computed(() => {
  return formList.value.id ? '编辑角色' : '新增角色'
})
</script>
<template>
  <div class="bigBox">
    <a-modal
      :visible="props.showDialog"
      :title="showTitle"
      @cancel="close"
      @ok="submit"
      width="540px"
    >
      <div class="formList">
        <a-form layout="vertical" :model="formList" :rules="rules" ref="formReset">
          <a-form-item label="计费规则编号" name="ruleNumber">
            <a-input placeholder="请输入计费规则编号" v-model:value="formList.ruleNumber" />
          </a-form-item>
          <a-form-item label="计费规则名称" name="ruleName">
            <a-input placeholder="请输入计费规则名称" v-model:value="formList.ruleName" />
          </a-form-item>
          <a-form-item label="计算方式（全天收费）" name="chargeType">
            <a-radio-group name="radioGroup" v-model:value="formList.chargeType">
              <a-radio value="duration">时长收费</a-radio>
              <a-radio value="turn">按次收费</a-radio>
              <a-radio value="partition">分段收费</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-row type="flex">
            <a-form-item label="免费时长" name="freeDuration">
              <a-input
                placeholder="请输入免费时长"
                style="width: 138px"
                v-model:value="formList.freeDuration"
              />
              分钟
            </a-form-item>
            <a-form-item label="收费上限" name="chargeCeiling">
              <a-input
                placeholder="请输入收费上限"
                style="width: 130px; margin-left: 5px"
                v-model:value="formList.chargeCeiling"
              />
              元
            </a-form-item>
          </a-row>
          <a-form-item label="计费规则">
            <a-row type="flex">
              <!-- 时长收费 -->
              <template v-if="formList.chargeType === 'duration'">
                <a-space>
                  每
                  <a-input
                    placeholder="请输入"
                    style="width: 77px"
                    v-model:value="formList.durationTime"
                  />
                  <a-select
                    v-model:value="formList.durationType"
                    placeholder="请选择"
                    style="width: 118px"
                    name="durationType"
                  >
                    <a-select-option value="minute">分钟</a-select-option>
                    <a-select-option value="hour">小时</a-select-option>
                  </a-select>
                  <a-input
                    placeholder="请输入"
                    style="width: 77px"
                    v-model:value="formList.durationPrice"
                  />
                  元
                </a-space>
              </template>

              <!-- 按次收费 -->
              <template v-else-if="formList.chargeType === 'turn'">
                <a-space>
                  每次<a-input
                    placeholder="请输入金额"
                    style="width: 182px"
                    v-model:value="formList.turnPrice"
                  ></a-input
                  >元
                </a-space>
              </template>
              <!-- 分段收费 -->
              <template v-else>
                <div>
                  <a-form-item>
                    <a-space>
                      <a-input
                        placeholder="请输入"
                        style="width: 80px"
                        v-model:value="formList.partitionFrameTime"
                      ></a-input>
                      小时内，每小时收费
                      <a-input
                        placeholder="请输入"
                        style="width: 80px"
                        v-model:value="formList.partitionFramePrice"
                      ></a-input
                      >元
                    </a-space>
                  </a-form-item>
                </div>
                <div>
                  <a-space>
                    每增加
                    <a-input
                      placeholder="请输入"
                      style="width: 80px"
                      v-model:value="formList.partitionIncreaseTime"
                    ></a-input>
                    小时，增加
                    <a-input
                      placeholder="请输入"
                      style="width: 80px"
                      v-model:value="formList.partitionIncreasePrice"
                    ></a-input
                    >元
                  </a-space>
                </div>
              </template>
            </a-row>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
.formList {
  padding: 0px 80px;
}
:deep(.ant-modal-body) {
  padding: 0px 76px;
}
.ant-radio-wrapper {
  height: 36px;
  width: 98px;
  line-height: 36px;
  border: 1px solid #1890ff;
  border-radius: 4px;
  padding-left: 8px;
}
:deep(.ant-form-item-control-input-content) {
  border-radius: 10px;
}
</style>
