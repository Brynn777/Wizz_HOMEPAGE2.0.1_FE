<template >
  <div id="app">
    <a-layout class="fullFill">
      <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0.1"
      class="protect">
      <div style="background:white;height:64px"></div>
      </a-layout-sider>
      <a-layout-sider
        breakpoint="md"
        collapsedWidth="0"
        @collapse="onCollapse"
        @breakpoint="onBreakpoint"
        style="background:white"
      >
        <br><br><br>
        <a-menu 
        theme="light" 
        mode="inline" 
        :defaultSelectedKeys="['主页']"

        >
          <a-sub-menu  v-for="(item,index) of menu" :key="item.name">
            <span slot="title"><a-icon :type="icon[index]" /><span>{{item.name}}</span></span>
            <a-menu-item v-for="(subitem) of item.detail" :key="subitem">
              <span>{{subitem}}</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content >
          <div class="backWhiteHeader">
            <img src="./assets/img/wizzStudio.jpg" class="topLogo" alt="">
          </div>
          <div class="content">
            <router-view />
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
      breakpoint="lg"
      collapsedWidth="0.1"
      class="protect">
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      menu:[{
        name:"主页",
        detail:["首页","介绍","历史","氛围建设","成员去向"]
      },{
        name:"产品",
        detail:["约游戏","编程语言排行","模板"]
      },{
        name:"合作与导师",
        detail:["导师"]
      },{
        name:"成员(部门)",
        detail:["成员信息"]
      },{
        name:"联系我们",
        detial:[]
      },{
        name:"后台管理",
        detail:["历史管理","产品管理","成员管理"]
      }],
     icon:["appstore","dropbox","slack","idcard","link","cloud"],
    }
  },
  
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  }
}
</script>

<style scope>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height:100%
}
body{
  margin:0px;
  overflow:hidden
}
.fullFill{
  height:100%
}
.topLogo{
  height:64px;
  display:block;
  margin-left: 40px
}
.backWhiteHeader{
  background: white;
  position: absolute;
  height:64px;
  width:100%;
  z-index:1
}
.content{
  margin:74px 10px 10px;
  padding:10px;
  border-radius:10px;
  min-height:90%;
  background:white;
}
.protect{
  background:#f0f2f5;

}
</style>
