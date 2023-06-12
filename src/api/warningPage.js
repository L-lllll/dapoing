import request from '@/untils/request.js'

// 获取列表
export function getWarnList (params){
    return request ({
        url:'/pole/warning/list',
        params
    })
}
// 删除告警记录
export function delWarn (id) {
    return request({
        url: `/pole/warning/${id}`,
        method: 'delete'
    })
}

// 查看告警详情
export function getWarnDetail(id) {
    return request({
        url: `/pole/warning/${id}`,
    })
}
