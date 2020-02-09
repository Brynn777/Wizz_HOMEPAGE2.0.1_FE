<template>
    <div>
        <!-- 首页部分 -->
        <div id="firstPage">
            <a-row :gutter="2">
                <a-col :span="24">
                    <img src="../assets/img/HomePage/first/1.jpg"  alt="成员合照">
                </a-col>
            </a-row>
            <a-row :gutter="2">
                <a-col :span="12">
                    <img src="../assets/img/HomePage/first/2.jpg"  alt="成员合照">
                </a-col>
                <a-col :span="12">
                    <img src="../assets/img/HomePage/first/3.jpg"  alt="116">
                </a-col>
            </a-row>
            <a-row :gutter="2">
                <a-col :span="10">
                    <img src="../assets/img/HomePage/first/4.jpg"  alt="老师">
                </a-col>
            </a-row>
            <a-row :gutter="2" >
                    <a-col :span="24" style="position:relative" id="home1">
                        <img src="../assets/img/char2.png" style="z-index:5" alt="插图">
                    </a-col>
            </a-row>
        </div>
        <!-- 介绍部分 -->
        <div id="introduction">
            <br><br><br>
            <div class="boldText">{{introduction[0]}}</div>
            <div class="normalText">{{introduction[1]}}</div>
            <div class="backGround2">
                <a-row :gutter="0" >
                    <a-col :span="8">
                        <img src="../assets/img/HomePage/second/1.png" class="wid24 roundGraph" alt="产品">
                        <br><br>
                        <img src="../assets/img/HomePage/second/3.jpg" class="wid24 roundGraph" alt="产品">
                    </a-col>
                    <a-col :span="16">
                        <img src="../assets/img/HomePage/second/2.jpg" class="wid24 roundGraph" alt="产品">
                    </a-col>
                </a-row>
                <br>
                <div class="normalText" >{{introduction[2]}}</div>
                <div class="normalText" v-html="introduction[3]" style="position:relative">{{introduction[3]}}</div>
                <br><br>
            </div>
        </div>
        <!-- 文化部分 -->
        <div id="culture">
            <br><br><br>
            <a-row>
                <a-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></a-col>
                <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <img src="../assets/img/HomePage/fifth/culture.jpg" class="wid24" alt="为之文化">
                </a-col>
                <a-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></a-col>
            </a-row>
        </div>
        <!-- 历史部分 -->
        <div id="history" style="width:96%">
        <br><br><br><br>
            <a-timeline mode="alternate">
                <div v-for="(value, name, index) of storyWithYear" :key="name+value">
                    <a-timeline-item>
                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;color:black"/>
                        <div class="boldText">{{name}}</div>
                    </a-timeline-item>
                    <a-timeline-item color="grey" mode="alternate" v-for="(subvalue, subname, subindex) of value" :key="subvalue.id">{{subvalue.storyDescribe}}</a-timeline-item>
                </div>
            </a-timeline>
        </div>
        <!-- 氛围建设部分 -->
        <div id="atmospher">
            <br><br><br>
            <div class="backGround3">
            <a-row :gutter="2" >
                <a-col :span="12">
                    <img src="../assets/img/HomePage/third/1.jpg" class="wid24" alt="场地">
                </a-col>
                <a-col :span="12">
                <div class="boldText">{{atmos[0].name}}</div>
                <div>{{atmos[0].detail}}</div>
                </a-col>
            </a-row>
            <br>
            <a-row :gutter="2" type="flex" align="bottom">
                <a-col :span="8">
                    <img src="../assets/img/HomePage/third/2.jpg" class="wid24" alt="场地">
                </a-col>
            <a-col :span="8">
                    <img src="../assets/img/HomePage/third/3.jpg" class="wid24" alt="场地">
                </a-col>
                <a-col :span="8">
                    <img src="../assets/img/HomePage/third/4.jpg" class="wid24" alt="场地">
                </a-col>
            </a-row>
            <div class="boldText wrapperS">{{atmos[1].name}}</div>
            <div class="normalText wrapperL" v-html="atmos[1].detail">{{atmos[1].detail}}</div>
            <div class="boldText wrapperS">{{atmos[2].name}}</div>
            <div class="normalText wrapperL">{{atmos[2].detail}}</div>    
            <a-row :gutter="2" >
                <a-col :span="16">
                </a-col>
                <a-col :span="8">
                    <img src="../assets/img/HomePage/third/5.jpg" class="wid24 roundGraph" alt="场地">
                </a-col>
            </a-row>
            </div>  
        </div>
        <!-- 成员去向部分 -->
        <div id="member">
            <br><br><br>
            <div class="backGround4">
            <a-row>
                <a-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></a-col>
                <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <img src="../assets/img/HomePage/forth/1.png" class="wid24" alt="毕业去向">
                </a-col>
                <a-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></a-col>
            </a-row>
            <a-row :gutter="2" >
                <a-col :span="12">
                </a-col>
                <a-col :span="12">
                    <img src="../assets/img/HomePage/forth/2.jpg" class="wid24" alt="毕业">
                </a-col>
            </a-row>
            <a-row :gutter="2" >
                <a-col :span="16">
                    <img src="../assets/img/HomePage/forth/3.png" class="wid24" alt="毕业">
                </a-col>
                <a-col :span="8">
                </a-col>
            </a-row>
            <a-row :gutter="2" >
                <a-col :span="12">
                </a-col>
                <a-col :span="12">
                    <img src="../assets/img/HomePage/forth/4.png" class="wid24" alt="">
                </a-col>
            </a-row>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/style/public.css'
import { getAllStories } from '../api/api'
export default {
    name: 'HomePage',
    created: function() {
        this.fillInStory();
    },
    methods: {
        fillInStory:function(){
            getAllStories().then(res => {
                let self = this;
                this.storys = res.data;
                this.storys.forEach(function(item){
                    var temp = new Date(item.timeStamp*1000);
                    item.year = temp.getFullYear();
                })
                this.storys.forEach(function(item){
                    if(self.storyWithYear.hasOwnProperty(item.year)){
                        self.storyWithYear[item.year].push(item);
                    }else{
                        self.$set(self.storyWithYear, item.year,[]);
                        self.storyWithYear[item.year].push(item);
                    }
                })
            });
        },
    },
    data :function() {
        return {
            storys:[],
            storyWithYear:{
            },
            introduction:[
                "为之工作室成立于2017年11月,",
                "是西安电子科技大学创新创业学院下属团队，入驻于星火众创空间二区211、212工作室。",
                "我们是一个敢想敢做的团队，尊重团队里的每一个idea，聚焦专注而为之。",
                "这让我们把为之做到了全校<strong>最有活力、容纳项目最多</strong>的团队。"
            ],
            atmos:[
                {
                    name:"家园环境：",
                    detail:"为之家园——位于星火众创空间二区212、211工作区，拥有公司资质（为之信息互联有限公司）独立的工作室，wifi、空调、零食一应俱全。"
                },
                {
                    name:"V-read 读书会",
                    detail:"步入工作室——你最近在读什么书？<br>日常分享书中内容，更有每月一次的书友会。"
                },
                {
                    name:"V-talk 分享沙龙",
                    detail:"每周一次的分享讨论会，内容聚焦于互联网技术/商业/前景等内容，帮助锻炼路演能力以及临场发挥能力。"
                },
            ],
            memTo:[
                "成员拥有丰富的互联网大厂实习经历，多数已成功进入一线互联网企业工作",
                "同时，我们拥有充足的实习资源—内推、简历直达，连接各大互联网企业"
            ],
            
        }
    },

}
</script>

<style scoped>
.backGround2{
    background:  url('../assets/img/back22.png') no-repeat bottom;
    background-size:100% 60%
}
.backGround3{
    background:  url('../assets/img/back3.png') no-repeat bottom;
    background-size:100% 50%
}
.backGround4{
    background:  url('../assets/img/back4.png') no-repeat bottom;
    background-size:100% 60%
}
.ant-timeline.ant-timeline-alternate .ant-timeline-item-left .ant-timeline-item-content{
    left: 50%;
    width: 40%;
    text-align: left;
}
</style>