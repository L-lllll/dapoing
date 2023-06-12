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
  // 删除区域
export const delAreaList = id => {
  return request({
    url:`/parking/area/${id}`,
    method: 'delete'
  })
}
// 获取下拉列表
export const getSelectList = () => {
    return request({
      url:`/parking/rule/dropList`,
    })
}
// 编辑区域
export const updateAreaList = (data) => {
  return request({
    url:`/parking/area`,
    method: 'put',
    data
  })
}
// 获取月卡列表
export const getMouthList = (params) => {
  return request({
    url:`/parking/card/list`,
    params
  })
}
// 获取月卡信息
export const getMouthCard = () => {
  return request({
    url: '/parking/card/proportion'
  })
}

// 删除月卡
export const delMouthList = id => {
  return request({
    url:`/parking/card/${id}`,
    method: 'delete'
  })
}

// 添加月卡
export const addMouthList = data => {
  return request({
    url: '/parking/card',
    method: 'post',
    data
  })
}