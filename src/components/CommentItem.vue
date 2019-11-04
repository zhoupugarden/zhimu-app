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
      <van-rate :value="detail.overAllScore"/>
    </div>
    <div>
      <van-icon name="bookmark-o" color="E0E0E0" />
      {{detail.tags}}
    </div>
    <div class="comment-date">
      {{detail.commentDate}}
    </div>
    <div class="user-comment">
      {{detail.content}}

    </div>
    <div v-show="detail.reply" class="merchant-feed-back">
      {{detail.reply}}
    </div>
    <div class="feedback-pics">
      <div  v-for="(src,index) in detail.picUrls" :key="index">
        <img  :src="src" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" @click="previewImage(src)">
      </div>
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment-item-container {
    position: relative;
    padding-left: 80px;
    margin-top: 15px;
    padding-bottom: 30px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
  }
  .avatar-url {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
  }
  .avatar-img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .comment-date {
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
    height: 20px;
    font-size: 14px;
  }
  .merchant-feed-back {
    background-color: #CFD4DA;
  }
  .feedback-pics {
    display: flex;
  }
  .img{
    margin:10rpx 20rpx 10rpx 0;
  }

</style>
