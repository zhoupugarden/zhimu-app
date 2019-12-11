<template>
  <div class="comment-item-container">

    <div>
      <div v-if="detail.isShow === 1" class="avatar-url">
        <img :src="detail.avatarUrl" class="avatar-img">
      </div>
      <div v-else class="avatar-url">
        <img src="/static/images/avatar.png" class="avatar-img">
      </div>
    </div>

    <div>
      <div v-if="detail.isShow === 1" class="use-name">
        {{detail.nickName}}
      </div>
      <div v-else>
        匿名用户
      </div>
    </div>

    <div class="product-star">
      <van-rate
        size="10"
        :value="detail.overallScore"/>
    </div>
    <div style="display: flex;">
    <van-icon name="bookmark-o" color="E0E0E0" />
    <div style="font-size: 10px;">
      {{detail.contentTags}}
    </div>
  </div>
    <div class="comment-date">
      {{formatTime}}
    </div>
    <div class="user-comment">
      {{detail.content}}
    </div>

    <div class="feedback-pics">
      <div  v-for="(src,index) in contentUrls" :key="index">
        <img  :src="src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" @click="previewImage(src)">
      </div>
    </div>

    <div v-show="detail.reply" class="merchant-feed-back">
      {{detail.reply}}
    </div>

  </div>

</template>

<script>
  export default {

    name: "",
    props: {
      detail:Object
    },
    data() {
      return {
      }
    },
    methods: {
      previewImage(data) {
        console.log("image data", data)
        wx.previewImage(
          {
            current: data,
            urls:[data]
          }
        )
      },
      formatTime(val) {
        let newVal = new Date(val).toLocaleDateString();
        console.log("newVal", newVal)
      }


    },

    computed: {
      contentUrls() {
        console.log("this.detail.picUrls", this.detail.contentUrls)
        return this.detail.contentUrls.split(',');
      },
      formatTime() {
        return new Date(this.detail.commentDate).toLocaleDateString();
      }
    }


  }
</script>

<style lang="scss" scoped>
  .user-comment {
    word-wrap:break-word;
    word-break:break-all;
    font-size: 13px;
    margin-right: 10px;
  }
  .comment-item-container {
    position: relative;
    padding-left: 80px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f2f2f2;
    background-color: white;
  }
  .avatar-url {
    position: absolute;
    left: 20px;
    top: 10px;
    width: 60px;
    height: 60px;
  }
  .avatar-img {
    display: block;
    width: 60%;
    height: 60%;
    border-radius: 50%;
  }
  .comment-date {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 20px;
    font-size: 12px;
    color: #b2b2b2;
  }
  .merchant-feed-back {
    background-color: #f2f2f2;
    font-size: 12px;
    padding: 5px;
    word-wrap:break-word;
    word-break:break-all;
    margin-right: 10px;
  }
  .feedback-pics {
    display: flex;
  }
  .img{
    margin:10rpx 20rpx 10rpx 0;
  }

</style>
