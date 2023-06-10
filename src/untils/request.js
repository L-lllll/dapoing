import axios from 'axios'
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: '/api'
})
// 请求拦截器
request.interceptors.request.use()

// 响应拦截器
request.interceptors.response.use(
  response => {
    console.log(response)
    const { code, msg, data } = response.data
    console.log(response.data)
    if (code === 10000) {
      message.success(msg)
      return data 
    }
    return Promise.reject(new Error(msg))
  },error => {
    const { code, msg } = error.response.data
    message.error(msg)
    if(code === 401)
    return Promise.reject(error)
  }
)
export default request