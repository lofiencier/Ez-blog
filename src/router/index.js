import Vue from 'vue'
import Router from 'vue-router'
import Mine from '@/components/mine'
import Discover from "@/components/discover"
import Sign from "@/components/sign"
import User from "@/components/user"
import Personal from "@/components/personal"

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
      path:"/sign",
      name:"Sign",
      component:Sign
    },
    {
      path:"/user/:id",
      name:"User",
      component:User
    },
    {
      path:"/personal",
      name:"Personal",
      component:Personal
    }
  ]
})

export default router;