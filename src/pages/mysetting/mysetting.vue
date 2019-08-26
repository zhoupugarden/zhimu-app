<template>
  <div class="mysetting-container">
    <div class="mysetting-header">
      <img :src="basicInfo.avatar" class="circleImg">
      <div>{{username}}</div>
    </div>

    <div class="mysetting-detail">

      <van-cell-group>
        <van-field
          :value="username"
          required
          clearable
          label="用户名"
          bind:click-icon="onClickIcon"
        />
        <van-field
          :value="phoneno"
          required
          clearable
          label="手机号"
          bind:click-icon="onClickIcon"
        />

        <van-radio-group :value="sex" @click="onChange">
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>

        <van-datetime-picker
          type="date"
          :value="currentDate"
          @input="onInput"
          :min-date="minDate"
          :formatter="formatter"
        />


      </van-cell-group>


    </div>


  </div>

</template>

<script>



export default {

  components: {
  },

  data() {
    return {
      basicInfo: {
        avatar:"https://t12.baidu.com/it/u=541581695,4055461334&fm=76",
        name:"宇",
        level:"新朋友"
      },

      walletInfo : {
        balance: 100,
        coupon:2,
        point : 100
      },
      currentDate: new Date().getTime(),
      minDate: new Date().getTime(),
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`;
        }
        return value;
      }

    }

  },

  methods: {
    onInput(event) {
      this.currentDate = event.detail
    }
  }
}
</script>

<style scoped>

</style>
