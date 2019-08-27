<template>
  <div class="myaddress-container">
    <zhimu-address v-for="(item, index_) in addressArray"
             :addressInfo="item" :key="index"></zhimu-address>

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
      addressE: {
        road:"上海市浦东新区周浦镇印象春城",
        number:"75号701",
        name:"杨宇",
        phoneNo:"13817409664"
      },
      addressArray:[
        {
          road:"上海市浦东新区周浦镇印象春城",
          number:"75号701",
          name:"杨宇",
          phoneNo:"13817409664"
        },
        {
          road:"上海市浦东新区周浦镇印象春城",
          number:"75号701",
          name:"杨宇",
          phoneNo:"13817409664"
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


