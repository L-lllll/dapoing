import Layout from '@/layout/index.vue'
// 业务管理
export default {
  path: '/property',
  component: Layout,
  redirect: '/property/propertyfee',
  children: [
    // 区域管理
    {
      path: 'propertyfee',
      name: '',
      component: () => import('../../views/property/propertyFee.vue'),
      meta: { title: '物业费管理'}
    },
  ]
}