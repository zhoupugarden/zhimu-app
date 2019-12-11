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

    <div @click="popBountyLog" class="detail-container">
      <div style="padding: 5px">
        <van-icon color="orange"  name="bars" />
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
    <div @click="popTip" class="sign-rule">
      <div style="padding: 0px 1px;">
        <van-icon size="10px" color="#b2b2b2" name="question-o" />
      </div>
      <div style="font-size: 10px; color: #b2b2b2;">
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
      <div style="font-size: 18px; font-weight: bold; text-align: center">
        签到规则
      </div>
      <div style="font-size: 16px;">
        1、签到获取的奖励金可累计用于兑换优惠券
      </div>
      <div style="font-size: 16px;">
        2、签到要连续，断签需从第一天重新开始
      </div>
      <div style="font-size: 16px;">
        3、七天循环一次，第八天从第一天重新开始
      </div>
      <div style="font-size: 16px;">
        4、每日0点刷新，可进行新一天的签到
      </div>

    </van-popup>

    <van-popup
      :show="popLogShow"
      custom-style="height: 40%;width: 70%;border-radius: 10px;top:30%;"
      position="center"
      @close="onPopupLogClose"
      close-on-click-overlay
    >
      <div style="font-size: 14px; font-weight: bold; text-align: center; padding: 10px;">
        奖励金记录
      </div>
      <div style="margin: 0px 10px; text-align: center;" v-for="(item, index) in signDetailList" :key="index">
        <span style="font-size: 12px;">{{item.id}}.</span>
        <span style="font-size: 12px; padding: 5px">{{item.desc}}</span>
        <span style="font-size: 12px; color: #b2b2b2;">{{item.signDate}}</span>
      </div>
    </van-popup>

  </div>
</template>

<script>

  import BountyItem from '@/components/BountyItem';
  import {ADD_SIGN,SIGN_INDEX,BOUNTY_REDEEM,SIGN_DETAIL } from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';
  import {toast} from '../../utils/toast';


  const coupons = [
    {
      couponRuleId:7,
      couponValue:5,
      needBounty:5
    },
    {
      couponRuleId:8,
      couponValue:10,
      needBounty:10
    },
    {
      couponRuleId:3,
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
        signDetailList:[],
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
        couponItems: []

      }
    },
    methods: {
      popBountyLog() {
        this.popLogShow = true;
        this.signDetail();
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
            wx.requestSubscribeMessage({
              tmplIds: ['NiwQZaKrzNmkRIpsgDpHNX_T0_16WD3bn9N5etwFAmA'],
              success (res) {
                //订阅成功
                toast("提醒订阅成功");
                console.log("requestSubscribeMessage res", res)
              },
              complete(res) {
                console.log("requestSubscribeMessage res", res)
              }
            })

          }
        )
      },

      redeemCoupon(data) {
        console.log("redeemCoupon", data)
        let param = {};
        param.userId = this.userId;
        param.couponRuleId = data.couponRuleId;
        param.bounty = data.needBounty;
        request(
          BOUNTY_REDEEM,
          'post',
          param
        ).then(
          (response) => {
            this.bounty = response.bounty;
            wx.showModal({
              title: "提示",
              content: '优惠券兑换成功!',
              confirmText: '去看看',
              showCancel: true,
              success(res) {
                if(res.confirm) {
                  wx.navigateTo(
                    {
                      url:'/pages/coupon/main'
                    }
                  )
                }
              }
            });


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
      signDetail() {
        let param = {};
        param.userId = this.userId;
        request(
          SIGN_DETAIL,
          'get',
          param
        ).then(
          (response) => {
            console.log("this response", response);
            this.signDetailList = response;

          }
        )
      },
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
      this.couponItems = Object.assign([], coupons);
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
    align-items: center;
  }

  .mission-container {
    position: relative;
  }

  .bounty-total-container {
    text-align: center;
    color: white;
    background-color: orange;
    padding: 20px;
    height: 50px;
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

  /*.van-step__title {*/
    /*font-size: 8px !important;*/
  /*}*/
  /*.van-step--horizontal {*/
    /*font-size: 8px !important;*/
  /*}*/


</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
