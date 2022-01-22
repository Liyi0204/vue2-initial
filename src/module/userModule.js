import Vue from 'vue'

export default new Vue({
  data() {
    return {
      token: '',
      PPUser: {},
      // localStorage key
      TOKEN_KEY: 'ccstid',
      PPUSER_KEY: 'PPUser'
    }
  },
  created() {
    this.token = sessionStorage.getItem(this.TOKEN_KEY);
    this.PPUser = sessionStorage.getItem(this.PPUSER_KEY);
  },
  methods: {
    setSessionToken(token) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
      this.token = token
    },
    setPPUser(PPUser) {
      sessionStorage.setItem(this.PPUSER_KEY, PPUser);
      this.PPUser = PPUser
    },
    removeSessionToken() {
      sessionStorage.removeItem(this.TOKEN_KEY);
      this.token = ''
    },
    removePPUser() {
      sessionStorage.removeItem(this.PPUSER_KEY);
      this.PPUser = {}
    },
    checkToken() {
      // 校验token
      let sessionToken = this.token;
      let hasToken = !(sessionToken == undefined || sessionToken == null || sessionToken == '');
      //let hasToken = !sessionToken //理论上酱紫写就可以了ly
      return hasToken
    }
  }
})