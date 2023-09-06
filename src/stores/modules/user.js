import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')

    const setToken = (newToken) => {
      token.value = newToken
    }

    const delToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      user.value = res.data.data
    }
    const setUser = (obj) => (user.value = obj)

    return {
      token,
      user,
      setToken,
      delToken,
      getUser,
      setUser
    }
  },
  {
    persist: true // 持久化处理
  }
)
