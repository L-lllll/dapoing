import request from '@/untils/request'
//楼宇管理
//楼宇修改
export function updateBuilding(data) {
  return request({
  url: `/park/building/`,
  method: 'put',
  data
  })
}
//楼宇查询
export function getBuilding(params) {
  return request({
  url: '/park/building/',
  params
  })
}
//楼宇删除---租赁中不支持删除
export function delBuilding(id) {
  return request({
  url: `/park/building/${id}`,
  method: 'delete',
  })
}
//楼宇新增
export function addBuilding(data) {
  return request({
  url: `/park/building/`,
  method: 'post',
  data
  })
}
//楼宇详情查询
export function getBuildingDetails(id) {
  return request({
  url: `/park/building/${id}/`
  })
}
//查询可租赁楼宇
export function getBuildinglist() {
  return request({
  url: ' /park/rent/building/'
  })
}