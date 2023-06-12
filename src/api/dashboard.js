import request from "@/untils/request";
// 获取临期合同列表
export const getRentAdvent = (parmas) => {
  return request.get('home/workbench/rentInfo',{parmas})
}
