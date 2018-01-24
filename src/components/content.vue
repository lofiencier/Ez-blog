<template>
  <div class="content">
      <Editor/>
      <Chapter v-for="chap of chapters" :key="chap.id" :chap="chap"/>
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
      chapters: []
    };
  },
  mounted() {
    this.fetchChapters();
    Bus.$on("refresh",this.fetchChapters)
  },
  methods: {
    fetchChapters: function() {
      axios.get("/chapter").then(res => {
        this.chapters = res.data.chaps;
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
