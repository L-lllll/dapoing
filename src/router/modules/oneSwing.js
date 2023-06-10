import Layout from '@/layout/index.vue'
// 业务管理
export default {
  path: '/one',
  component: Layout,
  redirect: '/one/swingRod',
  meta: { title: '一体杆管理',icon:'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/menu/image/rod.png'},
  children: [
    // 区域管理
    {
      path: '/swingrod',
      name: '',
      component: () => import('@/views/oneSwing/swingRod.vue'),
      meta: { title: '一体杆管理'}
    },
    {
      path: '/warning',
      name: '',
      component: () => import('@/views/oneSwing/warningPage.vue'),
      meta: { title: '告警记录'}
    },
  ]
}