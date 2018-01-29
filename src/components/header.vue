<template>
  <header>
      <div class="header_content">
          <div class="logo">
              <img src="static/images/logo.png" alt="">
          </div>
          <div class="nav_content">
              <span>DICOVERY</span>
              <span>MINE</span>
          </div>
          <div class="avatar">
              <img src="" alt="">
          </div>
      </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data(){
      return {
          loged:flase
      }
  },
  beforeCreated(){
      if(loged){
          
      }
  },
  methods:{
      isLoged:function(){
          this.loged=localStorage.getItem("loged");
      }
  }
};
</script>

<style lang="less">
header {
  width: 100%;
  height: auto;
  background: #111;
  .header_content {
    width: 1000px;
    height: 80px;
    color: #fff;
    margin:0 auto;
  }
}
</style>
