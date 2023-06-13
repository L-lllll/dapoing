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
// 上传文件
export const updateFile = data => {
  return request({
    url:'/upload',
    method:'post',
    data
  })
}
// 删除企业
export const delEnterprise = id => {
  return request({
    url:`park/enterprise/${id}`,
    method:'delete'
  })
}
// 删除合同
export const delRent = id => {
  return request({
    url:`park/enterprise/rent/${id}`,
    method:'delete'
  })
}
// 所在行业
export const industry = () => {
  return request({
    url:'park/industry'
  })
}
// 增加企业
export const addeEterprise = data => {
  return request({
    url:'park/enterprise',
    method:'post',
    data
  })
}
// 查看企业信息
export const eterpriseInfo = id => {
  return request({
    url:`park/enterprise/${id}`
  })
}
