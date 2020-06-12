<template>
    <div>
        <div ref="connect">
            <a-row  type="flex" justify="space-around" align="bottom">
                <a-col :xs="10" :sm="10" :md="8" :lg="8" :xl="8">
                    <img src="../assets/img/Connection/ConnectionWeiPub.jpg" alt="公众号">
                    <div class="centerText">{{nameOne}}</div>
                </a-col>
                <a-col :xs="10" :sm="10" :md="8" :lg="8" :xl="8">
                    <img src="../assets/img/Connection/ConnectionQQ.jpg" alt="QQ群">
                    <div class="centerText">{{nameTwo}}</div>
                </a-col>
            </a-row>
        </div>
        <div ref="profile">
            <a-row  type="flex" justify="space-around">
                <a-col :xs="10" :sm="10" :md="8" :lg="8" :xl="8">
                    <img src="../assets/img/Connection/ConnectWei.jpg" alt="简历投递">
                    <div class="centerText">{{nameThree}}</div>
                </a-col>
            </a-row>
            <img src="../assets/img/back5.jpg" alt="简历投递">
        </div>
       
    </div>
</template>

<script>
import router from "../router/index";
export default {
    name: "Connection",
    data: function() {
        return {
            nameOne:"微信公众号",
            nameTwo:"QQ互联网交流群",
            nameThree:"简历投递",
        }
    },
    method: {

    }    
}
</script>

<style scoped>
.centerText{
    text-align: center
}
.bigIcon{
    font-size:4em
}
</style>