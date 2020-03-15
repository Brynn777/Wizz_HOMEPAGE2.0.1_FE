<template>
  <div>
    <a-form @submit="add" :form="form" layout='horizontal' style="position:relative">
      <a-button @click="setAddStatus" v-if="addButtonVisible" class="roundButtonLeft" shape="circle" icon="file-add" ></a-button>
      <a-button @click="gotoDelete" v-if="deleteButtonVisible" class="roundButtonRight" shape="circle" icon="delete"></a-button>
      <a-button @click="exchangeCallName" v-if="exchangeButtonVisible" class="roundButtonRight" shape="circle" icon="swap"></a-button>
      <a-form-item :label="`${callName}名称`" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'memberName',
            { initialValue: memberInfo.name,
              rules: [{ required: true, message: `${callName}名称是必填项` }] }]"
             :placeholder="`请输入${callName}名称`"
        ></a-input>
      </a-form-item>
      <a-form-item :label="`${callName}简介`" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'memberDescribe',
            { initialValue: memberInfo.describe,
              rules: [{ required: true, message: `${callName}简介是必填项` }] }]"
             :placeholder="`请输入${callName}简介`"
        ></a-input>
      </a-form-item>
      <!-- 按钮组 -->
      <a-form-item :label="`${callName}类别`"  v-show="!isTeacher" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-radio-group 
          v-decorator="[
          'memberType',
          { initialValue:memberInfo.type,
          rules: [{ required: true, message: `${callName}类别是必填项` }] }]">
          <!-- <a-radio value="memberType0">导师</a-radio> -->
          <a-radio value="memberType1">前端组</a-radio>
          <a-radio value="memberType2">产品组</a-radio>
          <a-radio value="memberType3">后端组</a-radio>
          <a-radio value="memberType4">运营组</a-radio>
      </a-radio-group>
      </a-form-item>
      <a-form-item :label="`${callName}信息`" v-show="isTeacher" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
          'teacherInfo',
          { initialValue:memberInfo.teacher,
          rules: [{ required: isTeacher, message: `${callName}信息是必填项` }] }]"
          :placeholder="`请输入${callName}信息，用斜线“/”分割`"
        ></a-input>
      </a-form-item>
      <a-form-item label="年级" v-show="!isTeacher" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input-number
          v-decorator="[
          'schoolYear',
          { initialValue:memberInfo.year,
          rules: [{ required: true, message: ' ' }] }]"
          :min="2015" :max="2020"
        ></a-input-number>
      </a-form-item>
      <!-- 图片：成员图标 -->
      <a-form-item :label="`${callName}头像`" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-upload
          v-decorator="[
            'memberUrlAvatar',
            { initialValue:listAvatar,
            rules: [{ required: true,  message: `${callName}头像是必填项` }] }]"
            :action="uploadHost" listType="picture-card" accept="image/*" :data="tokenInfo" :beforeUpload="beforeUpload"
            :fileList="listAvatar" 
            @change="uploadAvatar" 
            @preview="previewAvatar" 
        > <div v-if="listAvatar.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="visibleAvatar" :footer="null" @cancel="cancelAvatar">
          <img alt="example" style="width: 100%" :src="previewImageUrl" />
        </a-modal>
      </a-form-item>
      <a-form-item :wrapper-col="formItemLayout.buttonCol">
        <a-button html-type="submit" v-if="addVisible" type="primary" class="bulkButton">添加{{callName}}</a-button>
        <a-button @click="change(changeId)" v-if="changeVisible" type="primary" class="bulkButton">修改{{callName}}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import "../../assets/style/public.css";
import router from "../../router/index";
import { removeToken, getToken, getUploadToken, getBackGround, getDomain,
         getMember, addMember, changeMember, deleteMember } from "../../api/api.js";
export default {
  data: function() {
    this.form = this.$form.createForm(this);
    return {
       callName: "成员",
       exchangeButtonVisible: true,
       isTeacher: false,
       changeId: 0,
       //导师的SchoolYear都是2018;
       //导师的type是0;前端/产品/后端/运营是1234
       //成员的teacherInfo为空
       memberInfo: {
        describe: "",
        name: "",
        type: "memberType0",
        teacher: "",
        year: "2018",
      },
      // 图片上传
      urlHost:"",
      uploadHost:"",
      tokenInfo:{
        key: "",
        token: ""
      },
      listAvatar: [],
      // 图片预览
      previewImageUrl: '',
      visibleAvatar: false,
      //按鈕組
      addButtonVisible: false,
      deleteButtonVisible: false,
      addVisible: true,
      changeVisible: false,
      //表单样式
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
        buttonCol: {
           lg: { span: 12, offset: 6}
        }
      },
    };
  },    
  mounted () {
    this.memberInfo.year = new Date().getFullYear()-2;
    getBackGround().then( res => {
      this.productUrlBackground=[];
      if(res.status == 200) {
        res.data.forEach(file=>{
        this.productUrlBackground.push(file)
      })
      }
    })
    getDomain().then(res=>{
      if(res.status == 200) {
        this.urlHost = `https://${res.data.domain}/`;
        if(res.data.place == "华东") {
          this.uploadHost = "//upload.qiniup.com/"
        } else if(res.data.place == "华北") {
          this.uploadHost = "//upload-z1.qiniup.com/"
        } else if(res.data.place == "华南") {
          this.uploadHost = "//upload-z2.qiniup.com/"
        } 
      }
    })
  },                                                               
  methods: {
    // 添加成员
    add(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          addMember(values.memberName, parseInt(values.schoolYear), values.memberDescribe,
                      parseInt(values.memberType.split('').pop()), values.teacherInfo, 
                      this.isEmptyArray(this.isArrayOrObject(values.memberUrlAvatar))[0].url)
                      .then((res) => {
                        this.showHandleTip2(res, values, '添加');
                        this.setAddStatus();
                      }, (err) => {
                      });
        } else {
        } 
      });
    },
    // 修改成员
    change(id) {
      this.form.validateFields((err, values) => {
        if (!err) {
          changeMember(values.memberName, parseInt(values.schoolYear), values.memberDescribe,
                      parseInt(values.memberType.split('').pop()), values.teacherInfo, 
                      this.isEmptyArray(this.isArrayOrObject(values.memberUrlAvatar))[0].url, id)
                      .then((res) => {
                        this.showHandleTip2(res, values, '修改');
                      }, (err) => {
                      });
        } else {
        } 
      });
    },
    // 转化成数组
    isArrayOrObject(item) {
      if (Object.prototype.toString.call(item) === "[object Array]") {
        item = item;
      }else if(Object.prototype.toString.call(item)==='[object Object]'){
        item = item.fileList;
      }
      return item;
    },
    isEmptyArray(item) {
      if(item.length == 0) {
        item.push({
          url:'',
        })
      }
      return item;
    },
    // 删除成员
    delete(id) {
     return deleteMember(id).then((res) => {
        this.showHandleTip(res);
      })
    },
    //  页面改变，index页调用
    setChangePage (id, type) {
      this.changeId = id;
      if (type == 0) {
        this.isTeacher = true;
        this.callName = "导师"
      } else {
        this.isTeacher = false;
        this.callName = "成员"
      }
      getMember(id).then((res) => {
        this.form.setFieldsValue({
          memberName: res.data.Name,
          memberDescribe: res.data.Describe,
          memberType: `memberType${res.data.MemberType}`,
          teacherInfo: res.data.TeacherInfo,
          schoolYear: res.data.SchoolYear,
        });
        this.listAvatar = [];
        if(res.data.UrlAvatar.length > 0) {
          this.listAvatar.push({
            uid: res.data.UrlAvatar.split('/').pop(),
            name: res.data.UrlAvatar.split('/').pop(),
            url: res.data.UrlAvatar,
          })
        }
        this.setChangeStatus();
      })
    },
    // 删除前的确认
    gotoDelete() {
      var self = this;
      self.$confirm({
        title: '删除',content: '您确认要删除该人员吗？',okText: '确认',cancelText: '取消',
        onOk() {
          self.delete(self.changeId)
        },
        onCancel() {},
      });
    },
    //上传前钩子，设置filename，获取token
    beforeUpload (file) {
      var filename = `member-${new Date().getTime()}.${file.name.split('.').pop()}`;
      return getUploadToken(filename).then( res => {
        this.tokenInfo.token = res.data;
        this.tokenInfo.key = filename;
      }, err => {
      });
    },
    // 添加状态
    setAddStatus() {
      this.form.resetFields();
      this.listAvatar = [];
      this.exchangeButtonVisible = this.addVisible = true;
      this.addButtonVisible = this.deleteButtonVisible = this.changeVisible = false;
    },
    exchangeCallName() {
      if(this.callName == "成员") {
        this.callName = "导师"
        this.isTeacher = true;
      }
      else if(this.callName == "导师") {
        this.callName = "成员";
        this.isTeacher = false;
      }
        
    },
    // 修改状态
    setChangeStatus() {
      this.addButtonVisible = this.changeVisible = this.deleteButtonVisible = true;
      this.addVisible = this.exchangeButtonVisible = false;
    },
    
    // 删除后的操作提示
    showHandleTip(res) {
      this.$message.config({ top: `200px`, duration: 2 });
      if (res.status == 200 || res.status == 404) {
          let self = this;
          this.$message.success(`人员已成功删除`);
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
        this.$message.success(`人员“${values.memberName}”已成功${handleType}`);
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
    // 预览
    previewAvatar (file) {
      this.previewImageUrl = file.url || file.thumbUrl
      this.visibleAvatar = true
    },
    cancelAvatar () {
      this.visibleAvatar = false
    },
    // 上传
    baseUpload (info) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.thumbUrl = `${this.urlHost}${file.response.key}`;
        }
        return file;
      })
    },
    uploadAvatar ( info ) {
      this.baseUpload(info);
      this.listAvatar = info.fileList;
    },
  },
};
</script>

<style scoped>
.bulkButton {
  width: 100%;
  margin: 1em auto;
}
.upload-list-inline >>> .ant-upload-list-item {
  width: 150px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
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
.backImage{
   width:100%;
   height:80px
}
</style>