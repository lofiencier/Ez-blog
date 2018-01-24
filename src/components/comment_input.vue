<template>
  <div class="comment_box">
      <form class="comment_box_form" @submit="submitHandler">
          <input type="text" name="content" placeholder="写点什么..." autocomplete="false" class="comment_box_input">
          <input type="submit" class="comment_box_submit" value="评论">
      </form>
  </div>
</template>

<script>
import { getCookie } from "./util"
import axios from "axios"
import Bus from './bus'

export default {
  props: ["chapId","targetId","closeBox"],
  methods: {
    submitHandler: function(e) {
      var that=this;
      e = e || window.event;
      e.preventDefault();
      var form = e.currentTarget;
      var content = form.content.value; 
      //   var UID=getCookie("UID")||"";
    //   console.log(this.targetId,this.chapId)
      if(this.chapId&&this.targetId){
        axios.post("/comment/publish", {
        chapterId: this.chapId,
        targetId: this.targetId,
        content:content
      }).then(function(res){
        if(res.data.status==="200"){
            that.$emit('toggle');
            form.content.value='';
            Bus.$emit('refresh',"TIME TO REFRESH");
        }
      })
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
  height: 40px;
  .comment_box_form {
    display: flex;
    height: 100%;
    .comment_box_input {
      flex: 1 0 auto;
      text-indent: 0.5em;
    }
    .comment_box_submit {
      display: block;
      border: 0;
      padding: 0 20px;
      background: #779e00;
      color: #fff;
    }
  }
}
</style>
