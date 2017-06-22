<template>
  <div>
    <!--检查支付状态-->
    <my-dialog v-bind:is-show="isShowCheckDialog">
      请检查您的支付状态
      <div class="button" v-on:click="clickPaySuccess">支付成功</div>
      <div class="button" v-on:click="clickPayFail">支付失败</div>
    </my-dialog>
    <!--检查支付状态结束-->

    <!--支付成功-->
    <my-dialog v-bind:is-show="isShowSuccessDialog">
      购买成功
    </my-dialog>
    <!--支付成功结束-->

    <!--支付失败-->
    <my-dialog v-bind:is-show="isShowFailDialog">
      购买失败
    </my-dialog>
    <!--支付失败结束-->
  </div>
</template>

<script>

  // 使用对话框组件
  import MyDialog from './dialog.vue'

  export default {
    components: {
      MyDialog
    },

    props: {
      // 父组件flowAnalysis传递的是否显示检查支付状态对话框
      isShowCheckDialog: {
        type: Boolean,
        default: false
      },

      // 父组件将获取的订单id传递给checkorder, 因为checkorder点击的时候需要和后台校验使用
      orderId : {
          // 数据类型有可能是字符串或者数字类型, 所以可以使用数组用来表示数据类型
          type : [String, Number]
      }
    },

    data(){
      return {
        // 是否显示成功对话框
        isShowSuccessDialog: false,

        // 是否显示失败对话框
        isShowFailDialog: false
      }
    },

    methods: {
      // 点击了支付成功按钮
      clickPaySuccess(){
        // 隐藏支付选择对话框, 显示成功对话框
        // 不能直接修改父组件传递的数据, 所以要告诉父组件来关闭支付状态选择对话框
//        this.$emit('clickPaySuccess');

        // 显示支付成功对话框
//        this.isShowSuccessDialog = true;

        this.checkStatus();
      },

      // 点击了支付失败按钮
      clickPayFail(){
        this.checkStatus();
      },

      // 统一处理点击支付成功/失败按钮的事件
      checkStatus(){
          // 发送网络请求, 校验orderID
        this.$http.post('/api/checkOrder').then((response)=>{
            // 判断校验码
          if(response.data.status === 1){
              // 成功
            // 显示成功dialog

//            console.log('hello');

            this.isShowSuccessDialog = true;
            // 向父组件传递数据, 让其关闭点击对话框
            this.$emit('close-payStatusChoose');

          } else {
              // 失败
            this.isShowFailDialog = true;

            this.$emit('close-payStatusChoose');
          }
        }, (error)=>{
          console.log(error);
          console.log('checkOrder请求失败');
        });
      }
    }
  }
</script>
