<template>
  <div class="comment_box">
      <form class="comment_box_form" @submit="submitHandler">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="content"
            autosize>
          </el-input>
          <el-button type="primary" size="small" native-type="submit" style="margin:0 0 0 10px;height:33px;">提交</el-button>
      </form>
  </div>
</template>

<script>
import { getCookie } from "./util";
import axios from "axios";
import Bus from "./bus";

export default {
  props: ["chapId", "targetId", "closeBox"],
  data(){
    return{
      content:""
    }
  },
  methods: {
    submitHandler: function(e) {
      var that = this;
      e = e || window.event;
      e.preventDefault();
      var content =this.content;
      //   var UID=getCookie("UID")||"";
      //   console.log(this.targetId,this.chapId)
      if (this.chapId && this.targetId) {
        axios
          .post(`/comment/publish`, {
            timestamp:Date.now(),
            chapterId: this.chapId,
            targetId: this.targetId,
            content: content
          })
          .then(function(res) {
            if (res.data.status === "200") {
              that.$emit("toggle");
              that.content="";
              Bus.$emit("refresh",res.data.msg);
            }
          });
      }
      return false;
    }
  }
};
</script>

<style lang="less">
.comment_box {
  padding-top: 1em;
  width: 100%;
  // height: 40px;

  .comment_box_form {
    display: flex;
    height: 100%;
    .comment_box_input {
      flex: 1 0 auto;
      text-indent: 0.5em;
    }
  }
}
</style>
