import request from '@/untils/request.js'
// 获取一体杆列表
export function getOneList (params){
    return request ({
        url:'/pole/info/list',
        params
    })
}
// 添加一体杆列表
export function addOneList (data) {
    return request({
        url: `/pole/info`,
        method: 'post',
        data
    })
}
// 删除一体杆
export function delOne (id) {
    return request({
        url: `/pole/info/${id}`,
        method: 'delete'
    })
}
// 编辑一体杆
export function updateOne (data) {
    return request({
        url: `/pole/info`,
        method: 'put',
        data
    })
}

