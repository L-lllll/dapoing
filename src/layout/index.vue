<script setup>
import { ref } from 'vue'
import sideBar from './components/sideBar.vue';
import NavBar from './components/NavBar.vue';
const collapsed = ref(false)
</script>

<template>
  <a-layout class="app-layout">
    <a-layout-sider :collapsed="collapsed" collapsible :trigger="null">
      <img class="logo" src="../assets/common/logo.png" alt="">
       <sideBar></sideBar>
    </a-layout-sider>
    <a-layout class="right-layout">
      <a-layout-header>
        <NavBar></NavBar>
      </a-layout-header>
      <a-layout-content>
        <RouterView></RouterView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.app-layout {
  min-height: 100vh;
  display: flex;
  ::v-deep .ant-layout-sider {
    flex: 0 0 260px !important;
    width: 260px !important;
    min-width: 260px !important;
    background-color: #fff !important;
    overflow: auto;
    height: 100vh;
    .logo {
      height: 60px;
      width: 260px;
    }
  }
  .right-layout {
    flex: 1;
    height: 100vh;
    overflow-y: auto;
  }
  .ant-layout-header {
    background-color: #f4f6f8;
    padding: 0 20px;
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    .anticon {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
.ant-layout{
  background-color: #f4f6f8;
}
.my-avatar {
  color: #f56a00;
  background-color: #fde3cf;
  cursor: pointer;
}
.my-select {
  margin: -5px -16px;
  .item {
    padding: 5px 20px;
    margin-bottom: 0 !important;
    color: #666;
    &:hover {
      background-color: #fafafa;
      cursor: pointer;
    }
  }
}
.ant-layout-content{
  margin: 0 20px;
  background: #ffffff;
}
</style>