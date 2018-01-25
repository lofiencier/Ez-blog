<template>
  <div class="reply_content">
      <form class="reply_form" autocomplete="false" @submit="submitHandler">
          <input type="text" class="reply_input" :placeholder="'@'+targetUser.nickname+':'" name="content">
          <input type="submit" class="reply_submit" value="回复">
          <input type="hidden" name="commentId" :value="this.commentId">
      </form>
  </div>
</template>

<script>
import axios from "axios"
import Bus from "./bus"
export default {
  methods: {
    submitHandler: function(e) {
      e=e||window.event();
      var form = e.currentTarget;
      e.preventDefault();
      var content = form.content.value;
      var commentId=form.commentId.value;
      this.postReply({
        content,commentId,targetUser:this.targetUser._id
      },e.currentTarget);
      return false;
    },
    postReply: function(info,form) {
      console.log(info);
      var that =this;
      axios.post("/reply/publish",info).then(function(result){
        if(result.data.status==="200"){
          Bus.$emit("refresh");
          that.$emit("toggle");
        }
      })
    }
  },
  props: ["creator", "targetUser","commentId"]
};
</script>

<style lang="less">
.reply_content {
  width: 100%;
  min-height: 30px;
  .reply_form {
    display: flex;
    height: 28px;
    align-items: center;
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
