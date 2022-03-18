import Axios from 'axios'
import Vue from 'vue'
import loginService from "API/foundation/loginService";

const BASEURL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_API_URL
// 默认请求地址
Axios.defaults.baseURL = BASEURL
// 超时时间
Axios.defaults.timeout = 10000

// 请求拦截器
Axios.interceptors.request.use((config) => {
  config.headers['xmcitoken'] = localStorage.getItem('xmcitoken') ? localStorage.getItem('xmcitoken') : '';
  return config
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器
Axios.interceptors.response.use((response) => {
  //console.log(response)
  return response;
}, (error) => {
  // console.log(error)
  let errMsg
  if (error.response.data && error.response.data.msg) {
    if (error.response.data.code === 403 && error.response.data.msg === '未登录') {
      loginService.doLogout().then(data => {
        window.location.reload()
      })
    }
    if (error.response.data.code === 500 && error.response.data.msg === '未提供Token') {
      loginService.doLogout().then(data => {
        window.location.reload()
      })
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
      Axios.get(url, {
        params
      }).then((res) => {
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
          Vue.prototype.$message({
            message: '操作成功',
            type: 'success'
          })
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
        Vue.prototype.$message({
          message: '修改成功',
          type: 'success'
        })
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  },
  DELETE(url, params) {
    return new Promise((resolve, reject) => {
      Axios.delete(url, {
        data: params
      }).then((res) => {
        if (res.status === 200) {
          Vue.prototype.$message({
            message: '删除成功',
            type: 'success'
          })
        }
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}