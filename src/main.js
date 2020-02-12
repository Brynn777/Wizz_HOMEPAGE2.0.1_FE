// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import { Button, Card, DatePicker, Drawer, 
  Form, Input, InputNumber, Layout, Menu, 
  Pagination, Radio, Row,Select,TimePicker,
  Timeline,message,Icon,Avatar,Col,Dropdown,List,Table,Cascader,Modal,Upload} from 'ant-design-vue'
import App from './App'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Cascader)
Vue.use(Card)
Vue.use(DatePicker)
Vue.use(Drawer)
Vue.use(Form)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Select)
Vue.use(TimePicker)
Vue.use(Timeline)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(Avatar)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Table)

Vue.prototype.$message = message
Vue.prototype.$moment = moment;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
