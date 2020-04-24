<template>
  <div class="mysetting-container">
    <div class="mysetting-header">
      <div>
        <img :src="basicInfo.avatarUrl" class="circleImg">
      </div>
      <div>{{basicInfo.nickName}}</div>
    </div>

    <div class="mysetting-detail">

      <van-cell-group>
        <van-field
          :value="basicInfo.nickName"
          readonly
          clearable
          label="用户名"
          bind:click-icon="onClickIcon"
        />
        <van-field
          :value="basicInfo.phoneNo"
          readonly
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
            <van-radio-group :value="valueSex"
                             @change="onChangeSex">
       <div style="display: flex">
         <div style="margin: 0px 15px;">
           <van-radio icon-class="small-radio-icon" checked-color="black" name="1">男</van-radio>
         </div>
         <div>
           <van-radio icon-class="small-radio-icon" checked-color="black" name="2">女</van-radio>
         </div>
       </div>
            </van-radio-group>
          </div>
        </div>
        <div @click="chooseBirthDay">
          <van-field
            readonly
            label="生日"
            placeholder="请输入生日信息，保存后不可修改"
            :value="basicInfo.birthDate"
          />
        </div>

      </van-cell-group>
    </div>

    <div>
      <van-popup :show="datePopShow" position="bottom">
        <van-datetime-picker
          type="date"
          date-type="date"
          :value="currentDate"
          @cancel="cancelPopup"
          @confirm="confirmPopup"
          :min-date="minDate"
        />
      </van-popup>
    </div>

    <div style="padding-top: 100px;display: flex;justify-content: center">
      <van-button round
                  custom-class="custom-button"
                  @click="updateUserInfo"
                  type="primary">保存</van-button>
    </div>
  </div>
</template>

<script>

  import {UPDATE_USER_INFO, MY_USER_INFO} from '@/utils/api';
  import {request} from "@/utils/request";
  import { mapGetters} from 'vuex';
  import {formatYMD} from "@/utils/dateUtil";

  export default {
  data() {
    return {
      basicInfo: {
        avatarUrl:'',
        gender:'',
        birthDate:''
      },
      valueSex:'',
      currentDate: new Date().getTime(),
      minDate: new Date('1900-01-01').getTime(),
      popupShow:false,
      datePopShow:false,
      birthDate:'',
      disabled:true
    }
  },


  methods: {
    onInput(event) {
      console.log("onInput event", event);
      this.birthDate = formatYMD(event.mp.detail);
      this.currentDate = new Date(event.mp.detail).getTime();
    },
    onChangeSex(event) {
      console.log("this.valueSex", this.valueSex)
      console.log("event", event);
      this.valueSex = event.mp.detail;
    },
    chooseBirthDay() {
      console.log("chooseBirthDay", this.datePopShow);
      if (!this.disabled) {
        this.datePopShow=true;
      }else {
        return;
      }
    },
    confirmPopup(event) {
      console.log("val", event);
      const {detail, currentTarget} = event.mp;
      if (!isNaN(detail)) {
        this.currentDate = detail;
        this.basicInfo.birthDate = formatYMD(this.currentDate);
        console.log("this.birthDate", this.birthDate)
        this.datePopShow = false;
      }else {
        this.datePopShow = false;
      }
    },
    cancelPopup() {
      this.datePopShow = false;
    },
    updateUserInfo() {
      let params = {};
      params.birthDate = new Date(this.basicInfo.birthDate);
      params.gender = this.valueSex;
      request(
        UPDATE_USER_INFO,
        'POST',
        params
      ).then(
        response => {
          console.log(response)
          wx.switchTab({
            url:"/pages/my/main"
          })
        }
      )

    },
    getUserInfo() {
      let params = {};
      request(
        MY_USER_INFO,
        'GET',
        params
      ).then(
        response => {
          this.basicInfo = response;
          console.log("===response", response, this.basicInfo);
          this.valueSex = this.basicInfo.gender.toString();
          if (!this.basicInfo.birthDate) {
            this.birthDate = '';
            this.disabled = false;
          }else {
            this.birthDate = formatYMD(this.basicInfo.birthDate);
            this.disabled = true;
          }
        }
      )
    }
  },
  computed: {
    formatBirthDate() {
      let timestamp = new Date(this.basicInfo.birthDate).getTime();
      return formatYMD(timestamp)
    },
    ...mapGetters(
      [
        'cartTotalCount'
      ]
    )
  },
    mounted() {
    this.getUserInfo();
  }

}
</script>

<style lang="scss" scoped>
@import "mysetting.scss";
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
