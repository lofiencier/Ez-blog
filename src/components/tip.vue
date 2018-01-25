<template>
    <div class="tip_cover" v-if="msg">
        <span>{{msg}}</span>
    </div>
</template>

<script>
import Bus from "./bus"
export default {
    mounted(){
        Bus.$on("popup",this.popup);
    },
  data(){
      return {
          msg:''
      }
  },
  methods:{
      popup:function(msg){
          this.msg=msg;
          var _this=this;
          setTimeout(function(){
              _this.msg='';
          },1000);
      }
  }
}
</script>


<style lang="less">
    .tip_cover{
        position: fixed;
        top:0;
        left: 0;
        display: flex;
        // align-items: center;
        justify-content: center;
        // height: 100%;
        width: 100%;
        span{
            border-radius: 4px;
            max-width: 50%;
            padding:10px 20px;
            color:#fff;
            background:rgba(0, 0, 0, 0.6);
            // border-radius: 10px;

        }
    }
</style>

