<template>
  <div class="order-detail-container">


    <van-tabs :active="active" @change="onChange">
      <van-tab title="订单详情">
        <div class="order-item-detail">
          <product-item :productItemInfo="productItemInfo"></product-item>
        </div>
        <div class="order-freeitem-detail">
          <van-cell-group>
          <van-cell title="数字蜡烛" value="1个" />
          <van-cell title="桃心蜡烛" value="1个" />
          <van-cell title="赠送餐具" value="5份" />
          </van-cell-group>

        </div>
        <div class="order-coupon-detail">
          <van-cell title="其他优惠" value="-￥5" />

        </div>
        <div class="order-total-info">
          <van-cell title="总计￥129" value="需付￥119" />
        </div>

        <div class="merchant-contact-info">
          <van-cell icon="phone-o" title="联系客服">
          </van-cell>
        </div>
        <div>
          配送信息
        </div>
        <div class="order-deliver-info">
          <van-cell-group>
            <van-cell title="期望时间" value="2019-08-05 10:00-11:00" />
            <van-cell title="配送地址" value="杨宇 13817409664 上海市浦东新区周浦镇年家浜东路129弄75号701" />
            <van-cell title="配送服务" value="由骑手：zhimu 为您配送" />
          </van-cell-group>
        </div>
        <div>
          订单信息
        </div>
        <div class="order-order-info">
          <van-cell-group>
            <van-cell title="订单号码" value="EX2019072619014718" />
            <van-cell title="订单时间" value="2019年7月26日 19:01:47" />
            <van-cell title="支付方式" value="微信支付" />
            <van-cell title="订单状态" value="已配送" />
          </van-cell-group>
        </div>


      </van-tab>
      <van-tab title="订单状态">
        <van-steps
          :steps="steps"
          :active="stepActive"
          direction="vertical"
          active-color="#f44"
        />
      </van-tab>

    </van-tabs>

  </div>
</template>

<script>

  import ProductItem from '@/components/ProductItem';

  export default {
    components: {
      ProductItem
    },

    data() {
      return {
        active:0,
        stepActive:1,

        productItemInfo: {
          url:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567423333127&di=89d0c9226b130766a75d8219eb801f4e&imgtype=0&src=http%3A%2F%2Fpic43.nipic.com%2F20140705%2F2531170_165127150000_2.jpg",
          name:"测试商品",
          attr:"杯",
          price:"13.00",
          count:"12"
        },

        steps: [
          {
            text: '订单已提交 2019-10-10 10:19:18',
            desc: '蛋糕制作中请耐心等待'
          },
          {
            text: '步骤二',
            desc: '描述信息'
          },
          {
            text: '步骤三',
            desc: '描述信息'
          },
          {
            text: '订单已配送',
            desc: '配送小哥(蜂鸟配送-13918237123)已出发,请确保电话畅通'
          }
        ]

      }
    },
    methods: {
      onChange(event) {
        console.log("event:", event)
      }

    }

  }
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">


</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
