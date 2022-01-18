<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import loginServe from "API/login/loginServe";
export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    loginServe.login("17689790092", '123456').then((data) => {
      console.log(data);
    });
  },
  components: {
    HelloWorld,
  },
};
</script>
