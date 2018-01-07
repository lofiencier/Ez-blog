<template>
  <div class="sign_root_content">
      <div class="sign_box">
          <div class="sign_tabs_control">
              <a href="javascript:void(0)" :class="tab=='signup'?'active':''" @click="changeTabs" data-t="signup">SIGNUP</a>
              <a href="javascript:void(0)" :class="tab=='login'?'active':''" @click="changeTabs" data-t="login">LOGIN</a>
          </div>
          <div class="sign_tabs">
              <div class="tabs_signup tabs_content" v-show="tab=='signup'?true:false">
                  <form action="#" id="signup" method="POST" >
                      <span>SIGNUP</span>
                      <input type="text" name="username" required autocomplete="false">
                      <input type="password" name="password" required autocomplete="false">
                      <input type="file">
                      <input type="submit">
                  </form>
              </div>
              <div class="tabs_content tabs_login" v-show="tab=='login'?true:false">
                  <form action="#" id="login" method="POST" >
                      <span>LOGIN</span>
                      <input type="text" name="username" required autocomplete="false">
                      <input type="text" name="password" required autocomplete="false">
                      <input type="submit">
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
      tab: "login"
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
    height: 320px;
    // background:#fff;
    .sign_tabs_control {
      width: 100%;
      height: 50px;
      background: rgba(17, 17, 17, 0.5);
      display: flex;
      a {
        line-height: 50px;
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
      height: 100%;
      background: #fff;
    }
  }
}
</style>
