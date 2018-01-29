<template>
  <header v-if="show">
      <div class="header_content">
          <div class="header_actions">
              <a class="logo" href="#/">
              <img src="static/images/logo-index.png" alt="">
          </a>
          <a href="#/" class="btns"><span>DISCOVERY</span></a>
          <a href="#/mine" class="btns"><span>MINE</span></a>
          </div>
          <div class="avatar_content">
              <el-dropdown >
                  <span class="el-dropdown-link">
                      <img src="static/images/anymous.svg" alt="">
                        ANYMOUS<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                    <el-dropdown-item command="b">狮子头</el-dropdown-item>
                    <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                    <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
              <!-- <img :src="avatar" alt=""> -->
          </div>
      </div>
  </header>
</template>

<script>
import Avatar from "./avatar";
import Bus from './bus'
export default {
  name: "Header",
  data() {
    return {
      loged: false,
      avatar: "",
      show:true
    };
  },
  beforeCreate() {
    // console.log(this.$router);
    var _this=this;
    this.$router.beforeEach(function(to,from,next){
        console.log(to.name,from.name);
        if(to.name==="Sign"&&from.name!=="Sign"){
            _this.show=false;
        }else{
            _this.show=true;
        }
        next();
    })
    // Bus.$on("hideHeader",this.hideHeader);
  },
  methods: {
    isLoged: function() {
      this.loged = localStorage.getItem("loged");
    }
  },
  components: {
    Avatar,Bus
  }
};
</script>

<style lang="less">
header {
  width: 100%;
  height: 100px;
  .header_content {
    width: 1200px;
    height: 100%;
    display: flex;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    .header_actions {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .logo {
      margin-right: 20px;
    }
    .btns {
      margin: 0 30px;
      font-weight: bold;
      color: #737775;
      &:hover {
        color: #444;
      }
    }
    .avatar_content {
        margin-right:100px;
        margin-top:3px;
        .el-dropdown-link{
            width: 128px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                display: block;
                width:20px;
                height:auto;
            }
        }
    }
  }
}
</style>
