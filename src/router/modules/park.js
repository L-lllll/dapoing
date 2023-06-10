import Layout from '@/layout/index.vue'
// 业务管理
export default {
  path: '/park',
  component: Layout,
  redirect: '/park/StoreyPage',
  meta: { title: '园区管理'},
  children: [
    // 区域管理
    {
      path: '/StoreyPage',
      name: '',
      component: () => import('@/views/park/StoreyPage.vue'),
      meta: { title: '楼宇管理'}
    },
    {
      path: '/enterPrise',
      name: '',
      component: () => import('@/views/park/enterPrise.vue'),
      meta: { title: '企业管理'}
    },
  ]
}