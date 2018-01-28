// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/theme.less'
import {Button,Input,Checkbox, Upload} from "element-ui"
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Upload);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
