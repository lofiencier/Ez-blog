import Vue from 'vue'
import Router from 'vue-router'
import Mine from '@/components/mine'
import Discover from "@/components/discover"
import Landing from "@/components/landing"
import User from "@/components/user"

Vue.use(Router)
var router=new Router({
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
      path:"/landing",
      name:"Landing",
      component:Landing
    },
    {
      path:"/user/:id",
      name:"User",
      component:User
    }
  ]
})

export default router;