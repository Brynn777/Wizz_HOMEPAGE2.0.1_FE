<template>
  <div>
    <!-- 顶部导航 -->
    <a-menu v-model="currentRoute" mode="horizontal" class="topMenu">
      <a-menu-item key="storymanagement" class="quaterItem" @click="topMenuLink($event)">事件</a-menu-item>
      <a-menu-item key="productionmanagement" class="quaterItem" @click="topMenuLink($event)">产品</a-menu-item>
      <a-menu-item key="membermanagement" class="quaterItem" @click="topMenuLink($event)">成员</a-menu-item>
      <a-menu-item key="logmanagement" class="quaterItem" @click="topMenuLink($event)">操作日志</a-menu-item>
    </a-menu>
    <!-- 侧边抽屉 -->
    <a-drawer :title="drawerTitle" :visible="drawerVisible" placement="right" >
      <template v-slot:handle v-if="buttonVisible">
        <div class="handle" @click="changeDrawer">
          <a-icon type="setting"></a-icon>
        </div>
      </template>
      <!-- 选择器 -->
      <a-select @change="changeStoryYear" placeholder="请选择年份" class="selector" key="Selector1" v-if="storySelector">
        <a-select-option v-for="item in storySelectorList" :key="item">{{item}}年</a-select-option>
      </a-select>
      <a-select @change="changeProductType" placeholder="请选择类别" class="selector" key="Selector2" v-if="productSelector">
        <a-select-option v-for="item in productSelectorList" :key="item">{{item}}</a-select-option>
      </a-select>
      <a-cascader @change="changeMemberType" :options="memberSelectorList" v-if="memberSelector" changeOnSelect />
      <!-- 列表 -->
      <a-list key="List1" v-if="storySelector" itemLayout="horizontal">
        <div v-for="item in storyList" :key="`story${item.id}`">
          <a-list-item style="cursor:pointer" v-if="storyYear==item.year||storyYear==-1" @click="showDetailWithid(item.id)">
            {{item.name}}
          </a-list-item>
        </div>
      </a-list>
      <a-list key="List2" v-if="productSelector" itemLayout="horizontal">
        <div v-for="item in productList" :key="`product${item.id}`">
          <a-list-item style="cursor:pointer" v-if="productType==item.ProjectType||productType==-1" @click="showDetailWithid(item.id)">
            {{item.Name}}
          </a-list-item>
        </div>
      </a-list>
      <a-list key="List3" v-if="memberSelector" itemLayout="horizontal">
        <div v-for="item in memberList" :key="`member${item.id}`">
          <a-list-item style="cursor:pointer" v-if="(memberType==item.MemberType||memberType==-1)&&(memberYear==item.SchoolYear||memberYear==-1)"  @click="showDetailWithid(item.id, item.MemberType)">
            {{item.Name}}
          </a-list-item>
        </div>
      </a-list>
    </a-drawer>
    <router-view ref="detailPage"></router-view>
  </div>
</template>

<script>
import { getAllStories, getAllProducts, getAllMembers } from '../../api/api'
import router from "../../router/index";
export default {
  data: function() {
    return {
      currentRoute: ["storymanagement"],
      // 抽屉显示/隐藏
      drawerTitle: "",
      drawerVisible: false,
      buttonVisible:true,
      storyYear: -1,
      productType: -1,
      memberType: -1,
      memberYear: -1,
      storyList:[],
      productList:[],
      memberList:[],
      storySelector:false,
      productSelector:false,
      memberSelector:false,
      storySelectorList:[],
      memberSelectorList:[
        {
          value: 0,
          label: '导师',
        },
        {
          value: 1,
          label: '前端组',
          children: [],
        },
        {
          value: 2,
          label: '产品组',
          children: [],
        },
        {
          value: 3,
          label: '后端组',
          children: [],
        },
        {
          value: 4,
          label: '运营组',
          children: [],
        },
      ],
      productSelectorList:["校企合作项目", "校园合作项目", "校内自研项目"],
    };
  },
  //根据路由动态改变右边的抽屉
  //
  beforeUpdate: function() {
    if(router.history.current.name == "storymanagement") {
        this.drawerTitle = "历史事件";
        this.currentRoute[0] = "storymanagement";
        this.memberSelector = this.productSelector = false;
        this.storySelector = this.buttonVisible = true;
      } else if(router.history.current.name == "productionmanagement") {
        this.drawerTitle = "产品信息";
        this.currentRoute[0] = "productionmanagement";
        this.memberSelector = this.storySelector = false;
        this.productSelector = this.buttonVisible = true;
      } else if (router.history.current.name == "membermanagement") {
        this.drawerTitle = "成员信息"
        this.currentRoute[0] = "membermanagement";
        this.storySelector = this.productSelector = false;
        this.memberSelector = this.buttonVisible = true;
      } else if (router.history.current.name == "logmanagement") {
        this.drawerTitle = "成员信息"
        this.currentRoute[0] = "logmanagement";
        this.memberSelector = true;
        this.storySelector = this.productSelector = this.buttonVisible = false;
      }
  },
  created: function() {
    this.currentRoute[0] = router.history.current.name;
    for( var i = 2015; i<=new Date().getFullYear(); i++) {
      this.memberSelectorList[1].children.push({
          value: i,
          label: `${i}级`,
      })
      this.memberSelectorList[2].children.push({
          value: i,
          label: `${i}级`,
      })
      this.memberSelectorList[3].children.push({
          value: i,
          label: `${i}级`,
      })
      this.memberSelectorList[4].children.push({
          value: i,
          label: `${i}级`,
      })
    }
  },
  methods: {
    // 打开/关闭抽屉
    changeDrawer() {
      this.drawerVisible = !this.drawerVisible;
      this.handleStory();
      this.handleProduct();
      this.handleMember();
    },
    // 事件处理
    handleStory() {
      getAllStories().then(res => {
        if(res.status == 200) {
          console.log(res)
          let self = this;
          self.storyList = [];
          res.data.forEach(function(item){
            var year = new Date(item.timeStamp*1000).getFullYear();
            item.year = year;
            //处理年份
            if(self.storySelectorList.indexOf(year) == -1) {
              self.storySelectorList.push(year)
            }
            self.storySelectorList.sort();
            self.storyList.push(item);
          })
        }
      });
    },
    // 产品处理
    handleProduct() {
      getAllProducts().then(res => {
        if(res.status == 200) {
          console.log(res);
          let self = this;
          self.productList = [];
          res.data.forEach(function(item){
            self.productList.push(item);
          })
        }
      })
    },
    //成员处理
    handleMember() {
      getAllMembers().then(res => {
        if(res.status == 200) {
          console.log(res);
          let self = this;
          self.memberList = [];
          res.data.forEach(function(item){
            self.memberList.push(item);
          })
        }
      })
    },
    // 改变列表状态
    changeStoryYear(value){
      this.storyYear = value;
    },
    changeProductType(value){
      if(value == '校企合作项目') this.productType = 0;
      else if(value == '校园合作项目') this.productType = 1;
      else if(value == '校内自研项目') this.productType = 2
    },
    changeMemberType(value){
      this.memberType = value[0];
      if(value.length > 1)
        this.memberYear = value[1];
      else
        this.memberYear = -1;
    },
    // 调用子组件，变成修改状态
    showDetailWithid(id, type) {
      this.$refs.detailPage.setChangePage(id, type);
    },
    topMenuLink(e) {
      router.push({ name: e.key });
    },
  }
};
</script>

<style scoped>
.quaterItem {
  width: 25%;
  text-align: center;
}
.handle{
    position: absolute;
    top: 340px;
    right: 255px;
    width: 32px;
    height: 48px;
    line-height: 48px;
    background: #ffffff;
    padding-left: 10px;
    border-radius: 5px 0 0 5px;
    z-index: 999999;
    border-left: 1px solid #cccccc;
    border-top: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
}
.topMenu{
  margin-bottom: 2em;
}
.selector {
  width: 200px;
  margin-bottom: 30px;
}
</style>