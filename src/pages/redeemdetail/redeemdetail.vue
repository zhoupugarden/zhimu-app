<template>
  <div class="redeemdetail-container">
    <div class="redeemdetail-header">
      <div class="redeemdetail-pic">
        <img :src="redeemItem.picUrl" class="redeemdetail-pic-item">
      </div>
      <div class="redeemdetail-header-content">
        <div style=" font-size: 16px;  font-family: 'Microsoft YaHei'">
          {{redeemItem.itemName}}
        </div>
        <div style="color: #CDA65B; font-size: 14px; font-weight: bold; font-family: 'Microsoft YaHei'">
          {{redeemItem.itemPoint}}积分
        </div>
      </div>
    </div>

    <div class="redeemdetail-desc">
      <div style="font-size: 18px; font-weight: bold; font-family: 'Microsoft YaHei'">兑换说明</div>
      {{redeemItem.itemDesc}}
    </div>
    <div class="redeemdetail-operation">
      <div style="width: 60%;  ">
        需{{redeemItem.itemPoint}}积分
      </div>
      <div style="width: 40%">
        <van-button custom-class = "redeem-detail-class" type="primary" size="normal">兑换</van-button>
      </div>
    </div>

    <!--<van-popup :show="popShow" @close="onClose">-->
      <!--确认框， 成功兑换，积分不足等-->
    <!--</van-popup>-->

    <!---->
  </div>
</template>

<script>

  export default {

    data() {
      return {
        redeemItem: {
          picUrl: "https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
          itemName:"20元代金券",
          itemDesc:"1、sdfsdf \n 2、cdsdfsff \n  3、sfdfsdf",
          itemPoint:"20"
        },
        popShow:false


      }
    },
    methods: {
      onClose() {

      }
    }

  }
</script>

<style lang="scss" scoped>
  .redeemdetail-container {

  }
  .redeemdetail-header {
    background-color: white;
  }
  .redeemdetail-pic {
    width: 100%;
    height: 200px;
    background-color: #F4F4F4;
  }
  .redeemdetail-header-content {
    padding: 10px 5px;
  }
  .redeemdetail-desc {
    margin-top: 10px;
    white-space: pre-line;
    background-color: white;
    padding-left: 5px;
  }

  .redeemdetail-pic-item {
    width: 80%;
    height: 80%;
    border-radius: 5px;
    margin: 5% 10%;
  }
  .redeemdetail-operation {
    position: fixed;
    bottom: 0px;
    display: flex;
    background-color: white;
    width: 100%;
  }


</style>

<style lang="scss">
  .redeem-detail-class {
    width: 100%;
  }

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
