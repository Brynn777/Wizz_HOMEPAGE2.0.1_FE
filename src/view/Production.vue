<template>
  <div>
    <div v-for="(item,key) in productList" :key="item.id">
        <div :ref="`product${key}`">
        <br />
        <br />
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :xs="6" :sm="4" :md="3" :bg="3">
            <img :src="item.UrlAvatar" alt />
          </a-col>
          <a-col :xs="16" :sm="9" :md="9" :bg="9" class="centerText">
            <div class="boldText">{{item.Name}}</div>
            <div>{{item.LittleDescribe}}</div>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="20" class="centerText">{{item.Describe}}</a-col>
        </a-row>
        <a-row :gutter="16" type="flex" justify="space-around" align="middle">
          <a-col
            v-for="(subItem,subKey) in item.shot"
            :key="subKey"
            :xs="8"
            :sm="6"
            :md="4"
            :bg="4"
          >
            <img :src="subItem" alt="截图" />
          </a-col>
        </a-row>
        <br />
        <br />
        <a-row :gutter="16" type="flex" justify="space-around" align="middle">
          <a-col :xs="8" :sm="6" :md="4" :bg="4">
            <img v-if="item.UrlPartnerLogo.length>0" :src="item.UrlPartnerLogo" alt="合作方" />
            <div v-if="item.Partner.length>0">合作方：{{item.Partner}}</div>
          </a-col>
          <a-col :xs="8" :sm="6" :md="4" :bg="4">
            <img v-if="item.UrlProCode.length>0" :src="item.UrlProCode" alt="二维码" />
          </a-col>
        </a-row>
        <img :src="item.UrlBackground" alt="背景" />
      </div>
    </div>
  </div>
</template>
<script>
import router from "../router/index";
import { getAllProducts } from "../api/api";
export default {
  name: "Production",
  data: function() {
    return {
      productList: []
    };
  },
  // created: function() {
  //     this.$nextTick(()=>{
  //         console.log("来自新页面")
  //         document.querySelector(this.$route.query.hash).scrollIntoView();
  //     })
  // },
  mounted: function() {
    this.handleProduct();
  },
  methods: {
    // 产品处理
    handleProduct() {
      getAllProducts().then(res => {
        if (res.status == 200) {
          let self = this;
          self.productList = [];
          res.data.forEach(function(item) {
            item.shot = item.UrlScreenshot.split("*");
            item.shot.pop();
            self.productList.push(item);
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.centerText {
  text-align: center;
}
.boldText {
  font-size: 1.2em;
  font-weight: bold;
}
</style>