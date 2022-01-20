<template>
  <div class="about">
    <a-button  type="primary" @click="goHome">登录页</a-button>
  </div>
</template>

<script>
export default {
  methods:{
    goHome(){
      this.$router.push({
        path:'/'
      })
    }
  }
}
</script>

<style  scoped>
  .about{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>