<template>
  <div>

    <!--导航区域-->
    <div class="app-header">
      <div class="app-head-inner">

        <!--点击导航栏的左侧图片跳转到首页-->
        <router-link v-bind:to="{path : '/'}">
          <img src="../assets/logo.png" alt="">
        </router-link>

        <div class="head-nav">
          <ul class="nav-list">
            <li v-if="userInfo.hasOwnProperty('username')">欢迎您~ {{userInfo.username }}</li>
            <li class="nav-pile" v-if="userInfo.hasOwnProperty('username')">|</li>
            <li v-if="userInfo.hasOwnProperty('username')" v-on:click="logout">退出</li>
            <li v-on:click="clickLogin" v-if="!userInfo.hasOwnProperty('username')">登录</li>
            <li class="nav-pile" v-if="!userInfo.hasOwnProperty('username')">|</li>
            <li v-on:click="clickRegister" v-if="!userInfo.hasOwnProperty('username')">注册</li>
            <li class="nav-pile" v-if="userInfo">|</li>
            <li v-on:click="clickAbout">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <!--导航区域结束-->

    <!--内容区域-->
    <div class="app-content">
      <!--设置路由占用位置-->

      <!--设置单页面切换的缓存-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </div>
    <!--内容区域结束-->

    <!--底部-->
    <div class="app-footer">
      <p>&copy; 2017 Lance MIT</p>

      <!--测试dialog-->
      <!--<Dialog></Dialog>-->
      <!--使用的时候不能使用html保留元素-->
      <!--注意大小写转换, html中不区分大小写, 统一改为小写-->

      <!--关于-->
      <my-dialog v-bind:is-show="isShowAboutDialog" v-on:closeDialog="receivedSonClose('isShowAboutDialog')">
        <p>about</p>
      </my-dialog>

      <!--登录-->
      <my-dialog v-bind:is-show="isShowLoginDialog" v-on:closeDialog="receivedSonClose('isShowLoginDialog')">
        <!--<p>login</p>-->
        <login-form v-on:loginSuccess="receiveLoginSuccess"></login-form>
      </my-dialog>

      <!--注册-->
      <my-dialog v-bind:is-show="isShowRegisterDialog" v-on:closeDialog="receivedSonClose('isShowRegisterDialog')">
        <!--<p>register</p>-->
        <register-form></register-form>
      </my-dialog>

    </div>
    <!--底部结束-->
  </div>
</template>

<script>

  // 导入对话框组件
  import Dialog from './dialog.vue'


  // 导入三个对话框组件
  import LoginForm from './loginForm.vue'
  import RegisterForm from './registerForm.vue'

  export default{
    data(){
      return {
        // 是否显示对话框
//        isShowDialog: false

        isShowAboutDialog: false,
        isShowLoginDialog: false,
        isShowRegisterDialog: false,
        userInfo : {}
      }
    },

    components: {
      MyDialog: Dialog,

      // 对话框组件中的内容
      LoginForm,
      RegisterForm

    },

    methods: {

      clickLogin(){
        this.isShowLoginDialog = true;
        console.log('点击了登录按钮');
      },

      clickRegister(){
        this.isShowRegisterDialog = true;
        console.log('点击了注册按钮');
      },

      // 点击关于的时候调用
      clickAbout(){
        // 更改对话框显示属性
        this.isShowAboutDialog = true;
        console.log('点击了关于按钮');
      },

      // 点击关闭按钮的时候进行调用, 收到子组件传递的数据
      receivedSonClose(attr){
//        console.log(attr);
//        console.log('received');
        this[attr] = false;
      },

      // 当登录成功的时候收到的方法进行调用
      receiveLoginSuccess(userData){
        console.log(userData);
//        console.log('test');

        // 手动点击关闭按钮的方法执行
        this.receivedSonClose('isShowLoginDialog');

        // 保存用户信息
        this.userInfo = userData;

      },

      // 当用户点击退出按钮的时候进行调用
      logout(){
          this.userInfo = {};
      }
    }
  }
</script>

<style>
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /*自己的样式*/
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    font-size: 14px;
    color: #444;
  }

  /*头部*/
  .app-header {
    background-color: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }

  .app-head-inner {
    width: 1200px;
    height: 100%;
    /*background-color: lightskyblue;*/
    margin: 0 auto;
  }

  .app-head-inner img {
    width: 50px;
    /*height: 100%;*/
    margin-top: 20px;
  }

  .head-nav {
    float: right;
    width: 200px;
    height: 100%;
  }

  .head-nav .nav-list {
    width: 100%;
    height: 100%;
  }

  .head-nav .nav-list li {
    float: left;
    cursor: pointer;
  }

  .head-nav .nav-list li.nav-pile {
    margin-right: 10px;
    margin-left: 10px;
  }

  .app-footer {
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: #e3e4e8;
    margin-top: 30px;
  }


  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }
  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #4fc08d;
  }
  .g-form {

  }
  .g-form-line {
    padding: 15px 0;
  }
  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }
  .g-form-input {
    display: inline-block;
  }
  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    vertical-align: middle;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .g-form-btn {
    padding-left: 100px;
  }
  .g-form-error {
    color: red;
    padding-left: 15px;
  }

</style>

