<template>
  <section class="discocer_root">
    <form action="/upload/images" method="POST" enctype="multipart/form-data">
      <label for="images">请上传图片：</label>
      <input type="file" name="images">
      <input type="submit" value="确定">
    </form>
    <div class="chap_wrap" v-for="chap of chapters" :key="chap.id">
      <Avatar size="80px"/>
      <Chapter :chap="chap" :del="false"/>
    </div>
  </section>
  
</template>

<script>
import Chapter from "./chapter"
import Avatar from "./avatar"
import axios from "axios"
import Bus from "./bus"
export default {
  name:"Discover",
  data(){
    return {
      chapters:[]
    }
  },
  created(){
    this.fetchChapters();
    Bus.$on("refresh",this.fetchChapters);
  },
  methods:{
    fetchChapters:function(){
      var _this=this;
      axios.get("/discovery").then(function(result){
        if(result.data.status==="200"){
          _this.chapters=result.data.chaps;
          // console.log(result.data.msg);
          // Bus.$emit("popup",result.data.msg);
        }
      })
    }
  },
  components:{
    Chapter,
    Avatar
  }
}
</script>

<style lang="less">
  .discocer_root{
    max-width:1000px;
    margin:40px auto;
    height: auto;
    .chap_wrap{
      display: flex;
      margin:40px 0;
      .single_charter{
        // margin-left: 40px;
        margin:0 0 0 40px;
      }
    }
  }
</style>
