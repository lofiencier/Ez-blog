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
              <el-dropdown trigger="click" v-if="isLoged()" @command="commands">
                  <span class="el-dropdown-link">
                      <img src="static/images/anymous.svg" alt="avatar" class="avatar_items">
                        <span class="avatar_items">{{nickname}}</span>
                        <i class="el-icon-arrow-down el-icon--right avatar_items"></i>
                  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="personal">修改个人资料</el-dropdown-item>
                    <el-dropdown-item command="message" disabled>消息</el-dropdown-item>
                    <el-dropdown-item command="setLogout" divided>退出账号</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
              <!-- <img :src="avatar" alt=""> -->
              <div class="landing" v-if="!isLoged()">
                <span>
                  <a href="#/landing?tab=login">登录 </a>|
                  <a href="#/landing?tab=signup"> 注册</a>
                </span>
              </div>
          </div>
      </div>
  </header>
</template>

<script>
import Avatar from "./avatar";
import Bus from './bus'
import {getCookie,setCookie, delCookie} from "./util"
import axios from "axios"

export default {
  name: "Header",
  data() {
    return {
      loged: false,
      avatar: "",
      show:true,
      nickname:'ANYMOUS'
    };
  },
  mounted(){
    if(this.$router.history.current.name==="Landing"&&this.show===true){
      this.show=false;
    }
  },
  beforeCreate() {
    var _this=this;
    this.$router.beforeEach(function(to,from,next){
        // console.log(to.name,from.name);
        if(to.name==="Landing"&&from.name!=="Landing"){
            _this.show=false;
        }else if(to.name==="Landing"){
          _this.show=false;
        }
        else{
            _this.show=true;
        }
        next();
    })
    // Bus.$on("hideHeader",this.hideHeader);
  },
  methods: {
    isLoged: function() {
      this.loged = localStorage.getItem("loged")&&getCookie("UID");
      //  console.log(this.loged,localStorage.getItem("loged"));
      // console.log("it runs!!",getCookie("UID"))
      if(this.loged){
       this.nickname=JSON.parse(localStorage.getItem("profile")).nickname;
      }
       return this.loged;
    },
    commands:function(command){
      switch(command){
        case "setLogout":{
          this.loged=false;
          // delCookie("UID");
          localStorage.setItem("loged",false);
          console.log("setlogout run");
          var _this=this;
          axios.post("/signup/logout").then(function({data}){
            _this.isLoged();
            Bus.$emit("popup",data.msg);
          })
          break;
        }
        case "personal":{
          this.$router.push("/personal");
          break;
        }
      }
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
        cursor: pointer;
        .el-dropdown-link{
          .avatar_items{
            margin:0 6px;
          }
            // width: 128px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            img{
                display: block;
                width:20px;
                height:auto;
                border-radius: 50%;
            }
        }
        .landing{
          font-size:14px;
          color:#737775;
          
          a{
          color:#737775;
            
          }
        }
    }
  }
}
</style>
