<template>
  <div class="comments_content">
    <SingleComment v-for="_com of comments" :key="_com.id" :comment="_com"/>
  </div>
</template>

<script>
import SingleComment from "./single_comment"
export default {
  props:["comments"],
  mounted(){
    console.log(this.comments)
  },
  components:{
    SingleComment
  }
}
</script>

<style lang="less">

</style>
