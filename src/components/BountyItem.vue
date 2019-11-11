<template>
  <div class="bounty-container">
    <div class="bounty-coupon">
      <div style="color: white; font-size: 12px; padding: 5px;">
        优惠券 ￥{{item.couponValue}}
      </div>
      <div style="color: white; font-size: 8px;padding-bottom: 5px">
        满100可用
      </div>
    </div>
    <div class="bounty-redeem">
      <div style="font-size: 10px; padding: 5px">
          需{{item.needBounty}}元奖励金
      </div>
      <div>
        <van-button round size="mini" @click="bountyRedeem" type="warning">立即兑换</van-button>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "",
    props: {
      item:Object
    },

    methods: {
      bountyRedeem() {
        let that = this;
        wx.showModal({
          title: "提示",
          content: '需要消耗' + that.item.needBounty + '奖励金，确认兑换？',
          confirmText: '兑换',
          confirmColor: "#f44",
          showCancel: true,
          success(res) {
            if(res.confirm) {
              that.$emit('redeemCoupon', that.item)
            }
          }
        });

      }
    }
  }
</script>

<style lang="scss" scoped>
  .bounty-container {
    background-color: white;
    border-radius: 5px;
    display: flex;
    margin: 10px;
    justify-content: space-around;
  }
  .bounty-coupon {
    background-color: #ff7a4a;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
    width: 40%;
    text-align: center;
  }
  .bounty-redeem {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
    margin: 10px;
  }

</style>
