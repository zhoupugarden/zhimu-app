<template>
  <div class="mysetting-container">
    <div class="mysetting-header">
      <div>
        <img :src="basicInfo.avatar" class="circleImg">
      </div>
      <div>{{basicInfo.name}}</div>
    </div>

    <div class="mysetting-detail">

      <van-cell-group>
        <van-field
          :value="basicInfo.name"
          required
          clearable
          label="用户名"
          bind:click-icon="onClickIcon"
        />
        <van-field
          :value="basicInfo.phoneno"
          required
          clearable
          label="手机号"
        />

        <div class="sex-flex">
         <div>
           <van-field
             clearable
             label="性别"
             custom-style="width:90px"
           />
         </div>
          <div>
            <van-radio-group :value="basicInfo.sex"
                             data-key="basicInfo.sex"
                             @change="onChangeSex">
              <div class="radio-flex">
                <div>
                  <van-radio icon-class="small-radio-icon" checked-color="black" name="1">男</van-radio>
                </div>
                <div>
                  <van-radio icon-class="small-radio-icon" checked-color="black" name="2">女</van-radio>
                </div>
              </div>
            </van-radio-group>
          </div>
        </div>

        <van-field
          clearable
          @focus="chooseBirthDay"
          label="生日"
          placeholder="请输入生日信息，保存后不可修改"
          :value="currentDate"
        />
      </van-cell-group>
    </div>

    <div>
      <van-popup :show="datePopShow" position="bottom">
        <van-datetime-picker
          type="date"
          date-type="date"
          :value="currentDate"
          @input="onInput"
          @cancel="cancelPopup"
          @confirm="confirmPopup"
          :min-date="minDate"
        />
      </van-popup>
    </div>

    <div style="padding-top: 100px;display: flex;justify-content: center">
      <van-button round
                  custom-class="custom-button"
                  type="primary">保存</van-button>
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
        level:"新朋友",
        phoneno:13817409664,
        sex:"1"
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
      },
      popupShow:false,
      datePopShow:false,
      currentDate:''
    }

  },

  methods: {

    inputChange(event) {
      console.log("event", event);
    },

    onInput(event) {
      this.currentDate = event.detail
    },
    onChangeSex(event) {
      this.basicInfo.sex = event.detail;
    },
    chooseBirthDay() {
      console.log("chooseBirthDay", this.datePopShow)
      this.datePopShow=true;
    },
    confirmPopup(event) {
      console.log("val", event)
      const {detail, currentTarget} = event.mp;
      if (!isNaN(detail)) {
        const date = new Date(detail);
        this.currentDate = date.toLocaleDateString();
        this.datePopShow = false;
      }else {
        this.datePopShow = false;

      }
    },
    cancelPopup() {
      this.datePopShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>

  .mysetting-header {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    height: 100px;
  }
  .mysetting-detail {
    margin-top: 10px;
  }

  .circleImg {
    border-radius: 30px;
    width:60px;
    height:60px;
  }

  .radio-flex {
    display: flex;
    width: 200px;
    justify-content: space-between;
    font-size: 14px;
  }
  .sex-flex {
    display: flex;
    background-color: white;
    align-items:center;
  }

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>

<style lang="scss">
  .small-radio-icon {

  }
  .custom-button {
    /*width: 90%;*/
    padding:0 120px !important;
  }
</style>
