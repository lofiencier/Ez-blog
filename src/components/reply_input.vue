<template>
  <div class="reply_content">
      <form class="reply_form" autocomplete="false" @submit="submitHandler">
          <el-input
            :placeholder="'@'+targetUser.nickname+':'" name="content"
            v-model="content"
            size="small"
            autosize>
          </el-input>
          <el-button type="primary" size="small" native-type="submit" style="margin:0 0 0 10px">提交</el-button>
          
          <input type="hidden" name="commentId" :value="this.commentId">
          
      </form>
  </div>
</template>

<script>
import axios from "axios"
import Bus from "./bus"
import {getCookie} from "./util"
export default {
  data(){
    return{
      content:''
    }
  },
  methods: {
    submitHandler: function(e) {
      e=e||window.event();
      var form = e.currentTarget;
      e.preventDefault();
      var content = this.content;
      var commentId=form.commentId.value;
      this.postReply({
        content,commentId,targetUser:this.targetUser._id,chapterId:this.chapId
      },e.currentTarget);
      return false;
    },
    postReply: function(info,form) {
      var that =this;
      var cookie=getCookie("UID");
      var loged=localStorage.getItem("loged");
      if(cookie&&loged){
        axios.post("/reply/publish",info).then(function(result){
        if(result.data.status==="200"){
          Bus.$emit("refresh",result.data.msg);
          that.$emit("toggle");
          // Bus.$emit("popup",result.data.msg);
        }
      });
      }else{
        Bus.$emit("err","请先登录");
      }
      
    }
  },
  props: ["creator", "targetUser","commentId","chapId"]
};
</script>

<style lang="less">
.reply_content {
  width: 100%;
  min-height: 30px;
  .reply_form {
    display: flex;
  }
  .reply_input {
    box-sizing: border-box;
    height: 28px;
    flex: 1 0 auto;
    font-size: 12px;
    text-indent: 0.5em;
  }
  .reply_submit {
    // padding:4px 10px;
    padding: 6px 10px;
    background: #779e00;
    font-size: 12px;
    text-align: center;
    color: #fff;
    border: 0;
    &:hover {
      border: 0;
    }
  }
}
</style>
