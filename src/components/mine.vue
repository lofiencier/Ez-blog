<template>
  <section class="root_content">
    <div class="mine_content" v-if="loged">
      <Avatar :imgUrl="imgUrl" size="100px"  shape="circle" style="{flex:0 0 auto}"  :border="{width:'4px',color:'white'}"/>
      <Content :UID="UID"/>
    </div>
    <div class="unloged" v-if="!loged"></div>
  </section>
</template>

<script>
import Header from "./header.vue"
import Content from "./content.vue"
import Avatar from "./avatar.vue"
import {getCookie} from "./util"
export default {
  name: 'Mine',
  data () {
    return {
      UID:"",
      imgUrl:"./static/images/anymous.svg",
      loged:false
    }
  },
 created(){
    var UID=getCookie("UID");
    this.UID=UID;
    var loged=localStorage.getItem("loged");
    if(UID&&loged){
      this.loged=true;
    }
    var imgUrl=JSON.parse(localStorage.getItem("profile")).imgUrl;
    if(imgUrl){
      this.imgUrl=imgUrl;
    }
  },
  components:{
    Header,Content,Avatar
  }
}
</script>

<style lang="less">
  .root_content{
    position: relative;
    
    .mine_content{
      max-width: 1000px;
    height: auto;
    margin:40px auto;
    display: flex;
    justify-content: space-between;
    }
    .unloged{
      top:-20px;
      left: 0;
      z-index: -1;
      position: fixed;
      width:100%;
      height: 100%;
      background:url(/static/images/unloged.jpg) center no-repeat;
    }
  }
</style>
