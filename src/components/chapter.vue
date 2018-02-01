<template>
    <div :class="noAngle?'single_charter no_angle':'single_charter'">
        <h1 class="title">{{chap.title}}</h1>
        <p v-html="chap.content" class="chapter_content"></p>
        <div class="controls">
          <More msg="More"/>
          <span><a href="javascript:void(0)" @click="delHandler" :data-id="chap._id" v-if="del">删除</a></span>
          <span><a href="javascript:void(0)" @click="toggleComment">{{showInputBox?"取消":"评论"}}</a></span>
        </div>
        <div class="comment_wrap" v-if="showInputBox||chap.comments.length>0">
          <Comments :comments="chap.comments" v-if="chap.comments.length"/>
          <CommentBox v-if="showInputBox" :chapId="chap._id" :targetId="chap.creator" @toggle="toggleComment"/>
        </div>
    </div>
</template>

<script>
import Comments from "./comments.vue"
import CommentBox from "./comment_input"
import More from "./more"
import axios from "axios"
import Bus from "./bus"
export default {
  props:["chap","del","noAngle"],
  data() {
    return {
      showInputBox:false
    };
  },
  created(){
    
  },
  mounted(){
    // console.log(this.chap)
  },
  components:{
    Comments,More,CommentBox
  },
  methods:{
    toggleComment:function(){
      this.showInputBox=!this.showInputBox;
    },
    delHandler:function(e){
      var chapId=e.currentTarget.getAttribute("data-id");
      this.delChap(chapId);
    },
    delChap:function(id){
      axios.post("/chapter/delete",{
        chapId:id
      }).then(function(result){
        var msg= result.data.msg;
        Bus.$emit("refresh");
        Bus.$emit("popup",result.data.msg);
      })
    }
  }
  
};
</script>

<style lang="less">
.single_charter {
  margin:40px 0;
  padding:1px 0;
  width: 100%;
  height: auto;
  background: #fff;
  color:#444;
  box-shadow: rgba(0,0,0,.1) 0 2px ;
  position: relative;
  .title{
    margin:0;
    padding:1em 1em;
    display: flex;
    align-items: center;
    font-size: 20px;
    &::before{
      content:"文章";
      color:#fff;
      background:#779e00;
      font-size: 16px;
      padding:0 6px;
      margin-right: 10px;
    }
  }
  p{
    line-height: 1.5em;
    margin:0 16px;
  }
  &::before{
    content:"";
    position: absolute;
    width: 0;
    height: 0;
    left:-25px;
    top:0px;
    border-top: 25px solid rgb(255, 255, 255);
    border-left: 25px solid transparent; 
    
  }
  .chapter_content{
    // width:800px;
    max-width:96%;
    // margin:10px;
    margin:0 auto;

    img{
      max-width:100%;
    }
  }
}
.controls{
  margin:20px 20px;
  position: relative;
  font-size: 12px;
  text-align: right;
  color:#aaa;
  span{
    margin:0 5px;
    a{
      color:#aaa;
    }
  }
}
.comment_wrap{
  height: auto;
  margin:20px 20px;
  border-top: 1px solid rgb(238, 238, 238);
}

.single_charter.no_angle::before{
  content:none;
}
</style>
