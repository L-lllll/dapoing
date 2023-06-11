import request from '../untils/request.js'
//获取停车缴费列表
export function getParkManagementList(params){
  return request({
    url:'/parking/payment/list',
    method:'get',
    params
  })
}


//计费规则管理接口
//1、获取计费规则列表
export function getRuleList(params){
  return request({
    url:' /parking/rule/list',
    method:'get',
    params
  })
}
//2、获取计费规则详情列表
export function getRuleDetail(id){
  return request({
    url:`/parking/rule/${id}`,
    method:'get',
    id
  })
}
//3、添加计费规则
export function AddRule(data){
  return request({
    url:'/parking/rule',
    method:'post',
    data
  })
}
//4、删除计费规则
export function DelRule(id){
  return request({
    url:`/parking/rule/${id}`,
    method:'delete',
  })
}
//编辑计费规则
export function updateRule(data){
  return request({
    url:`/parking/rule/${data.id}`,
    method:'put',
    data
  })
}