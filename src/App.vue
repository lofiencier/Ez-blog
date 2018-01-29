<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Tips/>
    
  </div>
</template>

<script>
import Tips from "./components/tip"
import Header from "./components/header"
export default {
  name: 'app',
  components:{
    Tips,Header
  }
}
</script>


