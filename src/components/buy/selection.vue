<template>
  <div class="selection-component">

    <!--选择框-->
    <div class="selection-show" v-on:click="toggleDropStatus">
      <span>{{ selections[nowIndex].label }}</span>
      <div class="arrow"></div>
    </div>
    <!--选择框结束-->


    <!--下拉列表-->
    <div class="selection-list" v-if="isDrop">
      <ul>
        <li v-for="(item, index) in selections" v-on:click="selectItem(index)">{{ item.label }}</li>
      </ul>
    </div>
    <!--下拉列表结束-->

  </div>
</template>

<script>
  export default {
    // 接收父组件传递的数据
    props: {

      // 下拉列表中的数据
      selections: {
        type: Array,
        default: [{
          label: 'test',
          value: 0
        }]
      }
    },
    data () {
      return {

        // 下拉状态
        isDrop: false,

        // 当前显示的索引
        nowIndex: 0
      }
    },
    methods: {
      // 切换下拉状态
      toggleDropStatus(){
        this.isDrop = !this.isDrop;
      },

      /**
       * 从下拉列表中选择了一项内容时调用
       * @param index 选择的索引
       */
      selectItem(index){
          // 切换框中显示的索引
        this.nowIndex = index;

        // 向父组件传递选择的数据, 为计算总价做准备
//        this.$emit('selectDropItem', index);
        this.$emit('on-change', this.selections[this.nowIndex]);

        // 收起下拉列表
        this.isDrop = false;
      }
    }
  }
</script>

<style scoped>
  .selection-component {
    position: relative;
    display: inline-block;
    width: 100px;
  }

  .selection-show {
    /*width: 100%;*/
    width: 100px;
    border: 1px solid #e3e3e3;
    padding: 0 20px 0 10px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
    border-radius: 3px;
    background: #fff;
    box-sizing: border-box;
  }

  .selection-show .arrow {
    position: absolute;
    left: 80px;
    top: 11px;
    display: inline-block;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #e3e3e3;
    width: 0;
    height: 0;
    margin-top: -1px;
    margin-left: 6px;
    margin-right: -14px;
    vertical-align: middle;
  }

  .selection-list {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 25px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    z-index: 5;
  }

  .selection-list li {
    padding: 5px 15px 5px 10px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    cursor: pointer;
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    text-align: center;
  }

  .selection-list li:hover {
    background: #e3e3e3;
  }
</style>
