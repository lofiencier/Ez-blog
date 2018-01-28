<template>
  <!-- <Header/> -->
  <section class="root_content">
    <Avatar imgUrl="./static/images/avatar.jpg" size="100px" :style="{'flex':'1 0 auto'}"/>
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
      UID:""
    }
  },
 created(){
    var UID=getCookie("UID");
    this.UID=UID;
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
