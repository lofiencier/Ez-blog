<template>
  <div class="single_comment_content">
    <div class="single_comment">
    <Avatar size="16px" shape="circle"/>
    <a :href="'#/user?id='+comment.creator._id" class="user_name">
      <strong>{{me==comment.creator._id?"我":comment.creator.nickname}}</strong>
    </a>
    <span><small>评论</small></span>
    <a :href="'#/user?id='+comment.targetUser._id" class="user_name">
      <strong>{{me==comment.targetUser._id?"我":comment.targetUser.nickname}}:</strong>
    </a>
    <span>{{comment.content}}</span>
    <a href="javascript:void(0)" class="reply" @click="this.toggleComment">{{showComment?"取消":"回复"}}</a>
  </div>
  <Reply v-if="showComment" :creator="me" :targetUser="comment.creator._id"/>
  </div>
  
</template>

<script>
import Avatar from "./avatar";
import { getCookie } from "./util";
import Reply from "./reply";
export default {
  props: ["comment"],
  data() {
    return {
      me: "",
      showComment: false
    };
  },
  mounted() {
    this.me = getCookie("UID");
  },
  components: {
    Avatar,
    Reply
  },
  methods: {
    toggleComment: function() {
      this.showComment = !this.showComment;
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

</style>
