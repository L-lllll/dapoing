import request from '../untils/request.js'
// 登录
export const login = data => {
  return request({
    url:'/park/login',
    method:'post',
    data
  })
}
// 密码修改
export const changePassword = data => {
  return request({
    url:'/park/profile/updatePwd',
    method:'put',
    data
  })
}