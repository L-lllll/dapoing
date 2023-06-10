import Layout from '@/layout/index.vue'
// 业务管理
export default {
  path: '/car',
  component: Layout,
  redirect: '/car/area',
  meta: { title: '行车管理',icon:'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/menu/image/car.png'},
  children: [
    // 区域管理
    {
      path: '/area',
      name: '',
      component: () => import('@/views/car/areaPage.vue'),
      meta: { title: '区域管理'}
    },
    {
      path: '/monthCard',
      name: '',
      component: () => import('@/views/car/monthCard.vue'),
      meta: { title: '月卡管理'}
    },
    {
      path: '/stopCar',
      name: '',
      component: () => import('@/views/car/stopCar.vue'),
      meta: { title: '停车缴费管理'}
    },
    {
      path: '/rulePage',
      name: '',
      component: () => import('@/views/car/rulePage.vue'),
      meta: { title: '计费规则管理'}
    },
  ]
}
