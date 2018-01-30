<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Tips/>
    <Personal/>
  </div>
</template>

<script>
import Tips from "./components/tip"
import Header from "./components/header"
import Personal from "./components/personal"
export default {
  name: 'app',
  components:{
    Tips,Header,Personal
  }
}
</script>


