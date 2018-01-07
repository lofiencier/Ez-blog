<template>
  <div class="avatar" :style="classObject">
      <img :src="imgUrl||'./static/images/anymous.svg'" alt="">
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props:["imgUrl","size","shape"],
  data(){
    return{
      classObject:{
        "width":"100%",
        "height":"auto",
        "border-radius":"0px"
      }
    }
  },
  mounted(){
    // console.log(this.imgUrl);
    this.init();
  },
  methods:{
    init:function(){
      this.classObject.width=this.size||"100%";
      switch(this.shape){
        case "circle":{
          this.classObject.borderRadius="50%";
          break;
        }
        case "rect"||"":{
          this.classObject.borderRadius="0%";
          break;
        }
      }
      
    }
  }
};
</script>

<style lang="less">
.avatar {
  overflow: hidden;
  img{
      display: block;
      width: 100%;
      height: auto;
  }
}
</style>
