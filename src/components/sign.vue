<template>
  <div class="sign_root_content">
      <div class="sign_box">
          <div class="logo">
            <img src="static/images/logo.png" alt="">
            <span>Lofter</span>
          </div>
          <div class="sign_tabs_control">
              <a href="javascript:void(0)" :class="tab=='signup'?'active':''" @click="changeTabs" data-t="signup">注册</a>
              <a href="javascript:void(0)" :class="tab=='login'?'active':''" @click="changeTabs" data-t="login">登陆</a>
          </div>
          <div class="sign_tabs">
              <div class="tabs_signup tabs_content" v-show="tab=='signup'?true:false">
                  <form action="#" id="signup" method="POST" >
                      <el-input placeholder="常用邮箱"/>
                      <el-input placeholder="密码"/>
                      <el-checkbox v-model="checked" style="margin-top:10px">记住我</el-checkbox>
                      <br>
                      <el-button type="primary" size="large" native-type="submit" style="width:100%;margin:10px 0">提交</el-button>
                  </form>
              </div>
              <div class="tabs_content tabs_login" v-show="tab=='login'?true:false">
                  <form action="#" id="signup" method="POST" >
                      <el-input placeholder="常用邮箱"/>
                      <el-input placeholder="密码"/>
                      <el-checkbox v-model="checked" style="margin-top:10px">记住我</el-checkbox>
                      <br>
                      <el-button type="primary" size="large" native-type="submit" style="width:100%;margin:10px 0">提交</el-button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Sign",
  data() {
    return {
      tab: "signup",
      checked:true
    };
  },
  methods: {
    changeTabs: function(e) {
      e = e || window.event;
      let _this = e.currentTarget;
      this.$data.tab = e.currentTarget.getAttribute("data-t");
    }
  }
};
</script>



<style lang="less">
.sign_root_content {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(/static/images/log_bg.jpg) center no-repeat;
  display: flex;
  align-items: center;
  
  .sign_box {
    margin: 0 auto;
    width: 400px;
    min-height: 320px;
    // background:#fff;
    .sign_tabs_control {
      width: 100%;
      height: 56px;
      background: rgba(17, 17, 17, 0.5);
      display: flex;
      a {
        line-height: 56px;
        color: rgba(255, 255, 255, 0.5);
        height: 100%;
        flex: 1 1 auto;
        text-align: center;
        &:hover {
          color: #fff;
        }
        &.active {
          background: #fff;
          color: #444;
        }
      }
    }
    .sign_tabs {
      width: 100%;
      min-height: 220px;
      background: #fff;
    }
    
  }
  .tabs_content{
    padding:30px;
  }

  .logo{
    display: flex;
    margin-bottom: 10px;
    align-items: flex-end;
    img{
      // flex: 0 0 40px;
      display: block;
      height: 40px;
      width: 40px;

    }
    span{
      flex:1 0 auto;
      font-size:24px;
      color:#fff;
    }
  }
}
</style>
