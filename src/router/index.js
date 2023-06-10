import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
import carRouter from './modules/car.js'
import parkRouter from './modules/park.js'
import propertyRouter from './modules/property.js'
import warningRouter from './modules/oneSwing.js'
import systemRouter from './modules/system.js'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      hidden: true
    },
    {
      path: '/',
      redirect: '/dashboard',
      component: Layout,
      meta: {
        title: '工作台',
        icon: 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/menu/image/workbench.png'
      },
      // 子节点
      children: [
        {
          path: 'dashboard', // 二级路由的地址
          component: () => import('@/views/dashboard/index.vue'),
          // 路由元信息
          meta: {
            title: '工作台',
            icon: 'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/menu/image/workbench.png'
          }
        }
      ]
    },
    parkRouter,
    carRouter,
    propertyRouter,
    warningRouter,
    systemRouter
  ]
})

export default router
