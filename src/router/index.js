import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'common/HomePage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import findLast from'lodash/findLast'
import { getToken } from '../api/api'
Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect:'/homepage'
  },
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
    component: () =>
      import(/* webpackChunkName:"production" */"common/Production"),
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/corporation',
    name: 'corporation',
    component: () =>
      import(/* webpackChunkName:"corporation" */"common/Corporation"),
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/member',
    name: 'member',
    component: () =>
      import(/* webpackChunkName:"Member" */"common/Member"),
    meta: {
      requireAuth: false,
    }
  },
  {
    path: '/connection',
    name: 'connection',
    component: () =>
      import(/* webpackChunkName:"Connection" */"common/Connection"),
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
    // render是一个函数 render: function(h)=>{ return h("router-view")}
    // render()==h("router-view")
    // Vue 在调用 render 方法时，会传入一个 createElement 函数作为参数
    // 也就是这里的 h 的实参是 createElement 函数，然后 createElement 会以 APP 为参数进行调用
    children:[
      {
        path: '/management',
        redirect:'/management/login'
      },
      {
        path: '/management/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName:"management1" */"manage/Login")
        // component: function(){return import('')}
      },
      {
        path: '/management/detail',
        component :() =>
          import(/* webpackChunkName:"management2" */"manage/index"),
        children: [
          {
            path: '/management/detail',
            redirect:'/management/detail/story'
          },
          {
            path: '/management/detail/story',
            name: 'storymanagement',
            component: () =>
              import(/* webpackChunkName:"management3" */"manage/HistoryManagement")
          },
          {
            path: '/management/detail/member',
            name: 'membermanagement',
            component: () =>
              import(/* webpackChunkName:"management4" */"manage/MemberManagement")
          },
          {
            path: '/management/detail/product',
            name: 'productionmanagement',
            component: () =>
              import(/* webpackChunkName:"management5" */"manage/ProductionManagement")
          },
          {
            path: '/management/detail/log',
            name: 'logmanagement',
            component: () =>
              import(/* webpackChunkName:"management6" */"manage/LogManagement")
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
  }
  next();
})

router.afterEach(()=>{
  NProgress.done();
})

export default router

