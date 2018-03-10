<template>
  <div class="comments_content">
    <SingleComment v-for="_com of comments" :key="_com.id" :comment="_com" :chapId="chapId" :loged="loged"/>
  </div>
</template>

<script>
import SingleComment from "./single_comment"
import Bus from "./bus"

export default {
  data(){
    return {
      loged:false
    }
  },
  props:["comments","chapId"],
  created(){
    Bus.$on("logout",this.logout);
    var loged=localStorage.getItem('loged');
    this.loged=loged;
  },
  beforeDestory(){
    Bus.$off("logout",this.logout);
  },
  components:{
    SingleComment
  },
  methods:{
    logout:function(loged){
      this.loged=loged
    }
  }
}
</script>

<style lang="less">

</style>
