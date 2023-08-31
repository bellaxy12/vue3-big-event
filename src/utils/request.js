import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { router } from 'vue-router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

// 1.自定义axios实例 基础地址和超时时间
const instance = axios.create({
  baseURL,
  timeout: 100000
})

// 2.请求拦截器 携带token
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 3.响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // 处理业务失败
    ElMessage({ message: res.data.message || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    // 处理401错误
    ElMessage({ message: err.response.data.message || '服务异常', type: 'error' })
    if (err.response?.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
