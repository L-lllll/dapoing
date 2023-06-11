import request from '../untils/request.js'

export const getEnterpriseList = (params) => {
  return request({
    url:'/park/enterprise',
    params
  })
}