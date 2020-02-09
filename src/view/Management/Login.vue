<template>
<div>
    <div class="tip">后台管理系统</div>
    <a-form
        :form="form"
        class="login-form"
        @submit="handleSubmit"
    >
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名' }] }
        ]"
        placeholder="用户名"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] }
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        登录
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>
<script>
import {loginAsAdmin, setToken} from '../../api/api'
import router from '../../router';
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  data: function(){
      return {
          username:"",
          password:""
      }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            this.username = values.userName;
            this.password = values.password;
            loginAsAdmin(this.username,this.password).then(res => {
              console.log(res);
                if(res.status == 200) {
                    setToken("loginToken", res.data.token);
                    router.push({name: "storymanagement"});
                } else if(res.status == 401) {
                    this.$message.config({top: `200px`,duration: 2,});
                    this.$message.info('请确认您的用户名和密码');
      
                } else {
                    this.$message.config({top: `200px`,duration: 2,});
                    this.$message.info('服务器故障，请联系管理员');
                }
                console.log(res);
            });
            console.log(this.username);
            console.log(this.password);
        }
      });
    },
  },
};
</script>
<style>
.login-form {
  max-width: 500px;
  margin:2em auto;
}

.login-form-button {
  width: 100%;
  margin:1em auto;
}
.tip{
    font-size:12px;
}
</style>