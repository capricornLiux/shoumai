<template>

  <div class="counter-component">
    <div class="counter-btn" v-on:click="subtract">-</div>
    <div class="counter-show">
      <input type="text" v-model="number" v-on:keyup="fixInput">
    </div>
    <div class="counter-btn" v-on:click="add">+</div>
  </div>

</template>

<script>
  export default {
    // 父组件传递的数据
    props: {
      // 最小值
      min: {
        type: Number,
        default: 1
      },

      // 最大值
      max: {
        type: Number,
        default: 5
      }
    },

    data (){
      return {
        // 选择的数量, 默认为最小值1
        number: this.min
      }
    },

    methods: {
      /**
       * 点击减号的时候调用
       */
      subtract(){
        // 最小不能小过最小值
        if (this.number <= this.min) {
          return;
        }

        this.number--;
      },

      /**
       * 点击加号的时候调用
       */
      add (){
        // 最大不能超过最大值
        if (this.number >= this.max) {
          return;
        }
        this.number++;
      },

      fixInput(){
        // 声明变量, 报错输入的信息
        let input;
        // 判断是否输入了数字之外的其他字符
        if (typeof this.number === 'string') {
          // 输入了数字之外的其他字符
          // 利用正则表达式过滤其他字符串
          input = Number(this.number.replace(/\D/g, ''));
        } else {
          // 输入的是纯数字,
          input = this.number;
        }

        console.log(this.number);
        console.log(this.max);
        console.log(this.min);


        // 判断是否超出了范围
        if (this.number > this.max || this.number < this.min) {
          input = this.min;
        }

        this.number = input;
      }


    }
  }
</script>

<style scoped>
  .counter-component {
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
  }

  .counter-show {
    float: left;
  }

  .counter-show input {
    border: none;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    height: 23px;
    line-height: 23px;
    width: 30px;
    outline: none;
    text-indent: 4px;
  }

  .counter-btn {
    border: 1px solid #e3e3e3;
    float: left;
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    cursor: pointer;
  }

  .counter-btn:hover {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
