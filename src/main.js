// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 代码编辑器
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

// 动态表单 , { maker }
import formCreate from '@form-create/element-ui'

Vue.use(ElementUI)
Vue.use(codemirror)
Vue.use(formCreate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
