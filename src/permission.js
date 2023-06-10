import router from '@/router'
import useToken from '@/stores/token'

const whiteList = ['/login', '/404']//白名单
router.beforeEach((to, from, next) => {
  // 取token
  const { token } = useToken()
  if (token) {
    if (to.path === '/login') {
      next('/')//有token去登录页返回主页
    } else {
      next()//去其他页面放行
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()//没有token去往白名单内的页面放行
    } else {
      next('/login')//没有token去往白名单外的页面返回login
    }
  }
})

router.afterEach(() => {
})