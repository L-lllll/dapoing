import request from "../../untils/request.js";
// 获取用户分页数据管理
export function getUserManagement(params) {
    return request({
        url:'park/sys/user',
        method:'get',
        params
    })
}