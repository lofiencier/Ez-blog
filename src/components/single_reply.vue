<template>
    <div class="single_reply_content">
        <div class="single_reply_wrap">
            <Avatar size="16px" shape="circle" :imgUrl="reply.replier.imgUrl"/>
            <a :href="'#/user/'+reply.replier._id" class="user_name">
            <strong>{{reply.replier.nickname}}:</strong>
            </a>
            <a :href="'#/user/='+reply.beReplier._id" class="user_name" v-if="reply.replier._id!=top._id">
            <strong>{{'@'+reply.beReplier.nickname}}</strong>
            </a>
            <span>{{reply.content}}</span>
            <a href="javascript:void(0)" class="reply" @click="toggleReplyInput" :data-id="reply.replier._id">{{showReplyInput?"取消":"回复"}}</a> 
            <a href="javascript:void(0)" class="del" @click="delReply(commentId,reply._id)">{{me===reply.replier._id&&loged?"删除":""}}</a>
        </div>
        <ReplyInput v-if="showReplyInput" :targetUser="reply.replier" :commentId="commentId" @toggle="toggleReplyInput"/>
    </div>
</template>

<script>
import Avatar from "./avatar";
import axios from "axios";
import ReplyInput from "./reply_input";
import {getCookie} from "./util"
import Bus from "./bus"

export default {
  props: ["reply", "top", "commentId","loged"],
  mounted() {
    // console.log(this.up);

  },
  data() {
    return {
      replys: [],
      me:"",
      showReplyInput: false
    };
  },
   created() {
    this.me = getCookie("UID");
    // console.log(this.imgUrl);
  },

  methods: {
    fetchReplys: function() {
      // axios.get()
    },
    delReply:function(commentId,replyId){
      console.log(commentId,replyId);
      axios.post("/reply/delete",{commentId,replyId}).then(function({data}){
        // console.log(data);
        if(data.status==="200"){
          console.log("这里运行多少次?")
          Bus.$emit("refresh",data.msg);

        }
      })
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
  .reply,.del {
    padding: 0 0.5em;
    font-size: 12px;
    color: #779e00;
  }
}
</style>
