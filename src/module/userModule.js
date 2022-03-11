import Vue from 'vue'
import cookies from 'js-cookie'

const LOGIN_URL = process.env.VUE_APP_LOGIN_URL
const Domain_URL = process.env.VUE_APP_Domain_URL
export default new Vue({
  data() {
    return {
      token: '',
      PPUser: {},
      loginPageUrl: LOGIN_URL, //中台地址,
      TOKEN_KEY: 'ccstid',
      PPUSER_KEY: 'PPUser',
    }
  },
  created() {
    this.token = cookies.get('AuthToken', {
      domain: Domain_URL
    });
    this.PPUser = cookies.get('PPUser', {
      domain: Domain_URL
    });
  },
  methods: {
    setCookiesToken(token) {
      cookies.set('AuthToken', token, {
        expires: 7,
        domain: Domain_URL
      });
      this.token = token;
    },
    setPPUser(PPUser) {
      cookies.set('PPUser', PPUser, {
        expires: 7,
        domain: Domain_URL
      });
      this.PPUser = PPUser;
    },
    removeCookiesToken() {
      cookies.remove('AuthToken', {
        domain: Domain_URL
      });
      this.token = '';
    },
    removePPUser() {
      cookies.remove('PPUser', {
        domain: Domain_URL
      });
      this.PPUser = {};
    },
    checkToken() {
      // 校验token
      let CookiesToken = this.token;
      let hasToken = !(CookiesToken == undefined || CookiesToken == null || CookiesToken == '');
      //let hasToken = !CookiesToken //理论上酱紫写就可以了ly
      return hasToken
    }
  }
})