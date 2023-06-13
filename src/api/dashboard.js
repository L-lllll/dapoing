import request from "@/untils/request";
// 获取临期合同列表
export const getRentAdvent = (parmas) => {
  return request.get('home/workbench/rentInfo',{parmas})
}
// 获取图表数据
export const getHomeInfo = (parmas) => {
  return request.get('home/workbench/info',{parmas})
}
