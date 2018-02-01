<template>
  <section class="root_content">
    <Avatar :imgUrl="imgUrl" size="100px"  shape="circle" style="{flex:0 0 auto}"  :border="{width:'4px',color:'white'}"/>
    <Content :UID="UID"/>
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
      imgUrl:"./static/images/anymous.svg"
    }
  },
 created(){
    var UID=getCookie("UID");
    this.UID=UID;
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
    max-width: 1000px;
    height: auto;
    margin:40px auto;
    display: flex;
    justify-content: space-between;
  }
</style>
