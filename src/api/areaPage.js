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
      url:'/parking/area',
      method: 'post',
      data
    })
  }
export const delAreaList = id => {
  return request({
    url:`/parking/area/${id}`,
    method: 'delete'
  })
}

export const getSelectList = () => {
    return request({
      url:`/parking/rule/dropList`,
    })
}
export const updateAreaList = (data) => {
  return request({
    url:`/parking/area`,
    method: 'put',
    data
  })
}