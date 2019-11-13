<template>
  <div class="complaint-container">

    <div class="comlaint-type">
      <van-cell title="问题类型" is-link
                :value="complaintType" @click="popUp"/>
    </div>

    <van-cell-group>
      <van-field
        :value="content"
        type="textarea"
        placeholder="请填写..."
        custom-style="height:200px"
      />
    </van-cell-group>


    <div class="complaint_contact_info">
      <van-cell-group>
        <van-field
          :value="contactName"
          required
          clearable
          label="联系人"
        />
        <van-field
          :value="contactPhoneNo"
          label="联系电话"
          required
        />
      </van-cell-group>
    </div>

    <div style="padding-top: 100px;display: flex;justify-content: center">
      <van-button round
                  custom-class="custom-button"
                  @click="problemSubmit"
                  type="primary">提交</van-button>
    </div>

    <van-popup
      :show="popup"
      @close="popupClose"
      position="bottom"
      custom-style="height:50%"
    >
      <van-picker :columns="typeColumn"
                  show-toolbar
                  title="问题类型"
                  @cancel="onCancel"
                  @confirm="onConfirm"
                  />
    </van-popup>

  </div>

</template>

<script>

  import {SUBMIT_PROBLEM} from '@/utils/api';
  import {request} from "@/utils/request";


  export default {
  components: {
  },

  data() {
    return {
      active:0,
      complaintType:"请选择",
      content:"",
      contactName:"",
      contactPhoneNo:"",
      popup:false,
      typeColumn:["客服问题","产品问题","配送问题","系统问题","其他问题"]

    }

  },
  methods: {
    onChange(event) {
      console.log(event)
    },
    onCancel(event) {
      console.log("onCancel", event)
      this.popup = false
    },
    onConfirm(event) {
      console.log("onConfirm", event);
      this.complaintType = event.mp.detail.value;
      this.popup = false
    },
    popUp() {
      this.popup = true
    },
    popupClose() {
      this.popup = false;
    },

    problemSubmit() {
      let param = {};
      param.problemType = this.complaintType;
      param.content = this.content;
      param.contactName = data.contactName;
      param.contactPhone = data.contactPhoneNo;
      request(
        SUBMIT_PROBLEM,
        'post',
        param
      ).then(
        (response) => {
          wx.showModal({
            title: "提示",
            content: '感谢您的意见,我们会在24小时内尽快联系您!',
            confirmText: '确定',
            showCancel: false,
            success(res) {
              if(res.confirm) {
                wx.navigateTo(
                  {
                    url:'/pages/help/main'
                  }
                )
              }
            }
          });
        }
      )

    }
  }

}
</script>

<style lang="scss" scoped>
  .complaint_contact_info {
    margin-top: 10px;
    background-color: white;
  }


</style>
<style lang="scss">
  .van-tabs__custom {
    width: 100%;
    height: 100%;
  }
  .custom-button {
    /*width: 90%;*/
    padding:0 120px !important;
  }
</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color: #F4F4F4 !important;
  }
</style>
