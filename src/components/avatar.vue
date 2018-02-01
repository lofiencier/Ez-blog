<template>
  <div class="avatar" :style="classObject">
      <img :src="imgUrl||'./static/images/anymous.svg'" alt="">
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props:["imgUrl","size","shape","border"],
  data(){
    return{
      classObject:{
        "width":"100%",
        "height":"auto",
        "border":"0px solid white",
        "border-radius":"0px",
        "flex":'0 0 auto'
      }
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init:function(){
      
      this.classObject.width=this.size||"100%";
      this.classObject.height=this.size||"auto";
      this.classObject.flex="0 0 "+this.size||"0 0 auto";
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
      if(this.border){
        this.classObject.border=`${this.border.width} solid ${this.border.color}`
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
