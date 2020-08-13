import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: '/',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (UserModule.token) {
      config.headers.Authorization = 'Bearer ' + UserModule.token
      config.headers['X-Access-Token'] = UserModule.token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.result === 1) {
      Message({
        message: res.error || 'Error',
        type: 'error',
        duration: 5 * 100
      })

      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {

      // }
      return Promise.reject(new Error(res.error || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    // console.log(error.response.status)
    if (error.response.status === 403) {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        UserModule.ResetToken()
        location.reload()
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 100
      })
    }

    return Promise.reject(error)
  }
)

export default service
