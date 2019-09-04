<template>
  <div class="comments-container">
    <comment-item></comment-item>
  </div>
</template>

<script>
  import CommentItem from '@/components/CommentItem';
  export default {
    components: {
      CommentItem
    },
    data() {
      return {
        balanceRecords: {
          total: 798
        }
      }
    },
    methods: {

    }

  }
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">

</style>

<style lang="wxss">
  page{
    height: 100%;
    background-color:#F4F4F4 !important;
  }
</style>
