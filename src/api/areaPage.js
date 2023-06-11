import request from '../untils/request.js'
// 获取区域列表
export const getAreaList = params => {
  return request({
    url:'/parking/area/list',
    params
  })
}
//添加区域
export const addAreaList = data => {
    return request({
      url:'/parking/area/list',
      method: 'post',
      data
    })
  }