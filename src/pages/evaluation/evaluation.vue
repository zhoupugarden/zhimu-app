<template>
  <div class="evaluation-container">
    <div class="evaluation-total">
        <div class="deliver-info">
          <div class="deliver-info_user">
            服务评价
          </div>
        </div>
        <div class="total-score">
          <van-rate size="14px" :value="rateValue" @change="activeTags"/>
        </div>
        <div v-if="isActive" class="total-tags">
          <div v-for="(item, index) in tagDescs" :key="index" >
            <van-tag round size="medium" @click="chooseTag(index)" :color="tagColor[index]">{{item}}</van-tag>
          </div>
        </div>
    </div>
    <div v-for= "(item, index) in orderInfo.orderCommentDetailList" class="evaluation-detail">
      <evaluation-item :itemInfo="item"
                       :ossConfig="ossConfig"
                       @rateChange="rateChange"
                       @fieldChange="contentChange"
                       @picUpload="picUpload"
                       @deletePic="deletePic"
      ></evaluation-item>
    </div>
    <div class="evaluation-switch">
      <div style="font-size: 14px; padding-right: 10px;">
        匿名评价
      </div>
      <div>
        <van-switch :checked="isAnonymous"
                    active-color="#07c160"
                    @change="onChangeSwitch" size="14px"/>
      </div>
    </div>
    <div class="evaluation-add-button">
      <div class="evaluation-add-button_wrap">
        <van-button round
                    custom-class="custom-button"
                    @click="submitOrderComment"
                    type="primary">立即评价</van-button>
      </div>
    </div>
  </div>

</template>

<script>
  import EvaluationItem from '@/components/EvaluationItem';
  import { mapGetters , mapActions} from 'vuex';
  import {GET_COMMENT_ORDER_INFO, SUBMIT_ORDER_COMMENT ,GET_OSS_CONFIG} from '@/utils/api';
  import {request} from "@/utils/request";
  import {pageUrlEnum} from "@/utils/enums";

  const activeColor = "#f2826a";
  export default {
    components: {
      EvaluationItem
    },
    data() {
      return {
        isAnonymous:false,
        orderInfo: {},
        isActive:false,
        rateValue: 0,
        tagDescs:["骑手服务好", "准时送达", "风雨无阻", "蛋糕完好", "送货上门"],
        tagColor:["","","","",""],
        choosedTag:[],
        commentItems:[],
        ossConfig:{},
        orderNo:""
      }
    },
    methods: {
      getOssConfig() {
        request(
          GET_OSS_CONFIG,
          'GET'
        ).then(
          response => {
            this.ossConfig = response;
          }
        )
      },
      chooseTag(event) {
        let tagId = event;
        if (this.choosedTag.indexOf(this.tagDescs[tagId]) === -1) {
          this.choosedTag.push(this.tagDescs[tagId]);
          this.tagColor[tagId] = activeColor;
        }else {
          this.choosedTag.splice(this.choosedTag.indexOf(this.tagDescs[tagId]), 1);
          this.tagColor[tagId] = "";
        }
      },
      activeTags(event) {
        this.isActive=true;
        this.rateValue = event.mp.detail;
      },

      rateChange(data) {
        let productId = data.productId;
        let rateValue = data.rateValue;
        let commentItem = this.commentItems.find( a => a.productId === productId);
        if (commentItem) {
          commentItem.tasteScore = rateValue;
          commentItem.packageScore = rateValue;
        } else {
          let tempItem = {};
          tempItem.productId = productId;
          tempItem.tasteScore = rateValue;
          tempItem.packageScore = rateValue;
          this.commentItems.push(tempItem);
        }

      },

      picUpload(data) {
        let productId = data.productId;
        let picUrl = data.picUrl;
        let commentItem = this.commentItems.find( a => a.productId === productId);
        if (commentItem) {
          if (commentItem.urls) {
            commentItem.urls = data.picUrls;
          } else {
            commentItem.urls = [];
            commentItem.urls = data.picUrls;
          }
        } else {
          let tempItem = {};
          tempItem.productId = productId;
          tempItem.urls = [];
          tempItem.urls.push(picUrl);
          this.commentItems.push(tempItem);
        }

      },
      deletePic(data) {
        let productId = data.productId;
        let index = data.index;
        let commentItem = this.commentItems.find( a => a.productId === productId);
        commentItem.urls.splice(index,1);
      },
      contentChange(data) {
        let productId = data.productId;
        let content = data.content;
        let commentItem = this.commentItems.find( a => a.productId === productId);
        if (commentItem) {
          commentItem.content = content;
        } else {
          let tempItem = {};
          tempItem.productId = productId;
          tempItem.content = content;
          this.commentItems.push(tempItem);
        }
      },

      onChangeSwitch(event) {
        if (event.mp.detail) {
          this.isAnonymous = true;
        } else {
          this.isAnonymous = false;
        }
      },

      getCommentOrderInfo(params) {
        request(
          GET_COMMENT_ORDER_INFO,
          'GET',
          params
        ).then(
          (response) => {
            this.orderInfo = response;
          }
        )
      },

      submitOrderComment() {
        let commentBo = {};
        commentBo.orderNo = this.orderNo;
        commentBo.deliverScore = this.rateValue;
        commentBo.itemBos = this.commentItems;
        commentBo.tags = this.choosedTag;
        commentBo.isAnonymous = this.isAnonymous;
        request(
          SUBMIT_ORDER_COMMENT,
          'POST',
          commentBo
        ).then(
          (response) => {
            // 如果成功，清空数据，提示积分，确认后跳转订单列表
            //  提示获赠积分，跳转订单列表
            let pointCount = response.pointCount;
            let title = "";
            if (response.commentType === 1) {
              title = "有图评价成功";
            } else {
              title = "评价成功";
            }
            wx.showModal({
              title: title,
              content: '您已获赠' + pointCount + '积分',
              confirmText: '确定',
              showCancel: false,
              success(res) {
                if(res.confirm) {
                  wx.switchTab(
                    {
                      url:pageUrlEnum.order_url
                    }
                  )
                }
              }
            });
          }
        )
      }

    },
    computed: {
      ...mapGetters(
        [
          'isVip'
        ]
      ),
    },
    onLoad() {
      let params = this.$root.$mp.query;
      this.orderNo = params.orderNo;
      this.getCommentOrderInfo(params);
      this.getOssConfig();
    },
    onUnload() {
      this.isAnonymous = 0;
      this.isActive = false;
        this.rateValue = 0;
        this.choosedTag= [];
        this.commentItems = [];
    }


  }
</script>

<style lang="scss" scoped>
  @import "evaluation.scss";
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
