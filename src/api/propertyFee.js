// 物业费管理接口
import request from "@/untils/request";

// 获取列表
export const getTableList = params => {
  return request.get('/park/propertyfee',{ params })
}