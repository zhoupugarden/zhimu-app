<template>
  <div class="mission-container">
    <div class="bounty-total-container">
      <div>
        我的奖励金
      </div>
      <div>
        ￥{{bounty}}
      </div>
    </div>

    <div class="detail-container">
      <div>
        <van-icon color="orange" @click="popBountyLog" name="bars" />
      </div>
      <div style="color: orange; font-size: 16px; padding: 3px">明细</div>
    </div>

  <div class="sign-container">
    <div class="sign-total-container">
      <div style="padding: 12px">
      已连续签到
      </div>
      <div>
        <span style="color: red; font-size: 18px">
      {{daysCount}}
        </span>
        <span>
          天
        </span>
      </div>

    </div>
    <div class="sign-rule">
      <div>
        <van-icon @click="popTip" name="question-o" />
      </div>
      <div>
        签到规则
      </div>
    </div>


    <div>
      <van-steps
        :steps="steps"
        :active="activeStepIndex"
        active-color="#f44"
        custom-class="root-custom-class"
      />
      <div style="padding: 10px;text-align: center;">


        <van-button
          @click="signAdd"
          :disable="disable"
          type="warning"
        >{{signText}}</van-button>
      </div>
    </div>

  </div>
    <div class="bounty-redeem-container">
      <div style="text-align: center; padding: 10px; font-size: 16px;">
        奖励换好券
      </div>
      <div>
        <div v-for="(item_, index) in couponItems" :key="index">
          <bounty-item
            :item="item_"
            @redeemCoupon="redeemCoupon"
          ></bounty-item>
        </div>
      </div>
    </div>

    <van-popup
      :show="popShow"
      custom-style="height: 40%;width: 60%;border-radius: 10px;top:30%;"
      position="center"
      @close="onPopupClose"
      close-on-click-overlay
      >
      <div>
        签到规则
      </div>
      <div>
        1、签到获取的奖励金可累计用于兑换优惠券
        2、签到获取的奖励金可累计用于兑换优惠券
        3、签到获取的奖励金可累计用于兑换优惠券
        4、签到获取的奖励金可累计用于兑换优惠券
      </div>

    </van-popup>

    <van-popup
      :show="popLogShow"
      custom-style="height: 40%;width: 60%;border-radius: 10px;top:30%;"
      position="center"
      @close="onPopupLogClose"
      close-on-click-overlay
    >
      <div>
        签到规则
      </div>
      <div>
        1、签到获取的奖励金可累计用于兑换优惠券
        2、签到获取的奖励金可累计用于兑换优惠券
        3、签到获取的奖励金可累计用于兑换优惠券
        4、签到获取的奖励金可累计用于兑换优惠券
        1、签到获取的奖励金可累计用于兑换优惠券
        2、签到获取的奖励金可累计用于兑换优惠券
        3、签到获取的奖励金可累计用于兑换优惠券
        4、签到获取的奖励金可累计用于兑换优惠券
        1、签到获取的奖励金可累计用于兑换优惠券
        2、签到获取的奖励金可累计用于兑换优惠券
        3、签到获取的奖励金可累计用于兑换优惠券
        4、签到获取的奖励金可累计用于兑换优惠券
      </div>

    </van-popup>




  </div>
</template>

<script>

  import BountyItem from '@/components/BountyItem';
  import {ADD_SIGN,SIGN_INDEX } from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';

  const coupons = [
    {
      ruleId:1,
      couponValue:5,
      needBounty:5
    },
    {
      ruleId:2,
      couponValue:10,
      needBounty:10
    },
    {
      ruleId:3,
      couponValue:20,
      needBounty:20
    }
  ];

  export default {
    components: {
      BountyItem
    },

    data() {
      return {
        activeStepIndex: -1,
        disable:false,
        bounty:0,
        daysCount:0,
        popShow:false,
        popLogShow:false,
        signText:"签到",
        buttonColor:"#FF5951",
        sign:false,
        steps: [
          {
          },
          {
            text:'2天',
            desc: '+1'
          },
          {
          },
          {
            text:'4天',
            desc: '+1'
          },
          {
          },
          {
            text:'6天',
            desc: '+1'
          },
          {
            text:'7天',
            desc: '+2'
          }
        ],
        couponItems: Object.assign([], coupons)

      }
    },
    methods: {

      redeemCoupon(data) {
        console.log("redeemCoupon", data)
      },


      popBountyLog() {
        this.popLogShow = true;
      },
      onPopupLogClose() {
        this.popLogShow = false;
      },
      onPopupClose() {
        this.popShow = false;

      },
      popTip() {
        this.popShow = true;
      },
      signAdd() {
        if (this.disable) {
          return;
        }
        let param = {};
        param.userId = this.userId;
        request(
          ADD_SIGN,
          'post',
          param
        ).then(
          (response) => {
            this.activeStepIndex = response.daysCount - 1;
            this.bounty = response.bounty;
            this.daysCount = response.daysCount;
            this.sign = true;
          }
        )
      },

      signIndex() {
        let param = {};
        param.userId = this.userId;
        request(
          SIGN_INDEX,
          'get',
          param
        ).then(
          (response) => {
            console.log("this response", response);
            this.activeStepIndex = response.daysCount - 1;
            this.bounty = response.bounty;
            this.daysCount = response.daysCount;
            this.sign = response.sign;
          }
        )
      },

      test() {
        let params = {};
        params.pageNum = 1;
        params.pageSize = 10;
        params.productId = 100;
        request(
          "http://localhost:8080/comment/product/list",
          'GET',
          params
        ).then(
          response => {
            console.log("this response", response);
            this.disable = response.isSign;
          }
        )
      }

    },
    computed: {
      ...mapGetters(
        [
          'userId','token'
        ]
      )
    },
    watch: {
      sign(val) {
        if (val === true) {
          this.disable = true;
          this.signText = "已签到";
          this.buttonColor ="#B2B6BB";
        } else {
          this.disable = false;
          this.signText = "签到";
          this.buttonColor ="#FF5951";
        }
      }
    },

    onShow() {
      this.signIndex();
    }

  }
</script>

<style lang="scss" scoped>

  .bounty-redeem-container {
    background-color: moccasin;
    margin: 10px;
    padding-bottom: 10px;
  }

  .sign-container {
    background-color: white;
    border-radius: 10px;
    margin: 10px;
    position: relative;
  }
  .sign-rule {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 10px;
  }

  .mission-container {
    position: relative;
  }

  .bounty-total-container {
    text-align: center;
    color: white;
    background-color: orange;
    padding: 20px;
    height: 100px;
    z-index: -1;
    display: flex;
    flex-direction: column;

  }
  .detail-container {
    position: absolute;
    display: flex;
    background-color: white;
    top: 20px;
    right: 0px;
    justify-content: center;
    width: 80px;
    align-content: center;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    height: 30px;
  }
  .sign-total-container {
    text-align: center;
    font-size: 12px;
  }

</style>

<style lang="scss">

  .van-step__title {
    font-size: 8px !important;
  }
  .van-step--horizontal {
    font-size: 8px !important;
  }

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
