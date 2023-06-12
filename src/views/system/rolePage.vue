<script setup>
 import {ref} from 'vue';
 const count=ref(0)
const createCreative=ref(null)
</script>
<template>
      <div class="mianContent" ref="createCreative">
    <!-- 右侧区域 -->
<!-- <div class="leftContent"> -->
      <a-layout>
      <a-layout-sider width="200" style="background: #fff;border-right: 1px solid rgb(228, 231, 236);;">
        <a-menu
          v-model:selectedKeys="selectedKeys2"
          v-model:openKeys="openKeys"
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
          :getContainer="()=>createCreative"
        >
            <a-menu-item key="1" class="role-item">基础数据管理</a-menu-item>
            <a-menu-item key="2"  class="role-item">行车管理</a-menu-item>
            <a-menu-item key="3"  class="role-item">员工及系统管理</a-menu-item>
            <a-menu-item key="4"  class="role-item">黑马测试</a-menu-item>
            <a-menu-item key="5"  class="role-item">测试11</a-menu-item>
        </a-menu>
      </a-layout-sider>
    </a-layout>
    <!-- 右侧结束 -->
      <a-layout style="padding: 0 24px 24px" class="rightLayout">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>功能权限</a-breadcrumb-item>
          <a-breadcrumb-item>成员{{ count }}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', margin: 0}"
        >
          Content
        </a-layout-content>
      </a-layout>
    </div>
</template>
<style scoped less>
.mianContent{
  width: 100%;
  min-width: 1236px;
  /* height: 300px; */
  /* background-color: #fff; */
}
.rightLayout{
  background-color: #fff;
}
:deep(.role-item){
  position: relative;
    height: 56px;
    padding: 0px 20px;
    cursor: pointer;
    width: 96%;
    margin: 5px;
    color: #000000d9;
}
/* .leftContent{
 min-width: 220px;
    border-right: 1px solid rgb(228, 231, 236);
    padding: 4px;
    text-align: center;
    width: 25%;
background-color: aqua;
display: block;
  } */
</style>