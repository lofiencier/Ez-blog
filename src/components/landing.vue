<template>
  <div class="sign_root_content">
      <div class="sign_box">
          <div class="logo">
            <img src="static/images/logo.png" alt="">
            <span>LEAFTER</span>
          </div>
          <div class="sign_tabs_control">
              <a href="javascript:void(0)" :class="tab=='signup'?'active':''" @click="changeTabs" data-t="signup">注册</a>
              <a href="javascript:void(0)" :class="tab=='login'?'active':''" @click="changeTabs" data-t="login">登陆</a>
          </div>
          <div class="sign_tabs">
              <div class="tabs_signup tabs_content" v-show="tab=='signup'?true:false">
                  <el-form :model="sign" id="signup" status-icon :rules="rulesSign" ref="signRule" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="email" label-width="0px">
                      <el-input placeholder="常用邮箱" v-model="sign.email"/>
                    </el-form-item>
                    <el-form-item prop="pass" label-width="0px">
                      <el-input placeholder="请输入密码" type="password" v-model="sign.pass"/>
                    </el-form-item>
                    <el-form-item prop="checkPass" label-width="0px">
                      <el-input placeholder="请再次输入密码" type="password" v-model="sign.checkPass"/>
                    </el-form-item>

                      <!-- <el-checkbox v-model="checked" style="margin-top:10px">完成后登陆</el-checkbox> -->
                      <!-- <br> -->
                      <el-button type="primary" size="large" style="width:100%;margin:10px 0" @click="submitForm('signRule')">提交</el-button>
                  </el-form>
              </div>
              <div class="tabs_content tabs_login" v-show="tab=='login'?true:false">
                  <form action="#" id="login" method="POST" >
                      <el-input placeholder="常用邮箱" v-model="login.email" type="email" name="email" autoComplete/>
                      <el-input placeholder="密码" v-model="login.password" type="password" name="password" autoComplete/>
                      <el-checkbox v-model="checked" style="margin-top:10px">十天免登陆</el-checkbox>
                      <br>
                      <el-button type="primary" size="large" style="width:100%;margin:10px 0" @click="submitLogin">提交</el-button>
                  </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Bus  from "./bus"
import axios  from "axios"

export default {
  name: "Sign",
  data() {
    var checkEmail = (rule, value, callback) => {
        console.log(value);
        var reg= /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (!reg.test(value)) {
            callback(new Error('请输入有效的邮箱'));
          } else {
            callback();
          }
        }, 1000);
      };
      var checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.sign.checkPass !== '') {
            this.$refs.signRule.validateField('checkPass');
          }
          callback();
        }
      };
      var recheckPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.sign.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        sign: {
          email: '',
          pass: '',
          checkPass: ''
        },
        login:{
          email:"",
          password:""
        },
        tab:"login",
        checked:'false',
        rulesSign: {
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ],
          pass: [
            { validator: checkPassword, trigger: 'blur' }
          ],
          checkPass: [
            { validator: recheckPassword, trigger: 'blur' }
          ]
        }
      };
  },
  created(){
    // console.log(this.$router.history.current.query.tab)
    this.tab=this.$router.history.current.query.tab||"login";
  },
  methods: {
    changeTabs: function(e) {
      e = e || window.event;
      let _this = e.currentTarget;
      this.$data.tab = e.currentTarget.getAttribute("data-t");
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.postToDB();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitLogin:function(){
        var _this=this;
        axios.post("/login",{
          email:this.login.email,
          password:this.login.password
        }).then(function({data}){
          console.log(data);
          if(data.status==="200"){
            Bus.$emit('popup',"登陆成功！");
            _this.setLoginState(data.profile);
          }else{
            Bus.$emit('err',"用户名或密码错误")
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      postToDB:function(){
        var _this=this;
        axios.post("/signup",{
              email:_this.sign.email,
              password:_this.sign.pass,
              nickname:_this.sign.email
            }).then(function({data}){
              if(data.status==="200"){
                setLoginState(data.profile);
                Bus.$emit('popup','注册成功!');
              }
            })
      },
      setLoginState:function(profile){
        localStorage.setItem("profile",JSON.stringify(profile));
        localStorage.setItem("loged",true);
        this.$router.push("/");
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
