<template>
  <div class="myvip-privilege">
    <!--<div style="font-size: 18px; font-weight: bold; padding-bottom: 10px;">会员特权</div>-->

    <div class="privilege-items">
      <div class="privilege-item" @click="showPopup(0)">
        <img src="../asset/birth.png" class="privilege-icon">
        <div class="privilege-item-name">免邮卡</div>
        <div class="privilege-item-tip">每月两张</div>
      </div>
      <div class="privilege-item" @click="showPopup(1)">
        <img src="../asset/coupon.png" class="privilege-icon">
        <div class="privilege-item-name">五倍积分</div>
        <div class="privilege-item-tip">多买多返</div>
      </div>
      <div class="privilege-item" @click="showPopup(2)">
        <img src="../asset/point.png" class="privilege-icon">
        <div class="privilege-item-name">生日福利</div>
        <div class="privilege-item-tip">30元优惠券</div>
      </div>
      <div class="privilege-item" @click="showPopup(3)">
        <img src="../asset/coupon.png" class="privilege-icon">
        <div class="privilege-item-name">9折券</div>
        <div class="privilege-item-tip">共发五张</div>
      </div>
    </div>

    <van-popup :show="popShow">
      <div class="popshow-container">
        <div style="font-size: 18px; font-weight: bold">
          {{popContent.title}}
        </div>
        <div style="font-size: 14px;width: 180px">
          {{popContent.content}}
        </div>
        <div>
          <van-button type="primary"
                      @click="popupClose"
                      size="small">确定</van-button>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>


  const popContents = [
    {
      title:"免邮卡",
      content:"用户评价后购买的订单后，可获得5倍订单微信支付金额"
    },
    {
      title:"五倍积分",
      content:"用户评价后购买的订单后，可获得5倍订单微信支付金额"
    },
    {
      title:"生日福利",
      content:"用户评价后购买的订单后，可获得5倍订单微信支付金额"
    },
    {
      title:"优惠券",
      content:"用户评价后购买的订单后，可获得5倍订单微信支付金额"
    }
  ];


  export default {
    name: "",
    data() {
      return {
        balanceRecords: {
          total: 798
        },
        popShow: false,
        popContent: {

        }

      }
    },
    methods: {
      showPopup(id) {
        console.log("id",id);
        Object.assign(this.popContent, popContents[id]);
        this.popShow = true;
      },
      popupClose() {
        console.log("popupClose")
        this.popShow = false;
      }

    }
  }
</script>

<style lang="scss" scoped>

  .myvip-privilege {
    display: flex;
    flex-direction: column;
    align-items:center;
    padding-top: 10px;
    background-color: white;
    margin-top:10px;
    width: 350px;
    height: 140px;
  }

  .privilege-icon {
    border-radius: 20px;
    width:40px;
    height:40px;
    background-color: #F3EDCB;
  }

  .privilege-items {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    align-items: baseline;
    width: 100%;
  }
  .privilege-item-name {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: normal;
  }
  .privilege-item-tip {
    font-size: 12px;
    font-family: "Microsoft YaHei";
    font-weight: lighter;
  }

  .popshow-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 180px;
    justify-content: space-around;
  }

</style>


