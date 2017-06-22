<template>
  <div class="order-wrap">
    <h3>您的产品</h3>

    <!--订单过滤选项-->
    <div class="order-list-choose">

      <div class="order-list-option">
        选择产品
        <!--使用自定义组件-->
        <v-selection :selections="products"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期
        <my-datepicker></my-datepicker>
      </div>

      <div class="order-list-option">
        结束日期
        <my-datepicker></my-datepicker>
      </div>

      <div class="order-list-option">
        关键词:
        <input type="text">
      </div>
    </div>
    <!--订单过滤选项结束-->

    <!--订单列表-->
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="(item,index) in tableHeads">{{ item.label }}</th>
        </tr>

        <tr v-for="item in tableData">
          <td v-for="item2 in tableHeads">{{ item[item2.key] }}</td>
        </tr>
      </table>
    </div>
    <!--订单列表结束-->

  </div>
</template>

<script>
  // 使用自定义组件selection
  import VSelection from '../components/buy/selection.vue'

  // 使用第三方 事件选择组件
  import myDatepicker from '../components/datepicker.vue'

  export default {
    components: {
      VSelection,
      myDatepicker
    },

    data(){
      return {
        // 选择产品
        products: [
          {
            label: '数据统计',
            value: 0
          },
          {
            label: '数据预测',
            value: 1
          },
          {
            label: '流量分析',
            value: 2
          },
          {
            label: '广告发布',
            value: 3
          }
        ],

        // 开始日期
        startDate: '',

        // 结束日期
        endDate: '',

        // 关键词
        primaryKey: '',

        // 表头信息
        tableHeads: [
          {
            label: '订单号',
            key: 'orderId'
          },
          {
            label: '购买产品',
            key: 'product'
          },
          {
            label: '版本类型',
            key: 'version'
          },
          {
            label: '有效时间',
            key: 'period'
          },
          {
            label: '购买日期',
            key: 'date'
          },
          {
            label: '数量',
            key: 'buyNum'
          },
          {
            label: '总价',
            key: 'amount'
          }
        ],

        // 获取到的列表数据
        tableData: [],

        // 选择的产品
        productId: 0
      }


    },

    // Vue的声明追方法, 当实例挂载到组件的时候调用
    mounted(){
      // 调用发送网络请求的方法
      this.getOrderList();
    },

    methods: {
      getOrderList(){

        // 创建请求参数对象
        let requestObject = {
          productId: this.productId,
          startDate: this.startDate,
          endDate: this.endDate,
          primaryKey: this.primaryKey
        };
        // 发送网络请求, 获取订单数据
        this.$http.post('/api/getOrderList', requestObject).then((response) => {
          // 保存列表数据
          this.tableData = response.data.list;

        }, (error) => {
          console.log(error);
          console.log('请求订单数据失败');
        });
      },


    }
  }
</script>

<style scoped>
  .order-wrap {
    width: 1200px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
  }

  .order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-indent: 10px;
  }

  .order-list-option {
    display: inline-block;
    padding-left: 15px;
  }

  .order-list-option:first-child {
    padding-left: 0;
  }

  .order-list-table {
    margin-top: 20px;
  }

  .order-list-table table {
    width: 100%;
    background: #fff;
  }

  .order-list-table td,
  .order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }

  .order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
  }

  .order-list-table th.active {
    background: #35495e;
  }
</style>
