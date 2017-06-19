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

      <!--点击登录按钮的时候进行的提示信息-->
      <p>{{ loginBtnErrorText }}</p>
      <!--点击登录按钮的时候进行的提示信息结束-->


    </div>

    <!--<p>login login</p>-->
  </div>
</template>

<script>
  export default{
    data(){
      return {
        // 双向绑定的数据, 用户输入的用户名和密码
        usernameModel: '',
        passwordModel: '',

        // 点击登录按钮的的提示信息
        loginBtnErrorText: ''
      }
    },

    methods: {
      /**
       * 点击登录的时候调用的方法
       */
      onLogin(){
//        console.log(this.usernameModel);
//        console.log(this.passwordModel);

        // 如果用户名或者密码中有任何一个不符合规则的时候需要进行错误 提示, 不能沟进行提交
        if(!this.userErrors.status || !this.passwordErrors.status){
            // 进行提示
          this.loginBtnErrorText = '用户名或者密码错误';
        } else {
            // 用户名和密码都符合规则了, 进行提交
          this.loginBtnErrorText = ''; // 清空错误提示信息
          this.$http.get('/api/login').then(function successCallBack(response) {


            // 登录成功, 将登录后的数据传递给父组件
            // 子组将向父组件传递数据, 需要使用emit方法机型数据传递
            this.$emit('loginSuccess', response.data);

          },function errorCallBack(error) {
            console.log('登录失败');
            console.log(error);
          })
        }
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

        // 第一次弹出对话框的时候不显示提示信息(因为还没有进行输入)
        if(!this.usernameFlag){
            // 没有提示信息
          errorText = '';

          // 更改状态
          this.usernameFlag = true;
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

        // 第一次弹出对话框的时候不进行错误提示
        if(!this.pwdFlag){
            errorText = '';
            this.pwdFlag = true;
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
    outline: none;
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

    cursor: pointer;

  }

  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>
