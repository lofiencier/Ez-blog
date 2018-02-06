<template>
    <section>
        <div class="load_more" v-show="show">
        <!-- <span>加载更多</span>
         -->
         <i class="el-icon-loading"></i>
         <span>loading...</span>
    </div>
        <div class="nomore" v-show="nomore">
            <span>没有更多了</span>
        </div>
    </section>
</template>

<script>
import Bus from "./bus"
export default {
  data(){
      return{
          show:false,
          nomore:false
      }
  },
  created(){
      Bus.$on("showLoadMore",this.shouldShow);
      Bus.$on("nomore",this.noMore);
  },
  beforeDestroy(){
      Bus.$off("showLoadMore",this.shouldShow);
      Bus.$off("nomore",this.noMore);
  },
  components:{
      Bus
  },
  beforeDestroy(){
      Bus.$off("showLoadMore",this.shouldShow);
      Bus.$off("nomore",this.noMore);
  },
  methods:{
      shouldShow:function(bl){
          this.show=bl;
      },
      noMore:function(bl){
          this.show=!bl;
          this.nomore=bl;
      }
  }
}
</script>

<style lang="less">
    .load_more,.nomore{
        min-height:20px;
        font-size:14px;
        text-align: center;
        color:#aaa;
    }
</style>

