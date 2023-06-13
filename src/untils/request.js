import axios from 'axios'
import { message } from 'ant-design-vue'
import useToken from '@/stores/token.js'
import router from '../router'

const request = axios.create({
  baseURL: '/api'
})
// 请求拦截器
request.interceptors.request.use((config) => {
  const { token } = useToken()
  if (config.data && config.data.isFormUrlEncoded) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if(config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  return config
}, error => Promise.reject(error))

// 响应拦截器
request.interceptors.response.use(
  response => {
    if (response.data instanceof Blob) return response.data
    const { code, msg, data } = response.data
    if (code === 10000) {
      return data 
    }
    return Promise.reject(new Error(msg))
  },error => {
    const { msg } = error.response.data
    message.error(msg)
    if(error.response.status === 401){
      const { removeToken } = useToken()
      removeToken()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
export default request