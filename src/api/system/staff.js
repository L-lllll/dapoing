import request from "../../untils/request.js";
// 获取用户分页数据管理
export function getUserManagement(params) {
    return request({
        url:'park/sys/user',
        method:'get',
        params
    })
}
// 新增用户
export function AddUser(data){
    return request({
        url:'park/sys/user',
        method:'post',
        data
    })
}
// 删除用户
export function delStaff(id){
    return request({
        url:`park/sys/user/${id}`,
        method:'delete'
    })
}
// 重置密码
export function  ResetPassword(id){
    return request({
        url:'park/sys/user/resetPwd',
        method:'put',
        id
    })
}
// 获取用户详情
export function getInformation(id){
    return request({
        url:`park/sys/user/${id}`,
        method:'get'
    })
}