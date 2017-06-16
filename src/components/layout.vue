<template>
  <div>

    <!--导航区域-->
    <div class="app-header">
      <div class="app-head-inner">
        <img src="../assets/logo.png" alt="">
        <div class="head-nav">
          <ul class="nav-list">
            <li>登录</li>
            <li class="nav-pile">|</li>
            <li>注册</li>
            <li class="nav-pile">|</li>
            <li>关于</li>
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
    </div>
    <!--底部结束-->
  </div>
</template>

<script>
  export default{
    data(){
      return {}
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
  .app-header{
    background-color: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }

  .app-head-inner{
    width: 1200px;
    height: 100%;
    /*background-color: lightskyblue;*/
    margin: 0 auto;
  }

  .app-head-inner img{
    width: 50px;
    /*height: 100%;*/
    margin-top: 20px;
  }

  .head-nav{
    float: right;
    width: 200px;
    height: 100%;
  }

  .head-nav .nav-list{
    width: 100%;
    height: 100%;
  }

  .head-nav .nav-list li{
    float: left;
    cursor: pointer;
  }

  .head-nav .nav-list li.nav-pile {
    margin-right: 10px;
    margin-left: 10px;
  }


  .app-footer{
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: #e3e4e8;
    margin-top: 30px;
  }




</style>

