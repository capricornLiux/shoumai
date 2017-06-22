<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>流量分析</h2>
      <p>
        是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          购买数量：
        </div>
        <div class="sales-board-line-right">

          <!--使用自定义组件counter-->
          <v-counter v-on:on-change="onParaChange('buyNum', $event)"></v-counter>

        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品类型：
        </div>

        <!--使用selection组件-->
        <div class="sales-board-line-right">
          <!--<v-selection v-bind:selections="goodsType" v-on:selectDropItem="receivedSelectDropItem"></v-selection>-->

          <!--四个事件使用同一一个事件处理函数进行处理-->
          <v-selection v-bind:selections="goodsType" v-on:on-change="onParaChange('buyType', $event)"></v-selection>
        </div>


      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          有效时间：
        </div>
        <div class="sales-board-line-right">

          <!--使用自定义组件chooser-->
          <!--<v-chooser v-bind:selections="periodList" v-on:seleteItem="receivedSelectChooser"></v-chooser>-->


          <!--使用同一个事件处理函数进行处理-->
          <v-chooser v-bind:selections="periodList" v-on:on-change="onParaChange('period', $event)"></v-chooser>

        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          产品版本：
        </div>
        <div class="sales-board-line-right">

          <!--利用自定义组件multi chooser-->
          <!--<v-multi-chooser v-bind:selections="versionList"-->
          <!--v-on:seletedItemArray="receivedSelectMultiChooser"></v-multi-chooser>-->

          <!--使用同一个事件处理函数进行处理-->
          <v-multi-chooser v-bind:selections="versionList"
                           v-on:on-change="onParaChange('versions', $event)"></v-multi-chooser>

        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">
          总价：
        </div>
        <div class="sales-board-line-right">
          {{ totalPrice }} 元
        </div>
      </div>
      <div class="sales-board-line">
        <div class="sales-board-line-left">&nbsp;</div>
        <div class="sales-board-line-right">
          <div class="button" v-on:click="clickBuyNow">
            立即购买
          </div>
        </div>
      </div>
    </div>
    <div class="sales-board-des">
      <h2>产品说明</h2>
      <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

      <h3>用户行为指标</h3>
      <ul>
        <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
        <li>用户在网站的停留时间；</li>
        <li>用户来源网站（也叫“引导网站”）；</li>
        <li>用户所使用的搜索引擎及其关键词；</li>
        <li>在不同时段的用户访问量情况等。</li>
      </ul>

      <h3>浏览网站方式</h3>
      <ul>
        <li>用户上网设备类型</li>
        <li>用户浏览器的名称和版本</li>
        <li>访问者电脑分辨率显示模式</li>
        <li>用户所使用的操作系统名称和版本</li>
        <li>用户所在地理区域分布状况等</li>
      </ul>
    </div>

    <!--使用自定义的对话框组件-->
    <my-dialog v-bind:is-show="isShowDialog" v-on:closeDialog="closeDialog">
      <!--购买信息表-->
      <table class="buy-dialog-table">

        <!--表头-->
        <tr>
          <th>购买数量</th>
          <th>产品类型</th>
          <th>有效时间</th>
          <th>产品版本</th>
          <th>总价</th>
        </tr>
        <!--表头结束-->

        <!--表格内容-->
        <tr>
          <td>{{ buyNum }}</td>
          <td>{{ buyType.label }}</td>
          <td>{{ period.label }}</td>
          <!--<td>{{ versions }}</td>-->
          <td>
            <span v-for="item in versions">{{ item.label + ' ' }}</span>
          </td>
          <td>{{ totalPrice }}</td>
        </tr>
        <!--表格内容结束-->

      </table>

      <p>请选择银行</p>
      <!--使用自定义组件 银行选择组件-->
      <bank-chooser v-on:bank-change="receivedBankChange"></bank-chooser>
      <!--使用自定义组件 银行选择组件结束-->


      <!--确认购买按钮-->
      <div class="button buy-dialog-btn" v-on:click="confirmBuy">
        确认购买
      </div>
      <!--确认购买按钮结束-->

    </my-dialog>
    <!--使用自定义的对话框组件结束-->


    <!--使用自定义组件的检查支付状态-->
    <check-order v-bind:isShowCheckDialog="isShowCheckDialog" v-bind:order-id="orderId" v-on:close-payStatusChoose="closeCheckOrder"></check-order>
    <!--使用自定义组件的检查支付状态结束-->

  </div>
</template>

<script>
  import VSelection from '../../components/buy/selection.vue'
  import VChooser from '../../components/buy/chooser.vue'
  import VMultiChooser from '../../components/buy/multiChooser.vue'
  import VCounter from '../../components/buy/counter.vue'

  // 利用dialog组件, 弹出购买信息和选择银行对话框
  import MyDialog from '../../components/dialog.vue'

  // 利用银行组件, 放置银行选择内容在对话框组件中(组件之间的嵌套)
  import BankChooser from '../../components/bankChooser.vue'

  // 使用自定义组件
  import CheckOrder from '../../components/checkOrder.vue'

  import _ from 'lodash'

  export default {
    // 组件
    components: {
      VSelection,
      VChooser,
      VMultiChooser,
      VCounter,

      // 对话框组件
      MyDialog,

      // 银行选择组件
      BankChooser,

      // 检查状态组件
      CheckOrder
    },

    // 数据
    data(){
      return {
        // 产品类型
        goodsType: [
          {
            label: '入门版',
            value: 0
          },
          {
            label: '中级版',
            value: 1
          },

          {
            label: '高级版',
            value: 2
          }
        ],

        // 有效时间
        periodList: [
          {
            label: '半年',
            value: 0
          },
          {
            label: '一年',
            value: 1
          },
          {
            label: '三年',
            value: 2
          }
        ],

        // 产品版本
        versionList: [
          {
            label: '客户版',
            value: 0
          },
          {
            label: '代理商版',
            value: 1
          },
          {
            label: '专家版',
            value: 2
          }
        ],


        // 用户购买数据
        buyNum: 0,
        buyType: {},
        period: {},
        versions: [],

        // 购买总价
        totalPrice: 0,

        // 是否显示对话框属性
        isShowDialog: false
      }
    },

    methods: {

      // 统一的事件处理函数(四个切换事件)
      onParaChange(eventName, val){
//        console.log(eventName);
//        console.log(val);

        this[eventName] = val;

        // 调用计算价格方法
        this.getTotalPrice();
      },

      /**
       * 计算总价
       */
      getTotalPrice(){

        // 将版本对象数组装换为值数组
        let buyVersionsArray = _.map(this.versions, (item) => {
          return item.value;
        });

        // 构建网络请求参数
        let requestPara = {
          // 进行参数mock
          buyNumber: this.buyNum,
          buyType: this.buyType,
          period: this.period.value,
          versions: buyVersionsArray

        };


        // 使用vue-resource进行网络请求
        this.$http.post('/api/getPrice', requestPara).then(function (response) {
          console.log('请求总价成功');
//          console.log(response);
          console.log(response.data.amount);
          this.totalPrice = response.data.amount;
//          this.totalPrice = response.data;
        }, function (error) {
          console.log('请求总价失败');
          console.log(error);
        });
      },

      // 点击立即购买按钮的时候调用
      clickBuyNow(){
        // 将对话框的显示属性设置为true
        console.log('test');
        this.isShowDialog = true;
      },

      // 点击关闭按钮的时候调用
      closeDialog(){
//          console.log('close');
        this.isShowDialog = false;
      },

      // 当父组件收到子组件更换银行的时候进行调用
      receivedBankChange(data){
        console.log('received bank changed');
        console.log(data);
        this.bankId = data.id;
      },

      // 点击确认购买按钮的时候调用
      confirmBuy(){
          console.log('点击了确认购买按钮');

        // 将版本对象数组装换为值数组
        let buyVersionsArray = _.map(this.versions, (item) => {
          return item.value;
        });

        // 构建网络请求参数
        let requestPara = {
          // 进行参数mock
          buyNumber: this.buyNum,
          buyType: this.buyType.value,
          period: this.period.value,
          versions: buyVersionsArray,
          bankId : this.bankId
        };

        // 发送网络请求
        this.$http.post('/api/createOrder', requestPara).then((response)=>{
            // 请求成功
          // 保存订单号码
          this.orderId = response.data.orderId;
          // 关闭对话框
          this.isShowDialog = false;

          // 显示选择支付状态对话框
          this.isShowCheckDialog = true;

          // 打开确认对话框
        }, (error)=>{
          // this.
          console.log(error);

        })
      },

      // 收到子组件emit的事件的时候调用
      closeCheckOrder(){

          console.log('关闭对话框了');
          // 关闭对话框
        this.isShowCheckDialog = false;
      }

    },

    // 使用Vue的声明周期方法

    /**
     * 当Vue实例挂在到DOM的时候进行调用
     */
    mounted(){
      // 为购买信息赋值
      this.buyNum = 1;
      this.buyType = this.goodsType[0];
      this.period = this.periodList[0];
      this.versions = [this.versionList[0]];
      this.getTotalPrice();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buy-dialog-title {
    font-size: 16px;
    font-weight: bold;
  }

  .buy-dialog-btn {
    margin-top: 20px;
  }

  .buy-dialog-table {
    width: 100%;
    margin-bottom: 20px;
  }

  .buy-dialog-table td,
  .buy-dialog-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 5px 0;
  }

  .buy-dialog-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
  }
</style>
