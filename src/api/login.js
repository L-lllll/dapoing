import request from '../untils/request.js'
// 登录
export const login = data => {
  return request({
    url:'/park/login',
    method:'post',
    data
  })
}