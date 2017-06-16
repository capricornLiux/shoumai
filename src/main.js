// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import Layout from './components/layout.vue'

// 导入vue-router
import VueRouter from 'vue-router'

import IndexPage from './pages/index.vue'

Vue.config.productionTip = false

// use vue-router 进行注册
Vue.use(VueRouter);

// 实例化vue-router
let router = new VueRouter({

  // 使用html5模式的路由, 没有#
  mode: 'history',

  // 配置map
  routes : [
    {
      path : '/',
      component : IndexPage

    }
  ]
});


/* eslint-disable no-new */
new Vue({
  // 根节点实例化对象中使用router
  router,
  el: '#app',
  template: '<Layout/>',
  components: { Layout }
})
