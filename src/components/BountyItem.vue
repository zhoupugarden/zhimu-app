<template>
  <div class="bounty-container">
    <div class="bounty-coupon">
      <div v-if="item.couponRuleType === 1" style="color: white; font-size: 14px; font-weight: bold; padding: 5px;">
        {{"优惠券￥" + item.couponDisAmountValue + "元"}}
      </div>
      <div v-else style="color: white; font-size: 14px; font-weight: bold; padding: 5px;">
        {{"优惠券" + item.couponDisCountValue + "折"}}
      </div>
      <div style="color: white; font-size: 12px;padding-bottom: 5px">
        {{item.couponLimitDesc}}
      </div>
    </div>
    <div class="bounty-redeem">
      <div style="font-size: 12px; padding: 5px">
          需{{item.bountyCount}}元奖励金
      </div>
      <div>

        <div @click="bountyRedeem" class="self-button_class">
          立即兑换
        </div>
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
          content: '需要消耗' + that.item.bountyCount + '奖励金，确认兑换？',
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

  .self-button_class {
    background-image:linear-gradient(#ff976a, #E8EDF5);
    width: 60px;
    height: 20px;
    border-radius: 20px;
    font-size: 12px;
    color: white;
    padding: 1px 10px;
  }

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
