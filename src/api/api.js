import http from '../utils/http'
// 
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/testIp"


// get请求
export function getListAPI(params) {
  return http.get(`${resquest}/getList.json`, params)
}
// post请求
export function postFormAPI(params) {
  return http.post(`${resquest}/postForm.json`, params)
}
// put 请求
export function putSomeAPI(params) {
  return http.put(`${resquest}/putSome.json`, params)
}
// delete 请求
export function deleteListAPI(params) {
  return http.delete(`${resquest}/deleteList.json`, params)
}

//账号密码登陆
export function login(userAccount, accountPassword, userType, params) {
  return http.get(`${resquest}/login/loginByAccount?userAccount=${userAccount}&accountPassword=${accountPassword}&userType=${userType}`, params)
}

// 短信登录
export function smsLogin(phoneNum, telAreaCode, sms, userType, params) {
  return http.get(`${resquest}/login/loginBySms?phoneNum=${phoneNum}&telAreaCode=${telAreaCode}&sms=${sms}&userType=${userType}`, params)
}

//发送登陆短信
export function sendLoginSms(phoneNum, telAreaCode, params) {
  return http.get(`${resquest}/login/sendLoginSms?phoneNum=${phoneNum}&telAreaCode=${telAreaCode}`, params)
}

  // 发送修改密码短信
  export function sendUpdatePwdSms(phoneNum, telAreaCode, params) {
    return http.get(`${resquest}/login/sendUpdatePwdSms?phoneNum=${phoneNum}&telAreaCode=${telAreaCode}`, params)
  }

    // 验证修改密码短信
    export function checkUpdatePwdSms(phoneNum, telAreaCode,sms, params) {
      return http.get(`${resquest}/login/sendUpdatePwdSms?phoneNum=${phoneNum}&telAreaCode=${telAreaCode}&sms=${sms}`, params)
    }