<template>
  <div class="content">
      <Editor/>
      <Chapter v-for="chap of chapters" :key="chap.id" :chap="chap" :del="true"/>
  </div>
</template>

<script>
import axios from "axios";
import Chapter from "./chapter.vue";
import Editor from "./editor";
import Bus from "./bus"

export default {
  data() {
    return {
      //  id:''
      chapters:[]
    };
  },
  props:["UID"],
  mounted() {
    this.fetchChapters();
    Bus.$on("refresh",this.fetchChapters);
    console.log(this.UID);
  },
  methods: {
    fetchChapters: function(msg) {
      //这里有问题
      var _this=this;
      axios.get("/chapter",{params:{UID:_this.UID}}).then(res => {
        this.chapters = res.data.chaps;
        if(msg){
          Bus.$emit("popup",msg);
        }
      });
    }
  },
  components: {
    Chapter,
    Editor
  }
};
</script>

<style lang="less">
.content {
  height: auto;
  flex: 1 1 auto;
  margin-left: 40px;
  position: relative;
}
</style>
