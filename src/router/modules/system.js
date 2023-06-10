import Layout from '@/layout/index.vue'
// 业务管理
export default {
  path: '/system',
  component: Layout,
  redirect: '/system/staffpage',
  meta: { title: '系统管理'},
  children: [
    // 区域管理
    {
      path: '/staffpage',
      name: '',
      component: () => import('@/views/system/staffPage.vue'),
      meta: { title: '员工管理'}
    },
    {
      path: '/role',
      name: '',
      component: () => import('@/views/system/rolePage.vue'),
      meta: { title: '角色管理'}
    },
  ]
}