<template>
  <div class="single_comment_content">
    <div class="single_comment">
    <Avatar size="16px" shape="circle" :imgUrl="comment.creator.imgUrl"/>
    <a :href="'#/user/'+comment.creator._id" class="user_name">
      <strong>{{comment.creator.nickname}}:</strong>
    </a>
    <!-- <span><small>评论</small></span> -->
    <!-- <a :href="'#/user?id='+comment.targetUser._id" class="user_name" v-if="comment.targetUser._id==me">
      <strong>{{'@'+comment.targetUser.nickname}}</strong>
    </a> -->
    <span>{{comment.content}}</span>
    <a href="javascript:void(0)" class="reply" @click="toggleReplyInput">{{showReplyInput?"取消":"回复"}}</a>
    <a href="javascript:void(0)" class="reply" @click="toggleReplyInput">{{me===comment.creator._id?"删除":""}}</a>
  </div>
  <div class="replys_content" v-if="comment.beReplied.length">
    <SingleReply v-for="reply in comment.beReplied" :key="reply._id" :reply="reply" :top="comment.creator" :commentId="comment._id"/>
  </div>
  <ReplyInput v-if="showReplyInput" :targetUser="comment.creator" :commentId="comment._id" @toggle="toggleReplyInput"/>
  </div>
  
</template>

<script>
import Avatar from "./avatar";
import axios from "axios"
import { getCookie } from "./util";
import ReplyInput from "./reply_input"
import SingleReply from "./single_reply"
export default {
  props: ["comment"],
  data() {
    return {
      me: "",
      showReplyInput: false
    };
  },
  created() {
    this.me = getCookie("UID");
    // console.log(this.imgUrl);
  },
  components: {
    Avatar,
    ReplyInput,
    SingleReply
  },
  methods: {
    toggleReplyInput: function() {
      this.showReplyInput = !this.showReplyInput;
    },
    delReply:function(){
      
    }
  }
};
</script>

<style lang="less">
.single_comment {
  height: 30px;
  display: flex;
  font-size: 12px;
  align-items: center;
  .user_name {
    margin: 0 8px;
  }
  .reply {
    color: #779e00;
    margin-left: .5em;
  }
  
}
.replys_content{
    margin:0 2em;
    overflow: hidden;
  }
</style>
