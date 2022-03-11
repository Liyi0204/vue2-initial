import Axios from 'axios'
import Vue from 'vue'
import userModule from "../module/userModule"

const BASEURL = process.env.NODE_ENV === 'development' ? '/testIp' : process.env.VUE_APP_API_URL
//console.log(BASEURL)
// 默认请求地址
Axios.defaults.baseURL = BASEURL
// 超时时间
Axios.defaults.timeout = 10000

// 请求拦截器
// Axios.interceptors.request.use((config) => {
//   config.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDk4NDQ1MjM2MjMsInBheWxvYWQiOiJ7XCJ1c2VySWRcIjpcIjBkZjg3NDlkYWIyMzQzYzdiMTRmMmI1YWQ2NTdmNTg1XCIsXCJzaG9wSWRcIjpcImMzMGRiM2E0MjFmOTRiOTNhYzkxYTY0Yzk2ZGQ3ODYxXCIsXCJyb2xlXCI6XCJzeXNfYWRtaW4sY29uc3VtZXIsc2hvcF9hZG1pbixhY3Rpdml0eV92aWV3ZXJfMFwiLFwiZ2F0ZVwiOm51bGx9In0.Pc9LQPhep2SUGeeMEuGDRXfQdkibnTNpjokMzMagEDE'//userModule.token
//   return config
// }, (error) => {
//   return Promise.reject(error);
// });
Axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = userModule.token
  return config
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器
Axios.interceptors.response.use((response) => {
  //console.log(response)
  return response;
}, (error) => {
  //console.log(error)
  let errMsg
  if (error.response.data && error.response.data.msg) {
    if (error.response.data.code === 403 && error.response.data.msg === '未登录') {
      return window.location.href = userModule.loginPageUrl
    }
    errMsg = error.response.data.msg
  } else if (error.response.status === 500) {
    errMsg = '无法响应的服务'
  }
  Vue.prototype.$message.error(
    errMsg
  )
  return Promise.reject(error);
});


export default {
  baseURL: BASEURL,
  GET(url, params) {
    return new Promise((resolve, reject) => {
      Axios.get(url, { params }).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  //POST(url, params, showMessage = true) {
  POST(url, params, showMessage) {  
    //console.log(showMessage)
    return new Promise((resolve, reject) => {
      Axios.post(url, params).then((res) => {
        if (res.status === 200 && showMessage) {
          Vue.prototype.$message.success(
            '操作成功'
          )
        }
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  PUT(url, params, showMessage) {
    return new Promise((resolve, reject) => {
      Axios.put(url, params).then((res) => {
        Vue.prototype.$message.success(
          '修改成功'
        )
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  DELETE(url, params) {
    return new Promise((resolve, reject) => {
      Axios.delete(url, { data: params }).then((res) => {
        if (res.status === 200) {
          Vue.prototype.$message.success(
            '删除成功'
          )
          
        }
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

