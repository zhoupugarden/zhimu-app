<template>
  <div class="myaddress-container">
    <div v-for="(item, index_) in addressArray" :key="index" @click="backToOrderSubmit">
      <zhimu-address
        :addressInfo="item"></zhimu-address>
    </div>
    <div class="address-add-button">
      <div class="address-add-button_wrap">
        <van-button round
                    custom-class="custom-button"
                    @click="navigateToNew"
                    type="primary">新增收货地址</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import ZhimuAddress from '@/components/ZhimuAddress';

  export default {
  components: {
    ZhimuAddress
  },
  data() {
    return {
      active:"123",
      jump:false,
      addressArray:[
        {
          road:"上海市浦东新区周浦镇印象春城",
          number:"75号701",
          name:"杨宇",
          phoneNo:"13817409664"
        },
        {
          road:"河南省洛阳市道北路",
          number:"1号院",
          name:"汪洁",
          phoneNo:"18621666217"
        }
      ]
    }

  },
  methods: {
    onChange(event) {
      console.log(event)
    },
    navigateToNew() {
      var url = "/pages/newaddress/main";
      console.log("url",url)
      wx.navigateTo({
        url
      });
    },
    backToOrderSubmit(event) {
      console.log("this.event:", event)
      if (this.jump === true) {
        var url = "/pages/ordersubmit/main?addressId=" + "12333";
        console.log("url",url)
        wx.navigateTo({
          url
        });
      } else {
        console.log("不用跳转", this.jump)
      }

    }
  },
    mounted() {
    if (null != this.$root.$mp.query) {
      console.log(this.$root.$mp.query);
      this.jump = this.$root.$mp.query.jump;
    }


    }



}
</script>

<style lang="scss" scoped>
  .address-add-button {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: white;
    margin-top: 10px;
  }
  .address-add-button_wrap {
    display: flex;
    justify-content: center;
    padding: 10px 10px;
  }
</style>

<style lang="scss">
  .custom-button {
    padding:0 120px !important;
  }
</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>


