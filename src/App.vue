<script setup>
// 设置中文ant组件
import {ref} from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
const locale = ref(zhCN)
</script>
<template>
  <div class="app">
    <a-config-provider :locale="locale">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>
<style>
.app {
  width: 100%;
  min-height: 100vh;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
