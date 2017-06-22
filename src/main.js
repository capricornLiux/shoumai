// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import Layout from './components/layout.vue'

// 导入vue-router
import VueRouter from 'vue-router'

// 导入vue-resource
import VueResource from 'vue-resource'

import IndexPage from './pages/index.vue'

import Detail from './pages/detail.vue'

import AdPublic from './pages/detail/adPublic.vue'
import DataStatistics from './pages/detail/dataStatistics.vue'
import DataForecast from './pages/detail/dataForecast.vue'
import FlowAnalysis from './pages/detail/flowAnalysis.vue'

// 使用订单页面
import OrderList from './pages/orderList.vue'


Vue.config.productionTip = false

// use vue-router 进行注册
Vue.use(VueRouter);

// vue-resource进行注册
Vue.use(VueResource);

// 实例化vue-router
let router = new VueRouter({

  // 使用html5模式的路由, 没有#
  mode: 'history',

  // 配置map
  routes : [

    // 首页
    {
      path : '/',
      component : IndexPage

    },

    // 点击商品的详情页面
    {
      path : '/detail',
      component : Detail,

      // 设置默认跳转的子路由
      redirect : '/detail/dataStatistics',

      // 配置右侧子路由
      children : [

        // 配置path的时候不能够添加'/', 如果添加了的话, 会从根路由地址进行加载
        // 数据统计
        {
          path : 'dataStatistics',
          component : DataStatistics
        },

        // 数据预测
        {
          path : 'dataForecast',
          component : DataForecast
        },

        // 流量分析
        {
          path : 'flowAnalysis',
          component : FlowAnalysis
        },
        // 广告发布
        {
          path : 'adPublic',
          component : AdPublic
        }
      ]
    },

    // 商品订单页面
    {
      path : '/order',
      component : OrderList
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
