<template>
  <div class="login-form">
    <div class="g-form">

      <!--用户名-->
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text"
                 v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <span class="g-form-error">{{ userErrors.errorText }}</span>
      </div>
      <!--用户名结束-->


      <!--密码-->
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password"
                 v-model="passwordModel" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{ passwordErrors.errorText }}</span>
      </div>
      <!--密码结束-->

      <!--登录按钮-->
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" v-on:click="onLogin">登录</a>
        </div>
      </div>
      <!--登录按钮结束-->

      <!--<p>{{ errorText }}</p>-->
    </div>

    <!--<p>login login</p>-->
  </div>
</template>

<script>
  export default{
    data(){
      return {
        usernameModel: '',
        passwordModel: ''
      }
    },

    methods: {
      /**
       * 点击登录的时候调用的方法
       */
      onLogin(){
        console.log(this.usernameModel);
        console.log(this.passwordModel);
      },
    },

    // 计算型属性, 属性的值动态地计算
    computed: {
      userErrors(){

        // 定义计算型属性的返回值, 两个变量, 提示错误信息和错误状态
        let status, errorText;

        // 使用正则表达式对象的test()方法对输入的内容进行校验
        if (/@/g.test(this.usernameModel)) {
          // 匹配通过
          status = true;
          errorText = ''
        } else {
          // 匹配不通过
          status = false;
          errorText = '用户名中必须包含@'
        }

        return {
          status,
          errorText
        }
      },

      passwordErrors(){
        let status, errorText;
        if (/^.{6,8}$/.test(this.passwordModel)) {
          // 匹配通过
          status = true;
          errorText = ''
        } else {
          // 匹配不通过
          status = false;
          errorText = '密码必须为6-8位';
        }
        return {
          status,
          errorText
        }
      }
    },


  }
</script>

<style scoped>
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
    /*background-color: skyblue;*/
  }

  .g-form-btn a {

    display: inline-block;
    width: 80px;
    height: 20px;
    background-color: skyblue;

  }

  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>
