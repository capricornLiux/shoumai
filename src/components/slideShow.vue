<template>
  <div class="slide-show" v-on:mouseover="cancelInterval" v-on:mouseout="startInterval">

    <!--图片-->
    <div class="slide-img">
      <a v-bind:href="slides[nowIndex].href">
        <img v-bind:src="slides[nowIndex].src">
      </a>
    </div>

    <!--title-->
    <h2>{{ slides[nowIndex].title }}</h2>

    <!--页码-->
    <ul class="slide-pages">
      <!--<li v-on:click="gotoPre">&lt;</li>-->
      <li v-on:click="goto(pre)">&lt;</li>
      <li v-for="(item, index) in slides" v-on:click="goto(index)">
        <a v-bind:class="{on: index === nowIndex}">{{ index + 1 }}</a>
      </li>
      <!--<li v-on:click="gotoNext">&gt;</li>-->
      <li v-on:click="goto(next)">&gt;</li>
    </ul>

  </div>
</template>

<script>
  export default{
    // 子组件中获取父组件传递的数据, 需要使用props, 组件接收什么样的属性
    props: {
      slides: {
        // 设置接收数据的类型, 默认值等等
        type: Array, // 如果父组件传递的数据类型和指定的数据类型不匹配的话, 浏览器中会报错

        // 设置数据的默认值
        default: []

      },

      // 父组件传递的轮播时间
      slideTime: {
        type: Number,
        default: 1000
      }
    },

    data(){
      return {
        // 当前的轮播索引
        nowIndex: 0
      }
    },

    // 使用计算型属性进行翻页
    computed: {
      pre(){
        if (this.nowIndex === 0) {
          return this.slides.length - 1;
        }
        return this.nowIndex - 1;
      },

      next(){
        if (this.nowIndex === this.slides.length - 1) {
          return 0;
        }
        return this.nowIndex + 1;
      }
    },

    // 自定义方法
    methods: {

      // 跳转到第几页的幻灯片
      goto(index) {
        this.nowIndex = index;

      },

      // 开启定时器的方法
      startInterval(){

        // 开启定时器
        this.intervalId = setInterval(() => {
          // 调用goto方法, 传递计算型属性

//          console.log(this);

          // this指代当前组件

          this.goto(this.next);
        }, this.slideTime);
      },

      // 取消定时器
      cancelInterval(){
        clearInterval(this.intervalId);
      }

    },

    // 使用声明周期钩子方法
    mounted(){

      // 当组件挂在成功的时候就开启自动轮播
      this.startInterval();

    },


  }
</script>

<style scoped>
  .slide-trans-enter-active {
    transition: all .5s;
  }

  .slide-trans-enter {
    transform: translateX(900px);
  }

  .slide-trans-old-leave-active {
    transition: all .5s;
    transform: translateX(-900px);
  }

  .slide-show {
    position: relative;
    margin: 15px 15px 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }

  .slide-show h2 {
    position: absolute;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #000;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
  }

  .slide-img {
    width: 100%;
  }

  .slide-img img {
    width: 100%;
    position: absolute;
    top: 0;
  }

  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #fff;
  }

  .slide-pages li .on {
    text-decoration: underline;
    color: skyblue;
  }
</style>
