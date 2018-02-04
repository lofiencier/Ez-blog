<template>
  <div class="root_user">
    <div class="cover_content">
      <div class="cover">
      <img src="static/images/user_bg.jpg" alt="">
    </div>
    <div class="user_info">
      <div class="user_detail">
        <Avatar shape="circle" size="120px" :border="{width:'8px',color:'white'}" :imgUrl="imgUrl"/>
        <div class="detail_name_des">
          <p>{{nickname}}</p>
          <span>{{description?"个人简介："+description:"个人简介："+"这个家伙什么都没留下"}}</span>
        </div>
      </div>
      <div class="user_social">
        <a href="#">
          <p>文章</p>
          <span>{{chapters.length}}</span>
        </a>
        <a href="#">
          <p>创建时间</p>
          <span>{{formatTime}}</span>
        </a>
      </div>
    </div>
    </div>
    <Chapter v-for="chap of chapters" :key="chap.id" :chap="chap" :del="amIcreator" :noAngle="true"/>
  </div>  
</template>

<script>
import Avatar from "./avatar"
import Chapter from "./chapter"
import axios from "axios"
import {getCookie,initFormatDate} from "./util"
export default {
  data(){
    return {
      chapters:[],
      UID:'',
      imgUrl:'',
      description:'',
      nickname:"anymous",
      createTime:''
    }
  },
  created(){
    // this.UID=getCookie("UID");
    // console.log(this.$router);
    this.UID=this.$router.history.current.params.id;
    this.fetchChapters();
  },
  components: {
    Avatar,Chapter
  },
  methods: {
    fetchChapters: function(msg) {
      var _this=this;
      axios.post("/user",{UID:_this.UID}).then(function({data}){
        if(data.status==="200"){
          console.log(data);
          _this.imgUrl=data.imgUrl;
          _this.description=data.description;
          _this.nickname=data.nickname;
          _this.createTime=data.createTime;
          _this.chapters=data.chapters;
        }
      })
    }
  },
  computed:{
    amIcreator:function(){
      var uid=getCookie("UID")||"";
      return uid===this.UID;
    },
    formatTime:function(){
      initFormatDate();
      var newDate=new Date();
      newDate.setTime(this.createTime);
      console.log(newDate,newDate.format('yyyy-MM-dd'));
      return newDate.format('yyyy-MM-dd');

    }
  }
};
</script>

<style lang="less">
.root_user {
  width: 1000px;
  margin: 40px auto;
  color: #444;
  .cover_content{
    position: relative;
  }
  .cover {
    box-sizing: border-box;
    background: white;
    min-height: 340px;

    border: 8px solid white;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .user_info {
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    bottom: 20px;
    padding: 0 30px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .user_detail {
      display: flex;
      align-items: flex-end;
      .detail_name_des {
        padding: 8px 10px;
        span{
          font-size:12px;
          color:#737775;
        }
      }
    }
    .avatar {
      box-sizing: border-box;
      background: white;
      img {
        width: 100;
        height: 100%;
      }
    }
    .user_social {
      display: flex;
      align-items: flex-end;
      a {
        text-align: center;
        padding: 8px 12px;
        
      }
      span{
        color:#737775;
        font-size:14px;
      }
    }
    p {
      margin: 4px 0;
      font-weight: bold;
    }
  }
}
</style>
