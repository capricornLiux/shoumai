<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text"
                 v-model="usernameModel" placeholder="请输入用户名">
        </div>
        <!--<span class="g-form-error">{{ userErrors.errorText }}</span>-->
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password"
                 v-model="passwordModel" placeholder="请输入密码">
        </div>
        <!--<span class="g-form-error">{{ passwordErrors.errorText }}</span>-->
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" v-on:click="onLogin">登录</a>
        </div>
      </div>
      <!--<p>{{ errorText }}</p>-->
    </div>

    <!--<p>login login</p>-->
  </div>
</template>

<script>
  export default{
    data(){
      return {
        usernameModel: 'hello world',
        passwordModel: 'pwd'
      }
    },

    methods: {
      onLogin(){
        console.log(this.usernameModel);
        console.log(this.passwordModel);
      }
    }
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
  }

  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>
