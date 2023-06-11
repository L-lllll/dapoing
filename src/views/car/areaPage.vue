<script setup>
import { ref, onMounted } from 'vue';
import {getAreaList} from '../../api/areaPage'
// import { defineComponent } from 'vue';
const columns = [
  {
    title: '序号',
    width: 44,
    dataIndex: 'name',
    key: 'name',
    customCell: () => {
      return {
        style: {
          'min-width': "44px",
          "white-space": "nowrap",
          overflow: "hidden",
        }
      };
    }

  },
  {
    title: '区域名称',
    width: 87,
    dataIndex: 'areaName',
    key: 'areaName',
    customCell: () => {
      return {
        style: {
          'min-width': "87px",
          "white-space": "nowrap",
          overflow: "hidden",
        }
      };
    }
  },
  {
    title: '车位数 (个)',
    width: 100,
    dataIndex: 'spaceNumber',
    key: 'spaceNumber',
    customCell: () => {
      return {
        style: {
          'min-width': "100px",
          "white-space": "nowrap",
          overflow: "hidden",
        }
      };
    }
  },
  {
    title: '面积(m²)',
    width: 86,
    dataIndex: 'areaProportion',
    customCell: () => {
      return {
        style: {
          'min-width': "86px",
          "white-space": "nowrap",
          overflow: "hidden",
        }
      };
    }
  },
  {
    title: '计费规则',
    width: 86,
    dataIndex: 'ruleName',
    customCell: () => {
      return {
        style: {
          'min-width': "86px",
          "white-space": "nowrap",
          overflow: "hidden",
        }
      };
    }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 72,
    customCell: () => {
      return {
        style: {
          'min-width': "72px",
          "white-space": "nowrap",
          overflow: "hidden",
        }
      };
    }
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    dataIndex: 'operation',
    width: 100,
    // slots: {
    //   customRender: 'action',
    // },
    customCell: () => {
      return {
        style: {
          'min-width': "100px",
          "white-space": "nowrap",
          overflow: "hidden",
        }
      };
    }
  },
];
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)
const getAreaListAPI = async() => {
  const res = await getAreaList({page: page.value,pageSize: pageSize.value})
  console.log(res)
  data.value = res.rows
  total.value = res.total
}
const onShowSizeChange = (current, size) => {
  page.value = current
  pageSize.value = size
  getAreaListAPI()
};
const onPageChange = (val) => {
  page.value = val
  getAreaListAPI()
};
const data = ref([])
onMounted(() => {

  getAreaListAPI()
})
</script>
<template>
  <div style="padding: 20px 20px 0;overflow: hidden">
    <a-button style="border-radius: 4px;margin-bottom: 20px;" type="primary">添加区域</a-button>
    <div style="width: 100%;height: 100%;background-color: #fff;">
      <a-table :bordered="false" :pagination="false" :ellipsis="true" :columns="columns" :data-source="data">
        <template #bodyCell="{ column,index }">
          <template v-if="column.dataIndex === 'name'">
           <span>{{ (page - 1) * pageSize + index + 1  }}</span>
          </template>
          <div v-if="column.dataIndex === 'operation'">
            <a-button type="link">编辑</a-button>
            <a-button type="link">删除</a-button>
          </div>
        </template>
      </a-table>
    </div>
    <div id="components-pagination-demo-mini">
      <a-pagination @change="onPageChange" @showSizeChange="onShowSizeChange" size="small" :total="total" show-size-changer show-quick-jumper :show-total="total => `共 ${total} 条`"/>
    </div>
  </div>
</template>
<style scoped>
:deep(.ant-table-thead > tr > th){
  padding: 8px !important;
  height: 48px;
  background-color: #f4f6f8;
  overflow: hidden;
}
:deep(.ant-table-cell){
  padding: 8px;
  height: 48px;
  overflow: hidden;
}
:deep(.ant-table-content){
  overflow: hidden;
  min-width: 100px;
}
#components-pagination-demo-mini{
  margin-top: 30px;
  float: right;
  margin-bottom: 20px;
}
.ant-btn-link{
  padding: 4px 7.5px;
}
</style>