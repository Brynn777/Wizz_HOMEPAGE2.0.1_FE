import Vue from 'vue'
import Router from 'vue-router'
import Production from '../view/Production'
import HomePage from '../view/HomePage'
import Corporation from '../view/Corporation'
import Connection from '../view/Connection'
import Member from '../view/Member'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import findLast from'lodash/findLast'
import { getToken } from '../api/api'
Vue.use(Router)

const routes = [
  {
    path: '/homepage',
    name: 'homepage',
    component: HomePage,
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/production',
    name: 'production',
    component: Production,
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/corporation',
    name: 'corporation',
    component: Corporation,
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/member',
    name: 'member',
    component: Member,
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/connection',
    name: 'connection',
    component: Connection,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/management',
    name: 'management',
    meta: {
      requireAuth: true
    },
    component: { render: h => h("router-view") },
    children:[
      {
        path: '/management',
        redirect:'/management/login'
      },
      {
        path: '/management/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName:"management" */"../view/Management/Login")
      },
      {
        path: '/management/detail',
        
        component :() =>
          import(/* webpackChunkName:"management" */"../view/Management/index"),
        children: [
          {
            path: '/management/detail',
            redirect:'/management/detail/story'
          },
          {
            path: '/management/detail/story',
            name: 'storymanagement',
            component: () =>
              import(/* webpackChunkName:"management" */"../view/Management/HistoryManagement")
          },
          {
            path: '/management/detail/member',
            name: 'membermanagement',
            component: () =>
              import(/* webpackChunkName:"management" */"../view/Management/MemberManagement")
          },
          {
            path: '/management/detail/product',
            name: 'productionmanagement',
            component: () =>
              import(/* webpackChunkName:"management" */"../view/Management/ProductionManagement")
          },
          {
            path: '/management/detail/log',
            name: 'logmanagement',
            component: () =>
              import(/* webpackChunkName:"management" */"../view/Management/LogManagement")
          }
        ]
      },
      
    ]
  },
  {
    path: '*',
    redirect: '/homepage'
  }
 ];

const router = new Router({
  mode:"history",
  routes:routes
})

router.beforeEach((to, from, next)=>{
  if(to!==from) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.requireAuth);
  if(record) {
    if(!getToken('loginToken') && to.path !=='/management/login') {
      next({path: '/management/login'});
    } else if(getToken('loginToken') && to.path =='/management/login') {
      next({path: '/management/detail/story'});
    }
    NProgress.done();
    // console.log(getToken('loginToken'));
  }
  next();
})

router.afterEach(()=>{
  NProgress.done();
})

export default router

