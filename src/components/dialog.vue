<template>
  <div>
    <div class="dialog-wrap" v-show="isShow">

      <!--整个对话框的遮罩-->
      <div class="dialog-cover">

        <!--中间真正的对话框-->
        <div class="dialog-content">

          <!--关闭按钮-->
          <p class="dialog-close">&times;</p>
          <!--hello world-->
          <!--使用slot传递数据-->
          <!--在子组件中防止slot-->
          <slot>empty</slot>

        </div>
        <!--中间真正的对话框结束-->
      </div>
      <!--整个对话框的遮罩结束-->
    </div>
  </div>
</template>

<script>
  export default {
    // 接收父组件传递的属性
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .drop-enter-active {
    transition: all .5s ease;
  }

  .drop-leave-active {
    transition: all .3s ease;
  }

  .drop-enter {
    transform: translateY(-500px);
  }

  .drop-leave-active {
    transform: translateY(-500px);
  }

  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  .dialog-cover {
    background: rgba(0, 0, 0, 0.3);
    /*opacity: .3;*/
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .dialog-content {
    opacity: 1;
    width: 50%;
    position: fixed;
    max-height: 50%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    z-index: 999;
    border: 2px solid #464068;
    padding: 2%;
    line-height: 1.6;
  }

  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }

  .dialog-close:hover {
    color: #4fc08d;
  }
</style>
