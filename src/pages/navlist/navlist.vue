<template>
  <div>
    <selfselect
    :items="categoryAndProductBriefInfo"
    ></selfselect>
  </div>

</template>

<script>
  import  selfselect from '@/components/selfselect';

  import {GET_PRODUCT_CATEGORY_URL,GET_CATEGORY_AND_PRODUCT_BRIEF, GET_PRODUCT_BY_CATEGORY_ID} from '@/utils/api';
  import {request} from "@/utils/request";

  const defaultCategoryAndProductBriefInfo = {

  };
  export default{

    components: {
      selfselect
    },
    data() {
      return {
        categoryAndProductBriefInfo: Object.assign({}, defaultCategoryAndProductBriefInfo)
      }
    },
    methods: {
      async getProductCategory() {
        let categoryInfo = await request(
          GET_PRODUCT_CATEGORY_URL,
          'GET',
          {}
        );
        this.categoryInfo = categoryInfo;
      },
      async getCategoryAndProductBrief() {
        request(
          GET_CATEGORY_AND_PRODUCT_BRIEF,
          'GET',
          {}
        ).then(
          response => {
            this.categoryAndProductBriefInfo = response;
          }
        );
        console.log("this.categoryAndProductBriefInfo: ", this.categoryAndProductBriefInfo)

      }
    },

    created() {
      this.getCategoryAndProductBrief();
      console.log("this.categoryAndProductBriefInfo: ", this.categoryAndProductBriefInfo)
    }


    }

</script>

<style scoped>

</style>
