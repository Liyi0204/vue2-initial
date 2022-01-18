/****   request.js   ****/
// 导入axios
import axios from 'axios'
import userModule from "../module/userModule"
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: process.env.NODE_ENV === 'development' ? '/testIp' : process.env.VUE_APP_API_URL,
  //baseURL: '/testIp',
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 3 * 1000
})
// 2.请求拦截器
service.interceptors.request.use(config => {
  //   config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDk4NDQ1MjM2MjMsInBheWxvYWQiOiJ7XCJ1c2VySWRcIjpcIjBkZjg3NDlkYWIyMzQzYzdiMTRmMmI1YWQ2NTdmNTg1XCIsXCJzaG9wSWRcIjpcImMzMGRiM2E0MjFmOTRiOTNhYzkxYTY0Yzk2ZGQ3ODYxXCIsXCJyb2xlXCI6XCJzeXNfYWRtaW4sY29uc3VtZXIsc2hvcF9hZG1pbixhY3Rpdml0eV92aWV3ZXJfMFwiLFwiZ2F0ZVwiOm51bGx9In0.Pc9LQPhep2SUGeeMEuGDRXfQdkibnTNpjokMzMagEDE'//userModule.token
  config.headers['Authorization'] = userModule.token
  return config
}, error => {
  Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
  //接收到响应数据并成功后的一些共有的处理，关闭loading等

  return response
}, error => {

  let errMsg
  if (error.response.data && error.response.data.msg) {
    if (error.response.data.code === 403 && error.response.data.msg === '未登录') {
      return window.location.href = "/#/login"
    }
    errMsg = error.response.data.msg
  } else if (error.response.status === 500) {
    errMsg = '无法响应的服务'
  }
  Vue.prototype.$message({
    message: errMsg,
    type: 'error'
  })
  return Promise.reject(error);
})
//4.导入文件
export default service