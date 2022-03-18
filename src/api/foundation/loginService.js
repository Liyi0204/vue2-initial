import axiosHttp from "API/axiosHttp";
import userModule from "@/module/userModule";

export default {
    async checkLoginThenGetUserInfo() {
        // 正常登录场景，进入三次
        // 1、无ticket，未登录，goSsoAuthUrl
        // 2、有ticket，doLoginByTicket，跳转back
        // 3、无ticket，已登录，ok
        let back = this.getParam('back', '/');
        let ticket = this.getParam('ticket');
        if (ticket) {
            //console.log("there are ticket,doLoginByTicket", ticket, back)
            let res = await this.doLoginByTicket(ticket, back);
            if (res.code === 200) {
                //res.data
                localStorage.setItem('xmcitoken',res.data);
                //xmcitoken
                location.href = decodeURIComponent(back);//2
            }
        } else {
            //console.log("there are not ticket,goSsoAuthUrl when not login")
            if ((await this.isLogin()).data) {
                let res = await this.getUserInfo();
                if (res.code === 200) {
                    return res.data;
                }
            } else {
                let res = await this.getSsoAuthUrl()
                console.log(res)
                if (res.code == 200) {
                    location.href = res.data;//1
                }
            }
        }
    },
    isLogin() {
        let url = "/sso/isLogin"
        return axiosHttp.GET(url)
    },
    getSsoAuthUrl() {
        let backUrl = window.location.href
        backUrl = encodeURIComponent(backUrl);
        console.log("getSsoAuthUrl backUrl=", backUrl)
        let url = "/sso/getSsoAuthUrl?clientLoginUrl=" + backUrl
        return axiosHttp.GET(url)
    },
    doLoginByTicket(ticket) {
        let url = "/sso/doLoginByTicket?ticket=" + ticket
        return axiosHttp.GET(url)
    },
    doLogout() {
        let url = "/sso/logout"
        return axiosHttp.GET(url)
    },
    getUserInfo() {
        let url = "/sso/getUserInfo"
        return axiosHttp.GET(url)
    },
    // 从url中查询到指定名称的参数值
    getParam(name, defaultValue) {
        let query = window.location.search.substring(1);
        let vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == name) {
                return pair[1];
            }
        }
        return (defaultValue == undefined ? null : defaultValue);
    },
}