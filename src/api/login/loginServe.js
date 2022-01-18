import axiosHttp from "../axiosHttp"

export default {
  //账号密码登陆
  login(userAccount, accountPassword, userType, params) {
    return axiosHttp.GET(`/login/loginByAccount?userAccount=${userAccount}&accountPassword=${accountPassword}&userType=${userType}`, params)
  },
}