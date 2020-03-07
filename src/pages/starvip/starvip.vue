<template>
  <div class="starvip-container">
    <div class="starvip-card">
      <div class="starvip-card_image">
          <div style="position: absolute;top: 10px;left: 10px;color: #d9b56e;">
            ZIMUCAKE
          </div>
          <div style="position: absolute;top: 30px;left: 10px;color: #d9b56e;">
            子木蛋糕
          </div>
          <div style="position: absolute;bottom: 10px;right: 10px;color: #d9b56e;">
            子木星球会员卡
          </div>
          <div style="text-align: center;color: #d9b56e;padding: 70px;font-weight: bold;font-size: 22px;">
            500元
          </div>
      </div>
      <div class="starvip-tip">
        付费购买星球会员卡享12个月会员权益
      </div>
    </div>

    <div class="starvip-open">
      <div>
        <span style="font-size: 18px; padding: 10px;">
          开通礼包
        </span>
        <span style="font-size: 14px; color: #b2b2b2;">
          开通星球会员后，立即发放
        </span>
      </div>
      <div class="privilege-items">
        <div class="privilege-item" @click="showPopup(0)">
        <img src="../../asset/vip/deliver.png" class="privilege-icon">
        <div class="privilege-item-name">运费券</div>
      </div>
      <div class="privilege-item" @click="showPopup(1)">
        <img src="../../asset/vip/discount.png" class="privilege-icon">
        <div class="privilege-item-name">9折券</div>
      </div>
        <div class="privilege-item" @click="showPopup(2)">
          <img src="../../asset/vip/reduction.png" class="privilege-icon">
          <div class="privilege-item-name">满减券</div>
        </div>
      <div class="privilege-item" @click="showPopup(3)">
        <img src="../../asset/vip/balance.png" class="privilege-icon">
        <div class="privilege-item-name">余额+500元</div>
      </div>
      </div>

    </div>

    <div class="starvip-month">
      <div style="padding: 20px 0px">
        <span style="font-size: 18px; padding: 10px;">
          每月等级权益
        </span>
        <span style="font-size: 14px; color: #b2b2b2;">
          根据购买日期，每月同一时间发放
        </span>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between;">
          <div style="padding: 10px;">
            免运费券
          </div>
          <div style="padding: 10px; color: #d9b56e; font-weight: bold;">
            x2/月
          </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="padding: 10px;">
            9折券
          </div>
          <div style="padding: 10px; color: #d9b56e; font-weight: bold;">
            x1/月
          </div>
        </div>
      </div>

    </div>

    <div class="starvip-privilege">
      <div>
        <span style="font-size: 18px; padding: 10px;">
          星球会员权益
        </span>
        <span style="font-size: 14px; color: #b2b2b2;">
          星球会员有效期内有效
        </span>
      </div>
      <div>
        <div style="display: flex; justify-content: space-between;">
          <div style="padding: 10px;">
            生日蛋糕满减券
          </div>
          <div style="padding: 10px;color: #d9b56e; font-weight: bold;">
            30元
          </div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <div style="padding: 10px;">
            加速积分
          </div>
          <div style="padding: 10px;color: #d9b56e; font-weight: bold;">
            5倍
          </div>
        </div>
      </div>

    </div>
    <div class="starvip-buy">
        <div style="background-color: #ffffff;color: #d9b56e;" class="button-font">
        <span>
          总价：
        </span>
        <span>
          500元
        </span>
      </div>
        <div style="background-color: #d9b56e;color: white;"  @click="charge" class="button-font">
        去支付
      </div>
      </div>
    <van-popup
      :show="popShow"
      positon="center"
      custom-style="border-radius:10px"
      round>
      <div class="popshow-container">
        <div>
          <img src="../../asset/vip/deliver.png" class="privilege-icon_pop">
        </div>
        <div style="font-size: 18px; ">
          {{popContent.title}}
        </div>
        <div style="font-size: 14px;width: 180px">
          {{popContent.content}}
        </div>
        <div>
          <van-button custom-class="custom-button"
                      @click="popupClose"
                      size="small">确定</van-button>
        </div>
      </div>
    </van-popup>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
  import { mapGetters , mapActions} from 'vuex';
  import {CHARGE, GET_CHARGE_CONFIG_INFO,MY_USER_INFO , MOCK_WX_PAY} from '@/utils/api';
  import Dialog from '../../../static/vant/dialog/dialog';
  import {request} from "@/utils/request";

  const popContents = [
    {
      imgUrl:"../../asset/vip/deliver.png",
      title:"运费券2张",
      content:"开通会员后自动到账，自发放日起，有效期一个月"
    },
    {
      imgUrl:"../../asset/vip/discount.png",
      title:"9折券1张",
      content:"开通会员后自动到账，自发放日起，有效期一个月"
    },
    {
      imgUrl:"../../asset/vip/reduction.png",
      title:"满减券1张",
      content:"蛋糕类商品满100元减10元，开通会员后自动到账，自发放日起，有效期一个月"
    },
    {
      imgUrl:"../../asset/vip/balance.png",
      title:"余额+500元",
      content:"永久有效，开通会员后自动到账"
    }
  ];

  export default {
    components: {
    },
    data() {
      return {
        popShow: false,
        popContent: {

        },
        userInfo:{},
        productId:"",
        skuId:""

      }
    },
    methods: {
      mockWxPay(data) {
        request(
          MOCK_WX_PAY,
          'POST',
          data
        ).then(
          response => {
            console.log("this response", response);
            //  微信支付成功后，跳转到myvip页面
            let url = "../my/main" ;
            console.log("url",url);
            wx.switchTab({
              url
            });
          }
        )
      },
      getChargeProductInfo() {
        request(
          GET_CHARGE_CONFIG_INFO,
          'GET'
        ).then(
          response => {
            console.log("this response", response);
            this.productId = response.productId;
            this.skuId = response.skuId;
          }
        )
      },

      charge() {
        let that = this;
        let params = {};
        params.userId = this.userId;
        params.productId = this.productId;
        params.skuId = this.skuId;
        console.log("charge");
        request(
          CHARGE,
          'POST',
          params
        ).then(
          response => {
            console.log("this response", response);
            let data = {};
            data.out_trade_no = response.orderNo;
            data.transaction_id = response.unifiedOrderNo;
            data.total_fee = 50000;
            Dialog.confirm({
              title: '微信支付',
              message:'确认支付' + data.total_fee + '元'
            }).then(() => {
              that.mockWxPay(data);
            }).catch(() => {
              // on cancel
            });

          }
        )
      },

      showPopup(id) {
        console.log("id",id);
        Object.assign(this.popContent, popContents[id]);
        this.popShow = true;
      },
      popupClose() {
        console.log("popupClose")
        this.popShow = false;
      },
      navigateToBuy() {
        var url = "/pages/buyvip/main";
        console.log("url",url)
        wx.navigateTo({
          url
        });
      },
      getUserInfo(token) {
        let params = {};
        params.token = token;
        request(
          MY_USER_INFO,
          'GET',
          params
        ).then(
          response => {
            //将userID放在存储中
            console.log("response",response)
            this.userInfo = response;
          }
        )
      }
    },
    computed: {
      ...mapGetters(
        [
          'userId','isVip','token','isLogin'
        ]
      ),
    },
    onShow() {
      this.getChargeProductInfo();
      if (!this.isLogin) {
        wx.navigateTo({
          url:'/pages/login/main'
        })
      } else {
        this.getUserInfo(this.token);
      }
    },
    onUnload() {
      let pages = getCurrentPages();
      let prePage = pages[pages.length -2];
      let preUrl = prePage.route;
      if (preUrl === "pages/login/main") {
        wx.switchTab({
            url : "/pages/my/main"
          }
        )
      }
    }


  }
</script>

<style lang="scss" scoped>
  .starvip-card_image {
    width: 300px;
    height: 180px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 30px auto;
    position: relative;
  }
  .starvip-tip {
    text-align: center;
    color: #d9b56e;
  }
  .privilege-icon {
    width:30px;
    height:30px;
  }
  .privilege-icon_pop {
    width:80px;
    height:80px;
  }

  .privilege-items {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    align-items: baseline;
    width: 100%;
  }
  .privilege-item {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .popshow-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    height: 240px;
    justify-content: space-around;
  }


  .starvip-open {
    background-color: #ffffff;
    margin: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
  }
  .starvip-month {
    background-color: #ffffff;
  }
  .starvip-buy {
    position: fixed;
    bottom: 0px;
    border-top: solid #b2b2b2 1px;
    display: -webkit-flex;
    width: 100%;
    height: 50px;
  }
  .starvip-privilege {
    background-color: #ffffff;
    margin-top: 10px;
    padding-bottom: 80px;
  }
  .button-font {
    -webkit-flex: 1;
    display: flex;
    font-weight: bolder;
    justify-content: center;
    align-items: center;
  }



</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
  .custom-button {
    width: 180px;
    color: #ffffff !important;
    background-color: #d9b56e !important;
  }


</style>
