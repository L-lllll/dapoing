import { ref} from 'vue'
import { defineStore } from 'pinia'

export const useToken = defineStore('token', () => {
  const token = ref(null)
  // 储存token
  const updateToken = val => token.value = val
  // 移除token
  const removeToken = () => token.value = null
  
  return { token, updateToken, removeToken }
},{
  persist: true // 可持久化的标记- 将我们的数据 持久化到前端缓存中
})

export default useToken
