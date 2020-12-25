import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
  
import * as Three from "three";
Vue.prototype.$THREE = Three;
import 'ant-design-vue/dist/antd.css'
// 导入全局组件
import "./utils/components";
// main.js
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);
Vue.prototype.$eventBus = new Vue();
Vue.use(Antd)
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import vueToTop from 'vue-totop'
//or require
Vue.use(vueToTop)

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /\.vue$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName) 
  // 获取组件的   命名
  const componentName = fileName.split('/').pop().replace(/\.vue$/, '')
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
    // 使用的时候直接用组件的文件名字就可以了
  )
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
