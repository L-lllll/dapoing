import Layout from '@/layout/index.vue'
// 业务管理
export default {
  path: '/property',
  component: Layout,
  redirect: '/property/propertyfee',
  meta: { title: '物业费管理',icon:'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/menu/image/propety.png'},
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