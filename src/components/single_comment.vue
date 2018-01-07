<template>
  <div class="single_comment">
    <Avatar size="16px" shape="circle"/>
    <a href="#" class="user_name"><strong>USERNAME:</strong></a>
    <span>你在说什么啊？</span>
    <a href="#" class="reply">回复</a>
  </div>
</template>

<script>
import Avatar from "./avatar";
export default {
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
