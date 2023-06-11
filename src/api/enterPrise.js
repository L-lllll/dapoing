import request from '../untils/request.js'
// 获取企业列表
export const getEnterpriseList = (params) => {
  return request({
    url:'/park/enterprise',
    params
  })
}
// 企业租赁列表
export const getRentList = (id) => {
  return request({
    url:`/park/enterprise/rent/${id}`
  })
}
// 添加/续约企业租赁合同
export const addContract = data => {
  return request({
    url:'park/enterprise/rent',
    method:'post',
    data
  })
}
// 查询可租赁的楼宇
export const getBulidingList = () => {
  return request({
    url:'park/rent/building'
  })
}
