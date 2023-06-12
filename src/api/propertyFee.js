// 物业费管理接口
import request from "@/untils/request";

// 获取列表
// 获取账单详情
export const getTableList = params => {
  if (typeof(params) === 'number') {
    return request.get(`/park/propertyfee/${params}`)
  }
  return request.get('/park/propertyfee',{ params })
}
// 查询所有企业
export const getEntrepreneur = () => {
  return request.get('park/all/enterprise')
}
// 获取所有楼宇
export const getBuilding = () => {
  return request.get('park/all/building')
}
// 预算金额
export const getPayment = (data) => {
  return request.post('park/propertyfee/pre/payment',data)
}
// 添加账单
export const addBill = (data) => {
  return request.post('park/propertyfee',data)
}
// 删除账单
export const delBill = (id) => {
  return request.delete(`park/propertyfee/${id}`)
}
