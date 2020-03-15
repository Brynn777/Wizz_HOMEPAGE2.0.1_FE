<template>
  <div>
    <a-form @submit="add" :form="form" layout='horizontal' style="position:relative">
      <a-button @click="setAddStatus" v-if="addButtonVisible" class="roundButtonLeft" shape="circle" icon="file-add" ></a-button>
      <a-button @click="gotoDelete" v-if="deleteButtonVisible" class="roundButtonRight" shape="circle" icon="delete"></a-button>
      <a-form-item label="产品名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'productName',
            { initialValue: productInfo.name,
              rules: [{ required: true, message: '产品名称是必填项' }] }]"
             placeholder="请输入产品名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="简要描述" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'productLittleDescribe',
            { initialValue: productInfo.littleDescribe,
              rules: [{ required: true, message: '简要描述是必填项' }] }]"
             placeholder="请输入简要描述"
        ></a-input>
      </a-form-item>
      <a-form-item label="详细介绍" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'productDescribe',
            { initialValue: productInfo.describe,
              rules: [{ required: true, max:50, message: '最多输入50个字' }] }]"
             placeholder="请输入详细介绍"
        ></a-input>
      </a-form-item>
      <!-- 图片：产品图标 -->
      <a-form-item label="产品图标" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-upload
          v-decorator="[
            'productUrlAvatar',
            { initialValue:listAvatar,
            rules: [{ required: true, message: '产品图标是必填项' }] }]"
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
      <!-- 图片：产品二维码 -->
      <a-form-item label="产品二维码" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-upload
          v-decorator="[
            'productUrlProCode',
            { initialValue:listProCode,
            rules: [{ required: false, message: '' }] }
          ]"
            :action="uploadHost" listType="picture-card" accept="image/*" :data="tokenInfo" :beforeUpload="beforeUpload"
            :fileList="listProCode" 
            @change="uploadProCode"
            @preview="previewProCode"
        > <div v-if="listProCode.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="visibleProCode" :footer="null" @cancel="cancelProCode">
          <img alt="example" style="width: 100%" :src="previewImageUrl" />
        </a-modal>
      </a-form-item>
      <!-- 图片：产品截圖 -->
      <a-form-item label="产品截图" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-upload
          v-decorator="[
            'productUrlScreenshot',
            { initialValue:listScreenshot,
            rules: [{ required: false, message: '' }] }]"
            :action="uploadHost" listType="picture-card" accept="image/*" :data="tokenInfo" :beforeUpload="beforeUpload"
            :fileList="listScreenshot"
            @change="uploadScreenShot"
            @preview="previewScreenshot" 
        > <div v-if="listScreenshot.length < 3">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="visibleScreenshot" :footer="null" @cancel="cancelScreenShot">
          <img alt="example" style="width: 100%" :src="previewImageUrl" />
        </a-modal>
      </a-form-item>
      <!-- 文本框 -->
      <a-form-item label="合作方名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
          'productPartner',
          { initialValue:productInfo.partner,
          rules: [{ required: false, message: ' ' }] }]"
          placeholder="请输入合作方名称"
        ></a-input>
      </a-form-item>
      <!-- 图片：合作方logo -->
      <a-form-item label="合作方图标" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-upload
          v-decorator="[
            'productUrlPartnerLogo',
            { initialValue:listPartnerLogo,
            rules: [{ required: false, message: '' }] }]"
            :action="uploadHost" listType="picture-card" accept="image/*" :data="tokenInfo" :beforeUpload="beforeUpload"
            :fileList="listPartnerLogo"
            @preview="previewPartnerLogo"
            @change="uploadPartnerLogo"
        > <div v-if="listPartnerLogo.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="visiblePartnerLogo" :footer="null" @cancel="cancelPartnerLogo">
          <img alt="example" style="width: 100%" :src="previewImageUrl" />
        </a-modal>
      </a-form-item>
      <!-- 按钮组 -->
      <a-form-item label="产品属性" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-radio-group 
          v-decorator="[
          'productType',
          { initialValue:productInfo.productType,
          rules: [{ required: true, message: '产品属性是必填项' }] }
        ]">
        <a-radio value="productType0">校企合作</a-radio>
        <a-radio value="productType1">校园合作</a-radio>
        <a-radio value="productType2">校内自研</a-radio>
      </a-radio-group>
      </a-form-item>
      <!-- 单选框1 -->
      <a-form-item label="背景" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-radio-group 
          v-decorator="[
          'productUrlBackground',
          { initialValue:productInfo.urlBackground,
            rules: [{ required: true, message: '请选择一张背景' }] }
        ]">
          <a-row :gutter="16" style="text-align:center">
            <a-col :span="6" v-for="(item,index) in productUrlBackground" :key="`back${index}`">
              <label :for="`img${index}`">
              <img  class="backImage" :src="productUrlBackground[index]" alt="背景">
              </label>
              <a-radio  :value="productUrlBackground[index]" :id="`img${index}`">
              </a-radio>
            </a-col>
          </a-row>
      </a-radio-group>
      </a-form-item>
      <!-- 提交按钮 -->
      <a-form-item :wrapper-col="formItemLayout.buttonCol">
        <a-button html-type="submit" v-if="addVisible" type="primary" class="bulkButton">添加产品</a-button>
        <a-button @click="change(changeId)" v-if="changeVisible" type="primary" class="bulkButton">修改产品</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import "../../assets/style/public.css";
import router from "../../router/index";
import { removeToken, getToken, getUploadToken, getBackGround, getDomain,
         getProduct, addProduct, changeProduct, deleteProduct } from "../../api/api.js";
export default {
  data: function() {
    this.form = this.$form.createForm(this);
    return {
       changeId: 0,
       productInfo: {
        describe: "",
        littleDescribe: "",
        name: "",
        partner: "",
        productType: "",
        urlBackground: "",
      },
      // 图片上传
      urlHost:"",
      uploadHost:"",
      tokenInfo:{
        key: "",
        token: ""
      },
      listPartnerLogo: [],
      listAvatar: [],
      listProCode: [],
      listScreenshot: [],
      // 图片预览
      previewImageUrl: '',
      visiblePartnerLogo: false,
      visibleAvatar: false,
      visibleProCode: false,
      visibleScreenshot: false,
      //产品背景
      productUrlBackground:[],
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
    // 添加产品
    add(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          var urls = '';
          if(this.isArrayOrObject(values.productUrlScreenshot).length > 0) {
            this.isArrayOrObject(values.productUrlScreenshot).forEach( file => {
              urls += file.url;
              urls += '*';
            }); 
          }
          addProduct(values.productName, values.productLittleDescribe, values.productDescribe,
                      values.productPartner, this.isEmptyArray(this.isArrayOrObject(values.productUrlPartnerLogo))[0].url, 
                      this.isEmptyArray(this.isArrayOrObject(values.productUrlAvatar))[0].url, values.productUrlBackground, urls,
                      parseInt(values.productType.split('').pop()), this.isEmptyArray(this.isArrayOrObject(values.productUrlProCode))[0].url)
                      .then((res) => {
                        this.showHandleTip2(res, values, '添加');
                        this.setAddStatus();
                      }, (err) => {
                      });
        } else {
        } 
      });
    },
    // 修改产品
    change(id) {
      this.form.validateFields((err, values) => {
        if (!err) {
          var urls = '';
          if(this.isArrayOrObject(values.productUrlScreenshot).length > 0){
            this.isArrayOrObject(values.productUrlScreenshot).forEach( file => {
            urls += file.url;
            urls += '*';
          });
          }
          changeProduct(values.productName, values.productLittleDescribe, values.productDescribe,
                        values.productPartner, this.isEmptyArray(this.isArrayOrObject(values.productUrlPartnerLogo))[0].url, 
                        this.isEmptyArray(this.isArrayOrObject(values.productUrlAvatar))[0].url, values.productUrlBackground, urls,
                        parseInt(values.productType.split('').pop()), this.isEmptyArray(this.isArrayOrObject(values.productUrlProCode))[0].url, id)
                        .then((res) => {
                            this.showHandleTip2(res, values, '修改');
                        }, (err) => {
                        });
        } else{
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
    // 删除产品
    delete(id) {
     return deleteProduct(id).then((res) => {
        this.showHandleTip(res);
      })
    },
    //  页面改变，index页调用
    setChangePage (id) {
      this.changeId = id;
      getProduct(id).then((res) => {
        this.form.setFieldsValue({
          productName: res.data.Name,
          productLittleDescribe: res.data.LittleDescribe,
          productDescribe: res.data.Describe,
          productPartner: res.data.Partner,
          productType: `productType${res.data.ProjectType}`,
          productUrlBackground: res.data.UrlBackground,
        });
        this.listPartnerLogo = [];
        if(res.data.UrlPartnerLogo.length > 0) {
          this.listPartnerLogo.push({
            uid: res.data.UrlPartnerLogo.split('/').pop(),
            name: res.data.UrlPartnerLogo.split('/').pop(),
            url: res.data.UrlPartnerLogo,
          })
        }
        this.listAvatar = [];
        if(res.data.UrlAvatar.length > 0) {
          this.listAvatar.push({
            uid: res.data.UrlAvatar.split('/').pop(),
            name: res.data.UrlAvatar.split('/').pop(),
            url: res.data.UrlAvatar,
          })
        }
        this.listProCode = [];
        if(res.data.UrlProCode.length > 0) {
          this.listProCode.push({
            uid: res.data.UrlProCode.split('/').pop(),
            name: res.data.UrlProCode.split('/').pop(),
            url: res.data.UrlProCode,
          })
        }
        this.listScreenshot = [];
        res.data.UrlScreenshot.split('*').forEach( file => {
          if ( file.length > 1) {
            this.listScreenshot.push({
              uid: file.split('/').pop(),
              name: file.split('/').pop(),
              url: file,
            })
          }
        })
        this.setChangeStatus();
      })
    },
    // 删除前的确认
    gotoDelete() {
      var self = this;
      self.$confirm({
        title: '删除',content: '您确认要删除本产品吗？',okText: '确认',cancelText: '取消',
        onOk() {
          self.delete(self.changeId)
        },
        onCancel() {},
      });
    },
    //上传前钩子，设置filename，获取token
    beforeUpload (file) {
      var filename = `product-${new Date().getTime()}.${file.name.split('.').pop()}`;
      return getUploadToken(filename).then( res => {
        this.tokenInfo.token = res.data;
        this.tokenInfo.key = filename;
      }, err => {
      });
    },
    // 添加状态
    setAddStatus() {
      this.form.resetFields();
      this.listPartnerLogo = this.listAvatar = this.listProCode = this.listScreenshot = [];
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
          this.$message.success(`产品已成功删除`);
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
        this.$message.success(`产品“${values.productName}”已成功${handleType}`);
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
    previewPartnerLogo (file) {
      this.previewImageUrl = file.url || file.thumbUrl
      this.visiblePartnerLogo = true
    },
    previewAvatar (file) {
      this.previewImageUrl = file.url || file.thumbUrl
      this.visibleAvatar = true
    },
    previewProCode (file) {
      this.previewImageUrl = file.url || file.thumbUrl
      this.visibleProCode = true
    },
    previewScreenshot (file) {
      this.previewImageUrl = file.url || file.thumbUrl
      this.visibleScreenshot = true
    },
    cancelAvatar () {
      this.visibleAvatar = false
    },
    cancelPartnerLogo () {
      this.visiblePartnerLogo = false
    },
    cancelProCode () {
      this.visibleProCode = false
    },
    cancelScreenShot () {
      this.visibleScreenshot = false
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
    uploadPartnerLogo ( info ) {
      this.baseUpload(info);
      this.listPartnerLogo = info.fileList;
    },
    uploadAvatar ( info ) {
      this.baseUpload(info);
      this.listAvatar = info.fileList;
    },
    uploadProCode ( info ) {
      this.baseUpload(info);
      this.listProCode = info.fileList;
    },
    uploadScreenShot ( info ) {
      this.baseUpload(info);
      this.listScreenshot = info.fileList;
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
   height:60px
}
</style>