<template>
  <div class="index-wrap">

    <!--左侧-->
    <div class="index-left">

      <!--左侧上部全部产品-->
      <div class="index-left-block">
        <h2>全部产品</h2>

        <!--模板进行多次使用-->
        <template v-for="product in productList">
          <h3>{{ product.title }}</h3>
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{ item.name }}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div v-if="!product.last" class="hr"></div>
        </template>
      </div>
      <!--左侧上部全部产品结束-->


      <!--左侧下部最新消息-->
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList">
            <a :href="item.url" class="new-item">{{ item.title }}</a>
          </li>
        </ul>
      </div>
      <!--左侧下部最新消息结束-->

    </div>


    <!--首页右侧内容-->
    <div class="index-right">

      <!--轮播图-->
      <!--使用自定义的组件进行轮播图的展示-->
      <slide-show v-bind:slides="slides" v-bind:slideTime="2000" v-on:sonEmitEvent="listenSon"></slide-show>
      <!--轮播图结束-->


      <!--右侧下部宣传部分-->
      <div class="index-board-list">
        <div
          class="index-board-item"
          v-for="(item, index) in boardList"
          :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.imgId]">
          <div class="index-board-item-inner">
            <h2>{{ item.title }}</h2>
            <p>{{ item.desc }}</p>
            <div class="index-board-button">
              <!--<router-link class="button" :to="{path: 'detail/' + item.toKey}">立即购买</router-link>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  // 导入幻灯片组件
  import slideShow from '../components/slideShow.vue'

  export default{

    // 注册组件
    components: {
      slideShow,

    },

    // 使用声明周期钩子方法
    created: function () {
      // 当组件创建完毕的时候调用
      this.$http.get('/api/getNewsList').then(function successCallBack(response) {
        console.log(response);
      }, function errorCallBack(error) {
        console.log(error);
      });
    },

    data(){
      return {

        // 产品列表(全部产品)
        productList: {
          pc: {
            title: 'PC产品',
            list: [
              {
                name: '数据统计',
                url: 'http://starcraft.com'
              },
              {
                name: '数据预测',
                url: 'http://warcraft.com'
              },
              {
                name: '流量分析',
                url: 'http://overwatch.com',
                hot: true
              },
              {
                name: '广告发布',
                url: 'http://hearstone.com'
              }
            ]
          },

          app: {
            title: '手机应用类',
            last: true,
            list: [
              {
                name: '91助手',
                url: 'http://weixin.com'
              },
              {
                name: '产品助手',
                url: 'http://twitter.com',
                hot: true
              },
              {
                name: '智能地图',
                url: 'http://maps.com'
              },
              {
                name: '团队语音',
                url: 'http://phone.com'
              }
            ]
          }
        },

        // 新闻列表数据
        newsList: [
          {
            title: '今天天气好热',
            url: 'http://www.sohot.com'

          },
          {
            title: '今天天气好热',
            url: 'http://www.sohot.com'

          },
          {
            title: '今天天气好热',
            url: 'http://www.sohot.com'

          },
          {
            title: '今天天气好热',
            url: 'http://www.sohot.com'

          }
        ],

        // 右侧下部广告栏数据
        boardList: [
          {
            title: '开放产品',
            desc: '开放产品是一款新型产品',
            imgId: 'car',

          },

          {
            title: '品牌营销',
            desc: '品牌营销帮助你的产品更好地找到定位',
            imgId: 'earth',

          },

          {
            title: '使命必达',
            desc: '使命必达快速迭代永远保持最前端的速度',
            imgId: 'loud',

          },

          {
            title: '勇攀高峰',
            desc: '帮你勇闯高峰，到达事业的顶峰',
            imgId: 'mountain',

          },
        ],

        // 幻灯片数据
        slides: [
          {
            // require通过webpack解析到响应的位置, 打包以后, 这里的位置会更换为对应的图片地址, 如果不适用require, 找不到, webpack不知道图片作为模块放到文档中
            // 什么时候需要用到require引用图片呢?
            // 1. 图片通过js引入到文档中, 放到script部分
            // 2. 模板中的scr不需要
            // 3. css中也不需要

            src: require('../assets/slideShow/pic1.jpg'),
            title: '幻灯片1',
            href: 'detail/analysis'
          },
          {
            src: require('../assets/slideShow/pic2.jpg'),
            title: '幻灯片2',
            href: 'detail/count'
          },
          {
            src: require('../assets/slideShow/pic3.jpg'),
            title: '幻灯片3',
            href: 'http://xxx.xxx.com'
          },
          {
            src: require('../assets/slideShow/pic4.jpg'),
            title: '幻灯片4',
            href: 'detail/forecast'
          }
        ]
      }
    },

    methods: {
      listenSon: function () {
        console.log('父组件监听到了子组件的数据');
      }
    }
  }
</script>

<style scoped>
  .index-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
  }

  .index-left {
    float: left;
    width: 300px;
    text-align: left;
  }

  .index-right {
    float: left;
    width: 900px;
  }

  .index-left-block {
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
  }

  .index-left-block .hr {
    margin-bottom: 20px;
  }

  .index-left-block h2 {
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
  }

  .index-left-block h3 {
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
  }

  .index-left-block ul {
    padding: 10px 15px;
  }

  .index-left-block li {
    padding: 5px;
  }

  .index-board-list {
    overflow: hidden;
  }

  .index-board-item {
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .index-board-item-inner {
    min-height: 125px;
    padding-left: 120px;
  }

  .index-board-car .index-board-item-inner {
    background: url(../assets/images/1.png) no-repeat;
  }

  .index-board-loud .index-board-item-inner {
    background: url(../assets/images/2.png) no-repeat;
  }

  .index-board-earth .index-board-item-inner {
    background: url(../assets/images/3.png) no-repeat;
  }

  .index-board-mountain .index-board-item-inner {
    background: url(../assets/images/4.png) no-repeat;
  }

  .index-board-item h2 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    margin-bottom: 15px;
  }

  .line-last {
    margin-right: 0;
  }

  .index-board-button {
    margin-top: 20px;
  }

  .lastest-news {
    min-height: 512px;
  }

  .hot-tag {
    background: red;
    color: #fff;
  }

  .new-item {
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
