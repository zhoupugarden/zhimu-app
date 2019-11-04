<template>
  <div class="comments-container">
    <div class="comments-header">
      <div class="comment-overall">
        <div>
          {{comments.totalScore}}
        </div>
        <div>
          综合评价
        </div>
      </div>
      <div class="comment-detail-rate">
        <div class="comment-favor">
          <div>
            口味
          </div>
          <van-rate size="12" value="3"></van-rate>
          <div>
            {{comments.tasteScore}}
          </div>
        </div>
        <div class="comment-pack">
          <div>
            包装
          </div>
          <van-rate size="12" value="3"></van-rate>
          <div>
            {{comments.packageScore}}
          </div>
        </div>
      </div>
      <div class="comment-delivery-rate">
        <div>
          {{comments.deliverScore}}
        </div>
        <div>
            配送评分
        </div>
      </div>
    </div>
    <div class="comments-tag">
      <div :class="tagStyle0" @click="activeTag0">
        全部({{comments.totalCount}})
      </div>
      <div :class="tagStyle1" @click="activeTag1">
        有图评价({{comments.urlCount}})
      </div>
      <div :class="tagStyle2" @click="activeTag2">
        好评({{comments.goodCount}})
      </div>
      <div :class="tagStyle3" @click="activeTag3">
        中评({{comments.middleCount}})
      </div>
      <div :class="tagStyle4" @click="activeTag4">
        差评({{comments.badCount}})
      </div>
    </div>
    <div v-for= "(item, index) in commentItemList" :key="index" class="comment-detail">
      <comment-item :detail="item"></comment-item>
    </div>
  </div>
</template>

<script>
  import CommentItem from '@/components/CommentItem';
  import {GET_PRODUCT_COMMENT } from '@/utils/api';
  import {request} from "@/utils/request";

  export default {
    components: {
      CommentItem
    },
    data() {
      return {
        active:100,
        comments : {},
        commentItemList:{},
        originCommentItemList:{}
      }
    },
    methods: {
      getProductComment(params) {
        request(
          GET_PRODUCT_COMMENT,
          'GET',
          params
        ).then(
          (response) => {
            console.log("this.good response", response);
            this.comments = response;
            this.commentItemList = this.comments.commentItemList;
            this.originCommentItemList = this.comments.commentItemList;
          }
        )
      },

      activeTag0() {
        //全部评价
        this.active = 0;
        this.commentItemList = this.originCommentItemList;

      },
      activeTag1() {
        //有图评价
        this.active = 1;
        this.commentItemList = this.originCommentItemList.filter(i => i.picFlag === 1);
      },
      activeTag2() {
        //好评
        this.active = 2;
        this.commentItemList = this.originCommentItemList.filter(i => i.commentLevel === 1);

      },
      activeTag3() {
        //中评
        this.active = 3;
        this.commentItemList = this.originCommentItemList.filter(i => i.commentLevel === 2);
      },
      activeTag4() {
        //差评
        this.active = 4;
        this.commentItemList = this.originCommentItemList.filter(i => i.commentLevel === 3);
      }
    },
    computed: {
      tagStyle0() {
        return this.active === 0 ? "comment-active-tag-style": "comment-tag-style";
      },
      tagStyle1() {
        return this.active === 1 ? "comment-active-tag-style": "comment-tag-style";
      },
      tagStyle2() {
        return this.active === 2 ? "comment-active-tag-style": "comment-tag-style";
      },
      tagStyle3() {
        return this.active === 3 ? "comment-active-tag-style": "comment-tag-style";
      },
      tagStyle4() {
        return this.active === 4 ? "comment-active-tag-style": "comment-tag-style";
      }
    },
    onShow() {
      console.log("productID: ",this.$root.$mp.query);
      let params = this.$root.$mp.query;
      this.getProductComment(params);
    }
  }
</script>

<style lang="scss" scoped>
  .comments-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .comments-tag {
    display: flex;
    flex-flow: row wrap;
  }
  .comment-favor {
    display: flex;
    align-items: center;
  }
  .comment-pack {
    display: flex;
    align-items: center;
  }
  .comment-tag-style {
    font-family: "Microsoft YaHei";
    font-size: 14px;
    height: 25px;
    border-radius: 15px;
    border: 1px solid #CFD4DA;
    text-align: center;
    line-height: 25px;
    padding: 0px 5px;
    margin: 5px 5px;
  }
  .comment-active-tag-style {
    font-family: "Microsoft YaHei";
    font-size: 14px;
    height: 25px;
    border-radius: 15px;
    background-color: #ffc95f;
    border: 1px solid #F39B00;
    color: #F39B00;
    text-align: center;
    line-height: 25px;
    padding: 0px 5px;
    margin: 5px 5px;
  }

</style>

<style lang="scss">

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
