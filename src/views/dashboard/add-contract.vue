<template>
    <a-modal 
        title="添加合同"
        :footer="null"
        :visible="props.visible"
        @cancel="close"
    >
        <a-form layout="vertical" ref="formRef" :model="rentForm">
            <a-form-item label="租赁楼宇" >
                <a-select v-model:value="rentForm.buildingId">
                    <a-select-option 
                        v-for="item in rentList" 
                        :key="item.id"
                        :label="item.name" 
                        :value="item.id"
                    >{{ item.name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="租赁起止日期">
                <a-range-picker @change="handleDate"/>
            </a-form-item>
            <a-form-item label="租赁合同" >
                <!-- 上传文件 -->
                <a-upload
                    v-model:file-list="fileList"
                    name="file"
                    action="#"
                    :before-upload="beforeUpload"
                    :accept="['.doc','.docx','.pdf']"
                >
                    <a-button class="upload">
                    <upload-outlined></upload-outlined>
                    上传文件
                    </a-button>
                </a-upload>
                <span style="color:#ccc;font-size: 14px;display: inline-block ;margin-top: 8px;">支持扩展名：.doc .docx .pdf, 文件大小不得超过5M</span>
            </a-form-item>
            <a-form-item>
                <a-space style="display:flex;justify-content: flex-end;align-items: end;" >
                    <a-button @click="close">取消</a-button>
                    <a-button type="primary">确认</a-button>
                </a-space>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { getEnableBuilding } from '@/api/building.js'
import { UploadOutlined, } from '@ant-design/icons-vue';
const props = defineProps({
    visible:{
        type:Boolean,
        default:false
    }
})
const formRef = ref(null)
const rentList = ref([])
const fileList = ref([])
onMounted(() => {
    getEnableBuildingAPI()
})
const getEnableBuildingAPI = async() => {
    const res = await getEnableBuilding()
    rentList.value = res.data
    console.log(res.data)
}
const rentForm = ref({
    buildingId:null,
    startTime:'',
    endTime:'',
    contractUrl:'',
    contractId:0,
    type:0, // 添加合同0，续签合同1
    enterpriseId:0 //企业id
})
const emits = defineEmits(["update:visible"])

const close = () => {
    emits("update:visible",false)
    formRef.value.resetFields()
}

const handleDate = (_,dateString) => {
    console.log(dateString)
    rentForm.value.startTime = dateString[0]
    rentForm.value.endTime = dateString[1]
}

const beforeUpload = (file) => {
    const isDoc = file.type === 'application/msword';
    const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const isPdf = file.type === 'application/pdf';
    const isLt5M = file.size / 1024 / 1024 < 5; // 5MB
    if (!(isDoc || isDocx || isPdf)) {
        message.error('Upload doc, docx or pdf format only!');
        return false;
    }
    if (!isLt5M) {
        message.error('Upload file size cannot exceed 5MB!');
        return false;
    }
    return true;
}

</script>
<style>
.ant-modal-body {
    padding: 24px 80px 12px;
}
.ant-picker {
    width: 100%;
}
.upload{
    color: #506ff6;
    border-color: #edf4fe;
    background: #edf4fe;
    border-radius: 5px;
}
</style>