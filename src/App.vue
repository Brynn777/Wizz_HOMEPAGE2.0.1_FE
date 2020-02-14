<template >
  <div id="app">
    <div v-if="visibleMenu" class="myMenu">
      <a-icon  @click="setHideMenu" class="closeIcon" type="close" />
      <a-menu mode="inline" :openKeys="openKeys" @openChange="onOpenChange" class="myMenuContent">
      <a-sub-menu v-for="(value, name, index) of menu" :key="value.name">
        <span class="menuText" slot="title"><span class="offsetTitle">{{value.name}}</span></span>
        <a-menu-item @click="routerLink(name)" v-for="(subvalue, subname, subindex) of value.detail" :key="subvalue">
           <a :href="subname">{{subvalue}}</a>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    </div>
    <a-layout :class="blurContent?'fullHeightBlur':'fullHeight'">
      <a-layout-header theme="light" class="topHeader" style="display:flex">
        <img src="./assets/img/wizzStudio.jpg" alt="为之logo" :class="triggerVisible ? 'topImageInMobile' :'topImageInPC'"/>
        <a-menu
          v-if="!triggerVisible"
          theme="light" 
          mode="horizontal" 
         v-model="current"
          @openChange="oneOpenMenu"
          :openKeys="openKeys"
          :style="{ lineHeight: '64px' }"
          >
          <a-sub-menu v-for="(value, name, index) of menu" :key="value.name">
            <div slot="title" >
              <a-icon :type="value.icon" />
              <div class="mainItem">{{value.name}}</div>
            </div>
            <a-menu-item @click="routerLink(name)" v-for="(subvalue, subname, subindex) of value.detail" :key="subvalue">
              <a :href="subname">{{subvalue}}</a>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
         <a-icon v-if="triggerVisible" @click="setShowMenu" style="position:absolute;right:40px;font-size: 18px; line-height: 64px;" type="bars" />
      </a-layout-header>
      <a-layout class="fullHeight">
        <a-layout-sider @breakpoint="checkMobile" width="240" breakpoint="xl" theme="light" collapsedWidth="0" class="sideGeryBlockLeft" :trigger="null"></a-layout-sider>
        <a-layout-content theme="light" @click="touchCloseMenu">
          <div class="mainContent">
            <router-view />
          </div>
          <img src="./assets/img/wei.png" class="roundLogo" @click="gotoManagePage()"/>
        </a-layout-content>
        <a-layout-sider width="240" breakpoint="xl" theme="light" collapsedWidth="0" class="sideGeryBlockRight" :trigger="null"></a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import "./assets/style/public.css";
import router from "./router/index";
import { getAllProducts, getAllMembers, removeToken,getToken } from './api/api'
export default {
  name: "App",
  data: function() {
    return {
      blurContent:false,
      visibleMenu:false,
      rootSubmenuKeys: ['主页', '产品', '合作与导师', '成员', '联系我们', '后台管理'],
      openKeys: [''],
      gotoManagePage:this.gotoManage(3,this.realGotoManage),
      current: ['主页'],
      menuCollapsed: false,
      triggerVisible:true,
      menuName: ['主页', '产品', '合作与导师', '成员', '联系我们', '后台管理'],
      //menu每个对象的name用于路由跳转，detail的name用于锚点定位
      menu: {
        "homepage":{
          name: "主页",
          icon:"appstore",
          detail: {
            "#firstPage": "首页",
            "#introduction": "介绍",
            "#culture": "文化",
            "#history": "历史",
            "#atmospher": "氛围",
            "#member": "成员去向"
          }
        },
        "production": {
          name: "产品",
          icon:"dropbox",
          detail: {
            "#model": "模板"
          }
        },
        "corporation": {
          name: "合作与导师",
          icon:"slack",
          detail: {
            "#teacher": "导师"
          }
        },
        "member": {
          name: "成员",
          icon:"idcard",
          detail: {
            "#memberFE": "技术部前端",
            "#memberPD": "产品部",
            "#memberBE": "技术部后端",
            "#memberOP": "运营部",
          }
        },
        "connection": {
          name: "联系我们",
          icon:"link",
          detail: {
            "#connect": "联系方式",
            "#profile": "简历投递"
          }
        },
      },
    };
  },
  mounted: function(){
    this.handleProduct();
    this.handleMember();
    window.addEventListener("beforeunload", function() {
      removeToken("loginToken");
    });
  },
  methods: {
    onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.openKeys = openKeys;
        } else {
          this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
    setShowMenu(){
      this.handleProduct();
      this.handleMember();
      this.visibleMenu=true;
      this.blurContent = true;
    },
    setHideMenu(){
      this.visibleMenu=false;
      this.blurContent = false;
    },
    //成员处理
    handleMember() {
      getAllMembers().then(res => {
        if(res.status == 200) {
          let self = this;
          self.menu.corporation.detail = {};
          for( var i = 0; i < res.data.length; i++) {
            if(res.data[i].MemberType == 0){
              self.$set(self.menu.corporation.detail,`#teacher${i}`,res.data[i].Name)
            }
          }
        }
      })
    },
    handleProduct() {
      getAllProducts().then(res => {
          if(res.status == 200) {
              let self = this;
              self.menu.production.detail = {};
              for( var i = 0; i < res.data.length; i++) {
                this.$set(self.menu.production.detail,`#product${i}`,res.data[i].Name)
              }
          }
      })
    },
    checkMobile(broken) {
      this.triggerVisible = broken;
      return broken;
    },
    oneOpenMenu(openKeys) {
      //openKeys是一个数组,里面是前一个标签页+现在的标签页
      //this.openKeys是现在的标签页（其实本来是所有打开的标签页）
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.menuName.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    touchCloseMenu(){
      if(this.triggerVisible){
         this.menuCollapsed = true;
      }
    },
    routerLink: function(data) {
      router.push({name: data})
    },
    gotoManage(times,fn){
      let count = 0;
      return function() {
        if(++count==times){
          count = 0;
          fn();
        }
      }
    },
    realGotoManage(){
      router.push({name:"login"});
    }
  }
};
</script>

<style scope>
.myMenu{
  z-index:999;
  height:100%;
  opacity: 0.7;
  background:white;
  position:fixed;
  width:100%
}
.closeIcon{
  position:absolute;
  right:38px;
  top:18px;
  font-size:20px
}
.myMenuContent{
  width: 100%;
  text-align:center;
  margin-top:80px
}
.menuText{
  font-size:16px;
  font-weight:700
}
.menuSider{
  background:white;
}
.ant-menu-inline .ant-menu-item::after{
  border-right:0px 
}
.ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow{
  display:none;
}
.offsetTitle{
  position: relative;
  right: -5px;
}

.topHeader {
   background:#ffffff;
   position: absolute;
   z-index: 111;
   padding:0; 
   width:100%;
   
   display:inline-block
}
.topImageInPC {
  width:160px;
  margin-left:240px;
  float: left;
}
.topImageInMobile {
  width:160px;
  margin-left:30px;
  float: left;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger:hover {
  color: #1890ff;
}
.mainItem {
  display:inline-block;
}
.ant-menu-inline .ant-menu-submenu-title {
    padding-right: 0px;
}
.mainContent {
  margin: 74px 10px 10px;
  width:calc(100% - 20px);
  padding: 10px;
  border-radius: 3px;
  height: calc(100% - 84px);
  background: white;
  overflow:auto;
  /* border:1px solid red; */
}
.sideGeryBlockRight {
  background: #f0f2f5;
  outline:1px solid #e4e3e3 ;

}
.sideGeryBlockLeft {
  background: #f0f2f5;
  outline:1px solid #e4e3e3;

}
.roundLogo {
  position: fixed;
  bottom: 10px;
  right:10px;
  z-index: 9999;
  width:38px
}
</style>
