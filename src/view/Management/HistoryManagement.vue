<template>
  <div>
    <a-form @submit="add" layout='horizontal' :form="form" style="position:relative">
      <a-button @click="setAddStatus" v-if="addButtonVisible" class="roundButtonLeft" shape="circle" icon="file-add" ></a-button>
      <a-button @click="gotoDelete" v-if="deleteButtonVisible" class="roundButtonRight" shape="circle" icon="delete"></a-button>
      <a-form-item label="事件名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'storyName',
            { initialValue: storyInfo.name,
              rules: [{ required: true, message: '事件名称是必填项' }] }]"
             placeholder="请输入事件名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="事件描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'storyDes',
            { initialValue: storyInfo.describe,
              rules: [{ required: true, message: '事件描述是必填项' }] }]"
            placeholder="请输入事件描述"
        ></a-input>
      </a-form-item>
      <a-form-item label="事件时间" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-monthPicker 
          v-decorator="[
          'month', 
          { initialValue: storyInfo.time,
            rules: [{required: true, message: '事件时间是必填项'}]}]"
          placeholder="请选择时间"
        />
      </a-form-item>
      <div class="centerText" style="font-size:12px">{{tip}}</div>
      <a-form-item :wrapper-col="formItemLayout.buttonCol">
        <a-button html-type="submit" v-if="addVisible" type="primary" class="bulkButton">添加事件</a-button>
        <a-button @click="change(changeId)" v-if="changeVisible" type="primary" class="bulkButton">修改事件</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import "../../assets/style/public.css";
import router from "../../router/index";
import { removeToken, getToken, getOneStory, addStory, changeStory, deleteStory } from "../../api/api.js";
export default {
  data: function() {
    this.form = this.$form.createForm(this);
    return {
      changeId: 0,
      storyInfo:{
        name: "",
        describe: "",
        time: this.$moment(),
      },
      tip:"Tip：事件描述请带上月份，不需要年份。如：七月上旬，...",
      addButtonVisible: false,
      deleteButtonVisible: false,
      addVisible: true,
      changeVisible: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
        buttonCol: {
           lg: { span: 12, offset: 6}
        }
      }
    };
  },
  methods: {
    // 添加事件
    add(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if(!err) {
          addStory(values.month.unix(), values.storyName, values.storyDes)
          .then(res => {
              this.showHandleTip2(res, values, '添加');
            }
          );
        }
      });
    },
    // 修改事件
    change(id) {
      this.form.validateFields((res, values) => {
        console.log(values)
        if(!err){
          changeStory(values.month.unix(), values.storyName, values.storyDes, id)
          .then(res => {
              this.showHandleTip2(res, values, '修改');
            }
          );
        }
      });
    },
    // 删除事件
    delete (id) {
     return deleteStory(id).then((res) => {
        this.showHandleTip(res);
      })
    },
    
    // 页面改变，index页调用
    setChangePage(id) {
      this.changeId = id;
      getOneStory(id).then((res) => {
        this.form.setFieldsValue({
          storyName: res.data.name,
          storyDes: res.data.storyDescribe,
          month: this.$moment(res.data.timeStamp*1000),
        });
        this.setChangeStatus();
      })
    },
    // 删除前的确认
    gotoDelete() {
      var self = this;
      self.$confirm({
        title: '删除',content: '您确认要删除本事件吗？',okText: '确认',cancelText: '取消',
        onOk() {
          self.delete(self.changeId)
        },
        onCancel() {},
      });
    },
    // 添加状态
    setAddStatus() {
      this.form.resetFields();
      this.addButtonVisible = this.deleteButtonVisible = this.changeVisible = false;
      this.addVisible = true;
    },
    // 修改状态
    setChangeStatus() {
      this.addButtonVisible = this.changeVisible = this.deleteButtonVisible = true;
      this.addVisible = false;
    },
    // 删除后的操作提示
    showHandleTip(res) {
      this.$message.config({ top: `200px`, duration: 2 });
      if (res.status == 200 || res.status == 404) {
          let self = this;
          this.$message.success(`事件已成功删除`);
          this.setAddStatus();
        } else if (res.status == 401) {
          this.$message.error(`您的身份已过期，请重新登录`);
          setTimeout(function() {
            router.push({ name: "login" });
          }, 2000);
        } else if (res.status == 504) {
          this.$message.warning(`请求超时，请稍后再试`);
        } else {
          this.$message.warning(`服务器故障，请联系管理员`);
        }
    },
    // 添加修改后的操作提示
    showHandleTip2(res, values, handleType) {
      this.$message.config({ top: `200px`, duration: 2 });
      if (res.status == 200) {
        let self = this;
        this.$message.success(`事件“${values.storyName}”已成功${handleType}`);
        if(handleType == '添加') {
          setTimeout(function() {
            self.form.resetFields();
          }, 2000);
        }
      } else if (res.status == 401) {
        this.$message.error(`您的身份已过期，请重新登录`);
        setTimeout(function() {
          router.push({ name: "login" });
        }, 2000);
      } else if (res.status == 504) {
        this.$message.warning(`请求超时，请稍后再试`);
      } else {
        this.$message.warning(`服务器故障，请联系管理员`);
      }
    },
  },
};
</script>

<style scoped>
.bulkButton {
  width: 100%;
  margin: 1em auto;
}
.roundButtonLeft {
  position:absolute;
  right:50px;
  top:-8px;
  z-index:999;
}
.roundButtonRight {
  position:absolute;
  right:10px;
  top:-8px;
  z-index:999;
}
</style>