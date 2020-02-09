<template>
    <div>
        <div id="memberFE" class="memberBack">
            <img
             src="../assets/img/Member/fe_be.png" 
             alt="前端"
             class="memberImage">
            <div class="memberText">
                <div class="boldText">{{info.One.title}}</div>
                <div v-for="(item, index) in info.One.detail" :key="`front_end${index}`">{{item}}</div>
            </div>
        </div>
        <a-row type="flex" justify="start" :gutter="16" align="bottom">
            <a-col class="centerText" v-for="(item,key) in memberList1" :key="`${item.id}member`" :xs="6" :sm="3">
                <a-tooltip>
                    <template slot="title">
                    {{item.Describe}}
                    </template>
                    <img
                    :src="item.UrlAvatar" 
                    alt="前端"
                    class="width24 roundGraph">
                    {{item.Name}}
                </a-tooltip>
            </a-col>
        </a-row>
        <br><br>
        <div id="memberPD" class="memberBack">
            <img 
             src="../assets/img/Member/production.png" 
             alt=""
             class="memberImage">
            <div class="memberText">
                <div class="boldText">{{info.Two.title}}</div>
                <div v-for="(item, index) in info.Two.detail" :key="`product${index}`">{{item}}</div>
            </div>
        </div>
        <a-row type="flex" justify="start" :gutter="16" align="bottom">
            <a-col class="centerText" v-for="(item,key) in memberList2" :key="`${item.id}member`" :xs="6" :sm="3">
                <a-tooltip>
                    <template slot="title">
                    {{item.Describe}}
                    </template>
                    <img
                    :src="item.UrlAvatar" 
                    alt="产品"
                    class="width24 roundGraph">
                    {{item.Name}}
                </a-tooltip>
            </a-col>
        </a-row>
        <br><br>
        <div id="memberBE" class="memberBack">
            <img 
             src="../assets/img/Member/fe_be.png" 
             alt=""
             class="memberImage"
            >
            <div class="memberText">
                <div class="boldText">{{info.Three.title}}</div>
                <div v-for="(item, index) in info.Three.detail" :key="`back_end${index}`">{{item}}</div>
            </div>
        </div>
        <a-row type="flex" justify="start" :gutter="16" align="bottom">
            <a-col class="centerText" v-for="(item,key) in memberList3" :key="`${item.id}member`" :xs="6" :sm="3">
                <a-tooltip>
                    <template slot="title">
                    {{item.Describe}}
                    </template>
                    <img
                    :src="item.UrlAvatar" 
                    alt="后端"
                    class="width24 roundGraph">
                    {{item.Name}}
                </a-tooltip>
            </a-col>
        </a-row>
        <br><br>
        <div id="memberOP" class="memberBack">
            <img
             src="../assets/img/Member/operate.png" 
             alt=""
             class="memberImage"
            >
            <div class="memberText">
                <div class="boldText">{{info.Four.title}}</div>
                <div v-for="(item, index) in info.Four.detail" :key="`operate${index}`">{{item}}</div>
            </div>
        </div>
        <a-row type="flex" justify="start" :gutter="16" align="bottom">
            <a-col class="centerText" v-for="(item,key) in memberList4" :key="`${item.id}member`" :xs="6" :sm="3">
                <a-tooltip>
                    <template slot="title">
                    {{item.Describe}}
                    </template>
                    <img
                    :src="item.UrlAvatar" 
                    alt="运营"
                    class="width24 roundGraph">
                    {{item.Name}}
                </a-tooltip>
            </a-col>
        </a-row>
        <br><br>
    </div>
</template>

<script>
import '../assets/style/public.css'
import { getAllMembers } from '../api/api'
export default {
    name: 'Member',
    data: function() {
        return {
            memberList:[],
            memberList1:[],
            memberList2:[],
            memberList3:[],
            memberList4:[],
            info:{
                One:{
                    title:"技术部前端",
                    detail: [
                        "-前端核心模块的设计、开发，对代码质量及进度负责",
                        "-上承产品文档，下输测试原型，紧密配合后端对接，参与产品开发实战",
                        "-关注前沿技术，及时转化为生产",
                        "-技能：html&css&javascript、前端框架、算法等",
                    ]
                },
                Two:{
                    title:"产品部",
                    detail: [
                        "-负责互联网产品的设计和推广，为产品的整个生命周期负责",
                        "-发现需求，解决需求，并用落地产品实现",
                        "-运用适当的工具完成各类产品文档，同时进行项目管理",
                        "技能：沟通、协作、洞察力、工具使用等",
                    ]
                },
                Three:{
                    title:"技术部后端",
                    detail: [
                        "-配合产品经理、前端，对程序&网页的后台设计负责",
                        "-维护数据库及系统的日常稳定",
                        "-技能：数据库、编程语言、算法等",
                        "-技能：html&css&javascript、前端框架、算法等",
                    ]
                },
                Four:{
                    title:"运营部",
                    detail: [
                        "-对内负责工作室日常运转，对外负责活动、自媒体的维护",
                        "-以目标为导向，用数据驱动，负责产品上线后的运营",
                    ]
                },
            }
        }
    },
    mounted: function() {
        this.handleMember();
    },
    methods: {
        handleMember() {
            getAllMembers().then(res => {
                if(res.status == 200) {
                console.log(res);
                let self = this;
                self.memberList = [];
                res.data.forEach(function(item){
                    self.memberList.push(item);
                    if(item.MemberType==1){
                        self.memberList1.push(item);
                    }else if(item.MemberType==2){
                        self.memberList2.push(item);
                    }else if(item.MemberType==3){
                        self.memberList3.push(item);
                    }else if(item.MemberType==4){
                        self.memberList4.push(item);
                    }
                })
                }
            })
        },
    }
}
</script>

<style scoped>
.memberBack{
    background: #eff4fd;
   
    border-radius:6px;
}
.memberText{
    padding:0 1em 1em 1em;
}
.memberImage{
    border-radius:6px 6px 0 0;
}
.centerText{
    text-align: center
}
</style>