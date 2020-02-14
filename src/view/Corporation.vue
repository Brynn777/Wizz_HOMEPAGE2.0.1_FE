<template>
    <div>
        <div class="wrapperS wrapperV">{{intro}}</div>
        <a-card>
            <div v-for="(value, name, index) in teacher" :key="name" :style="{marginBottom: '1em'}">
                <a-card  :id="`teacher${index}`" :title="name" >
                    <a-row>
                        <a-col :xs="8" :sm="8" :md="4" :bg="4">
                            <img :src="value.img" :alt="name" class="width24 roundGraph">
                        </a-col>
                        <a-col :xs="16" :sm="16" :md="20" :bg="20" >
                            <div v-for="(subitem, index) in value.status" :key="subitem" class="wrapperS">
                            {{subitem}}
                            </div>
                        </a-col>
                    </a-row>
                </a-card>
            </div>
        </a-card>
    </div>
</template>

<script>
import '../assets/style/public.css'
import { getAllMembers } from '../api/api'
export default {
    name: "Corporation",
    data: function() {
        return {
            memberList: [],
            path: require("../assets/img/corporation/9朱伟老师copy.jpg"),
            intro: "工作室是隶属在创新创业学院下的组织，在项目开发过程中拥有来自创新创业学院的优秀导师作为项目指导。",
            teacher:{
                // "朱伟老师": {
                //     img: require("../assets/img/corporation/9朱伟老师copy.jpg"),
                //     status: ["创新创业学院的骨干指导老师；", "创新创业学院副院长。"]
                // },
                // "谭茗洲老师": {
                //     img: require("../assets/img/corporation/10谭茗洲老师copy.jpg"),
                //     status: ["西电杰出校友；", "知名天使投资人；", "通信工程学院创新创业导师。"]
                // },
                // "李文轩老师": {
                //     img:require("../assets/img/corporation/11李文轩老师copy.jpg"),
                //     status: ["深圳海鲸教育基金会创始人、理事；", "西安电子科技大学创业导师；", "海鲸创新创业奖学金主要捐赠人；", "助力为之领航计划，提供大量经验指导。"]
                // }
            }
        }
    },
    mounted: function() {
        this.handleMember();
    },
    methods:{
        handleMember() {
            getAllMembers().then(res => {
                if(res.status == 200) {
                let self = this;
                self.memberList = [];
                res.data.forEach(function(item){
                    if(item.MemberType==0){
                        item.des=[];
                        item.TeacherInfo.split('/').forEach(file => {
                            if(file.length>0){
                                item.des.push(file);
                            }
                        })
                        self.memberList.push(item);
                    }
                })
                self.teacher={};
                self.memberList.forEach(item=>{
                    this.$set(self.teacher, item.Name, {
                        img:item.UrlAvatar,
                        status:item.des,
                    })
                })
                }
            })
        },

    }
}
</script>

<style scoped>

</style>