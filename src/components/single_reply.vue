<template>
    <div class="single_reply_content">
        <div class="single_reply_wrap">
            <Avatar size="16px" shape="circle"/>
            <a :href="'#/user/'+reply.replier._id" class="user_name">
            <strong>{{reply.replier.nickname}}:</strong>
            </a>
            <a :href="'#/user/='+reply.beReplier._id" class="user_name" v-if="reply.replier._id!=top._id">
            <strong>{{'@'+reply.beReplier.nickname}}</strong>
            </a>
            <span>{{reply.content}}</span>
            <a href="javascript:void(0)" class="reply" @click="toggleReplyInput" :data-id="reply.replier._id">{{showReplyInput?"取消":"回复"}}</a> 
            <a href="javascript:void(0)" class="reply">删除</a>
        </div>
        <ReplyInput v-if="showReplyInput" :targetUser="reply.replier" :commentId="commentId" @toggle="toggleReplyInput"/>
    </div>
</template>

<script>
import Avatar from "./avatar";
import axios from "axios";
import ReplyInput from "./reply_input";

export default {
  props: ["reply", "top", "commentId"],
  mounted() {
    // console.log(this.up);

  },
  data() {
    return {
      replys: [],
      showReplyInput: false
    };
  },
  methods: {
    fetchReplys: function() {
      // axios.get()
    },

    toggleReplyInput: function() {
      this.showReplyInput = !this.showReplyInput;
    }
  },
  components: {
    Avatar,
    ReplyInput
  }
};
</script>

<style lang="less">
.single_reply_content {
  min-height: 30px;

  .single_reply_wrap {
    min-height:30px;
    display: flex;
    align-items: center;
  }
  .user_name {
    font-size: 12px;
    margin: 0 8px;
  }
  span {
    font-size: 12px;
  }
  .reply {
    padding: 0 0.5em;
    font-size: 12px;
    color: #779e00;
  }
}
</style>
