<template>
  <!-- <Header/> -->
  <section class="root_content">
    <Avatar imgUrl="../static/images/avatar.jpg"/>
    <Content/>
  </section>
</template>

<script>
import Header from "./header.vue"
import Content from "./content.vue"
import Avatar from "./avatar.vue"
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  components:{
    Header,Content,Avatar
  }
}
</script>

<style lang="less">
  .root_content{
    width: 1000px;
    height: auto;
    margin:0 auto;
  }
</style>
