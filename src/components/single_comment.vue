<template>
  <div class="single_comment">
    <Avatar size="16px" shape="circle"/>
    <a :href="'#/user?id='+comment.creator._id" class="user_name"><strong>{{comment.creator.nickname}}</strong></a>
    <span><small>评论</small></span>
    <a :href="'#/user?id='+comment.targetUser._id" class="user_name"><strong>{{comment.targetUser.nickname}}:</strong></a>
    <span>{{comment.content}}</span>
    <a href="#" class="reply">回复</a>
  </div>
</template>

<script>
import Avatar from "./avatar";
export default {
  props:["comment"],
  components: {
    Avatar
  }
};
</script>

<style lang="less">
    .single_comment{
        height: 30px;
        display: flex;
        font-size: 12px;
        align-items: center;
        .user_name{
            margin:0 8px;
        }
        .reply{
            color:#779e00;
        }
    }
</style>
