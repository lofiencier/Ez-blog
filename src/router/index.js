import Vue from 'vue'
import Router from 'vue-router'
import Mine from '@/components/mine'
import Discover from "@/components/discover"
import Sign from "@/components/sign"
import User from "@/components/user"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      name:"Discover",
      component:Discover
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path:"/sign",
      name:"Sign",
      component:Sign
    },
    {
      path:"/user/:id",
      name:"User",
      component:User
    }
  ]
})
