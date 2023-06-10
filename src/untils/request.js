import axios from 'axios'
import { message } from 'ant-design-vue'
import useToken from '@/stores/token.js'

const request = axios.create({
  baseURL: '/api'
})
// 请求拦截器
request.interceptors.request.use(config => {
  const { token } = useToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

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
    if(code === 50000) {
      message.error(msg)
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