<template>
  <div id="app">
    <router-view/>
    <Tips/>
  </div>
</template>

<script>
import Tips from "./components/tip.vue"
export default {
  name: 'app',
  components:{
    Tips
  }
}
</script>


