<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()  // 获取路由实例
// 计算属性-测算需要展示的路由的信息
const routes = computed(() => {
  // 一级菜单是否有需要隐藏
  return router.options.routes.filter((item) => !item.hidden) // 找出所有的hidden为false的路由
})
console.log(routes)
const getMeta = (obj) => {
  // 判断当前有没有子节点并获取路由传递过来的meta
  if (obj.children && obj.children.length) {
    return obj.children.find((item) => !item.hidden).meta
  }
  return obj.meta
}
</script>

<template>
  <div>
    <a-menu class="side-bar" mode="inline">
      <template v-for="item in routes">
        <!-- 如果当前路由有多个子节点，就渲染一个 a-sub-menu 组件 -->
        <a-sub-menu v-if="item.children && item.children.length > 1" :key="item.path">
          <template #title>
            <!-- 一级标签icon -->
            <component :is="getMeta(item).icon" />
            <!-- 一级标签名 -->
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 遍历子路由，渲染子菜单项 -->
          <template v-for="child in item.children" >
            <!-- 判断子标签是否有hidden,并添加专属key值,不会重复选取 -->
            <a-menu-item v-if="!child.hidden" :key="child.path">
              <!-- 设置路由跳转路径 -->
              <router-link class="link-name" :to="child.path">
                <component :is="getMeta(child).icon" />
                <span>{{ getMeta(child).title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
        <!-- 如果当前路由没有子节点，就直接渲染一个 a-menu-item 组件 -->
        <a-menu-item v-else-if="!item.hidden" :key="item">
          <router-link class="link-name" :to="item.path">
            <component :is="getMeta(item).icon" />
            <span>{{ getMeta(item).title }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>
