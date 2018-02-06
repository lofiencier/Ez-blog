<template>
  <section class="discocer_root">
    <div class="chap_wrap" v-for="chap of chapters" :key="chap.id">
      <a :href="'#/user/'+chap.creator._id" class="chap_avatar">
        <Avatar size="80px" :imgUrl="chap.creator.imgUrl" shape="circle"/>
        <span class="nickname">{{chap.creator.nickname}}</span>
      </a>
      <Chapter :chap="chap" :del="false"/>
    </div>
    <More/>
  </section>
</template>
<script>
import Chapter from "./chapter"
import Avatar from "./avatar"
import axios from "axios"
import Bus from "./bus"
import More from "./more"

export default {
  name:"Discover",
  data(){
    return {
      chapters:[],
      total:0,
      limit:10,
      offset:0
    }
  },
  created(){
    this.fetchChapters();
    Bus.$on("refresh",this.freshChapters);
  },
  beforeDestroy () {
    Bus.$off("refresh",this.freshChapters);
  },
  methods:{
    fetchChapters:function(offset,limit){
      var _this=this;
      axios.get("/discovery",{
        params:{
          offset:offset,
          limit:limit
        }
      }).then(function(result){
        if(result.data.status==="200"){
          if(_this.chapters.length===0){
            _this.chapters=result.data.chaps;
          }else{
            console.log("你有运行吗");
            // _this.chapters.concat(result.data.chaps);
            _this.chapters=Array.prototype.concat(_this.chapters,result.data.chaps);
            console.log(_this.chapters);
          }
          _this.total=result.data.total;
          document.addEventListener("scroll",_this.scrollEvent);
        }
      })
    },
    scrollEvent:function(e){
      if(this.offset>=this.pages){
        document.removeEventListener("scroll",this.scrollEvent);
        Bus.$emit("nomore",true);
      }
      var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
      // console.log(height,document.documentElement.clientheight);
      var height=document.documentElement.scrollHeight;
      var clientHeight=document.documentElement.clientHeight;
      if(height-clientHeight-scrollHeight<4){
        Bus.$emit("showLoadMore",true);
        if(this.offset<=this.pages){
          console.log(this.offset,this.pages);
          this.offset+=1;
          document.removeEventListener("scroll",this.scrollEvent);
          this.fetchChapters(this.offset);
        }
      }
    },
    freshChapters:function(msg){
      var _this=this;
      axios.get("/discovery",{
        params:{
          limit:(this.offset+1)*this.limit
        }
      }).then(function(result){
        if(result.data.status==="200"){
          _this.chapters=result.data.chaps;
          _this.total=result.data.total;
          if(msg){
            Bus.$emit("popup",msg);
          }
        }
      })
    }
  },
  computed:{
    pages:function(){
      return Math.floor(this.total/this.limit);
    }
  },
  components:{
    Chapter,
    Avatar,
    More
  }
}
</script>

<style lang="less">
.discocer_root {
  position: relative;
  max-width: 1000px;
  margin: 40px auto;
  height: auto;
  .chap_wrap {
    display: flex;
    margin: 40px 0;
    .single_charter {
      // margin-left: 40px;
      margin: 0 0 0 40px;
    }
  }
  .chap_avatar {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    max-height: 140px;
    .nickname {
      max-width:80px;
      display: block;
      margin-top: 10px;
      color: #737775;
    }
    .avatar {
      margin: 0 auto;
    }
  }
}
</style>
