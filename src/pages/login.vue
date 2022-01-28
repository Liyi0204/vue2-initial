<template>
    <a-layout id="login">
      <a-layout-header class="login-header">
        WDOM
      </a-layout-header>
      <a-layout-content class="login-content">
        <a-row class="login-content-row">
          <a-col :span="8" offset="4">
            <div class="login-bg"></div>
          </a-col>
          <a-col :span="4" offset="2">
            <div class="login-tabs">
              <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="账号密码登陆">
                  <div class="Account-login">
                    <a-input size="large" v-model="accountLogin.account" placeholder="账号">
                      <a-icon slot="prefix" type="user" />
                    </a-input>
                    <a-input-password size="large" v-model="accountLogin.passWord" placeholder="密码">
                      <a-icon slot="prefix" type="lock" />
                    </a-input-password>
                    <a-button type="primary" @click="Login">
                      登录
                    </a-button>
                  </div>
                </a-tab-pane>
                <a-tab-pane key="2" tab="短信验证登录" force-render>
                  <div class="Code-login"></div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer class="login-footer">Copyright 2014-2020 ©厦门云栈网络科技有限公司</a-layout-footer>
    </a-layout>
</template>

<script>
import loginServe from "API/login/loginServe";
import userModule from "@/module/userModule";
export default {
  data() {
    return {
      accountLogin: {
        account: "",
        passWord: "",
      },
    };
  },
  methods: {
    Login() {
      if (this.accountLogin.account == "") {
        return this.$message.error("请输入账号");
      }
      if (this.accountLogin.passWord == "") {
        return this.$message.error("请输入密码");
      }
      loginServe
        .login(this.accountLogin.account, this.accountLogin.passWord)
        .then((data) => {
          console.log(data);
          this.loginSuccessfully(data);
        });
    },
    loginSuccessfully(res) {
      this.$message.success("登录成功");
      userModule.setSessionToken(res.token);
      userModule.setPPUser(JSON.stringify(res));
      this.$router.push({
        path: "/",
      });
    },
  },
  mounted() {
    // this.$message.success("WDOM");
  },
};
</script>

<style lang="less" scoped>
#login {
  width: 100vw;
  height: 100vh;
  .login-header {
    background: @primary-color;
    font-size: 20px;
    height: 84px;
    font-weight: bold;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .login-content {
    width: 100%;
    height: calc(100vh-14.2px);
    background: @primary-color;
    .login-content-row {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .login-tabs {
        width: 410px;
        height: 400px;
        background: white;
        padding: 20px;
        border-radius: 5px;
        /deep/.ant-tabs-nav-scroll {
          text-align: center;
        }
        .Account-login {
          width: 100%;
          height: 100%;
          padding: 30px 50px;
          /deep/.ant-input-affix-wrapper {
            margin-bottom: 20px;
          }
          /deep/ .ant-btn {
            width: 100%;
            height: 40px;
          }
        }
      }
    }
  }
  .login-footer {
    font-size: 12px;
    height: 20px;
    background: #3a63cc;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
  }
  .login-bg {
    width: 700px;
    height: 400px;
    background: url("https://srccdn.jushuitan.com/jst-login/assets/img/login_subimg-a47acdc0a2.jpg");
  }
}
</style>