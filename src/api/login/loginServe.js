import http from 'AXIOSHTTP/http'

export default {
  //账号密码登陆
  login(userAccount, accountPassword, userType, params) {
    return http.get(`/login/loginByAccount?userAccount=${userAccount}&accountPassword=${accountPassword}&userType=${userType}`, params)
  },

  // 短信登录
  smsLogin(phoneNum, telAreaCode, sms, userType, params) {
    return http.get(`/login/loginBySms?phoneNum=${phoneNum}&telAreaCode=${telAreaCode}&sms=${sms}&userType=${userType}`, params)
  },

  //发送登陆短信
  sendLoginSms(phoneNum, telAreaCode, params) {
    return http.get(`/login/sendLoginSms?phoneNum=${phoneNum}&telAreaCode=${telAreaCode}`, params)
  },

  // 发送修改密码短信
  sendUpdatePwdSms(phoneNum, telAreaCode, params) {
    return http.get(`/login/sendUpdatePwdSms?phoneNum=${phoneNum}&telAreaCode=${telAreaCode}`, params)
  },

  // 验证修改密码短信
  checkUpdatePwdSms(phoneNum, telAreaCode, sms, params) {
    return http.get(`/login/sendUpdatePwdSms?phoneNum=${phoneNum}&telAreaCode=${telAreaCode}&sms=${sms}`, params)
  }
}