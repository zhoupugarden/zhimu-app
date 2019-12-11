<template>
  <div class="comments-container">
    <div class="comments-header">
      <div class="comment-overall">
        <div style="font-size: 30px; color: gold;">
          {{comments.totalScore}}
        </div>
        <div style="font-size: 12px;">
          综合评价
        </div>
      </div>
      <div class="comment-detail-rate">
        <div class="comment-favor">
          <div style="font-size: 12px;">
            口味
          </div>
          <van-rate size="10"
                    allow-half
                    void-color="#eee"
                    void-icon="star"
                    :value="comments.tasteScore"></van-rate>
          <div style="color: gold;padding: 0px 10px;">
            {{comments.tasteScore}}
          </div>
        </div>
        <div class="comment-pack">
          <div style="font-size: 12px;">
            包装
          </div>
          <van-rate size="10"
                    allow-half
                    void-color="#eee"
                    void-icon="star"
                    :value="comments.packageScore"></van-rate>
          <div style="color: gold;padding: 0px 10px;">
            {{comments.packageScore}}
          </div>
        </div>
      </div>
      <div class="comment-delivery-rate">
        <div style="color: #b2b2b2; font-size: 20px;">
          {{comments.deliverScore}}
        </div>
        <div style="font-size: 12px; color: #b2b2b2">
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
    <van-toast  id="van-toast"/>
  </div>
</template>

<script>
  import CommentItem from '@/components/CommentItem';
  import {GET_PRODUCT_COMMENT, GET_PRODUCT_COMMENT_LIST } from '@/utils/api';
  import {request} from "@/utils/request";
  import {toast} from '../../utils/toast';
  export default {
    components: {
      CommentItem
    },
    data() {
      return {
        active:100,
        comments : {},
        commentItemList:[],
        productId:null,
        picFlag: null,
        pageSize:10,
        pageNum:1,
        totalPage:1,
        level:null
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
          }
        )
      },
      getProductCommentList(data) {
        request(
          GET_PRODUCT_COMMENT_LIST,
          'GET',
          data
        ).then(
          (response) => {
            console.log("this.good response", response);
            this.commentItemList = response.list;
            this.totalPage = response.totalPage;
          }
        )
      },

      getProductCommentListAdd(data) {
        request(
          GET_PRODUCT_COMMENT_LIST,
          'GET',
          data
        ).then(
          (response) => {
            console.log("this.good response", response);
            let tmplist = response.list;
            this.commentItemList = this.commentItemList.concat(tmplist);
          }
        )
      },

      activeTag0() {
        //全部评价
        this.active = 0;
        this.level = null;
        this.picFlag = null;
        this.pageSize = 10;
        this.pageNum = 1;
        let params = {};
        params.productId = this.productId;
        params.pageSize = this.pageSize;
        params.pageNum = this.pageNum;

        this.getProductCommentList(params);
      },
      activeTag1() {
        //有图评价
        this.active = 1;
        this.level = null;
        this.picFlag = 1;
        let params = {};
        params.picFlag = this.picFlag;
        params.productId = this.productId;
        params.pageSize = this.pageSize;
        params.pageNum = this.pageNum;
        this.getProductCommentList(params);

      },
      activeTag2() {
        //好评
        this.active = 2;
        this.level = 1;
        this.picFlag = null;
        let params = {};
        params.level = this.level;
        params.productId = this.productId;
        params.pageSize = this.pageSize;
        params.pageNum = this.pageNum;
        this.getProductCommentList(params);
      },
      activeTag3() {
        //中评
        this.active = 3;
        this.level = 2;
        this.picFlag = null;
        let params = {};
        params.level = this.level;
        params.productId = this.productId;
        params.pageSize = this.pageSize;
        params.pageNum = this.pageNum;
        this.getProductCommentList(params);
      },
      activeTag4() {
        //差评
        this.active = 4;
        this.level = 3;
        this.picFlag = null;
        let params = {};
        params.level = this.level;
        params.productId = this.productId;
        params.pageSize = this.pageSize;
        params.pageNum = this.pageNum;
        this.getProductCommentList(params);
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
    onReachBottom() {
      //要做个判断， 如果size已经小于10， 则不再分页查询
      console.log("到达底部");

      if (this.pageNum === this.totalPage) {
        console.log("this.pageNum, this.totalPage", this.pageNum, this.totalPage);

        toast("没有更多评论");
        return;
      }

      let params = {};
      params.productId = this.productId;
      params.pageSize = this.pageSize;
      params.pageNum = this.pageNum + 1;
      this.pageNum = this.pageNum + 1;
      if (null !== this.level) {
        params.level = this.level;
      }
      if (null !== this.level) {
        params.picFlag = this.picFlag;
      }
      this.getProductCommentListAdd(params);
    },

    onLoad() {
      console.log("productID: ",this.$root.$mp.query);
      let params = this.$root.$mp.query;
      this.productId = params.productId;
      this.getProductComment(params);
      this.getProductCommentList(params);
    }
  }
</script>

<style lang="scss" scoped>
  .comments-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #b2b2b2;
    background-color: white;
    padding: 10px 0px;
  }
  .comments-tag {
    display: flex;
    flex-flow: row wrap;
    padding: 10px 0px;
    background-color: white;
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
    font-size: 12px;
    height: 25px;
    border-radius: 15px;
    border: 1px solid #CFD4DA;
    text-align: center;
    line-height: 25px;
    padding: 1px 10px;
    margin: 5px 5px;
  }
  .comment-active-tag-style {
    font-family: "Microsoft YaHei";
    font-size: 12px;
    height: 25px;
    border-radius: 15px;
    background-color: #f2f2f2;
    border: 1px solid #F39B00;
    color: #F39B00;
    text-align: center;
    line-height: 25px;
    padding: 1px 10px;
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
