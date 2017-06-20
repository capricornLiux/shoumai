<template>
  <div class="multi-chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in selections" v-on:click="selectItem(index)"
          v-bind:class="{active : checkIsActive(index)}">{{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>

  // 导入lodash框架
  import _ from 'lodash';

  export default {

    // 接收父组件传递的数据
    props: {
      selections: {
        type: Array,
        default: [{
          label: 'test',
          value: 0
        }]
      }
    },

    data(){
      return {
        // 选中的项目数组, 默认选中第一个
        nowIndexs: [0]
      }
    },

    methods: {
      // 选中的时候调用的方法
      selectItem(index){
        // 点击的时候进行判断, 如果当前数组中没有, 说明当前该选项没有选中, 加入数组中
        if (this.nowIndexs.indexOf(index) === -1) {
          // 数组中没有, 将选中的选项添加到数组中
          this.nowIndexs.push(index);
        } else {

          // 当前选中的内容中有了, 那么就利用lodash框架进行移除
          // 导入lodash框架

//          this.nowIndexs = _.remove(this.nowIndexs, function (n) {
//            return n !== index;
//          })

          // 利用es6的箭头函数写法
          this.nowIndexs = _.remove(this.nowIndexs, (n) => {
            return n !== index;
          });
        }

        // 利用lodash的map方法, 将选中的key对应的值组成一个数组, 返回
        let selectValueArray = _.map(this.nowIndexs, (n) => {
          return this.selections[n];
        });

        // 子组件向父组件传递数据
        this.$emit('seletedItemArray', selectValueArray);
      },

      /**
       * 选中选项的时候判断是否应该高亮显示对应的active类
       * @param index
       */
      checkIsActive(index){
        return !(this.nowIndexs.indexOf(index) === -1);
      }
    }
  }
</script>

<style scoped>
  .chooser-component {
    position: relative;
    display: inline-block;
  }

  .chooser-list li {
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }

  .chooser-list li.active {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
