<template>
  <div>
    <selfselect
    :items="categoryInfo"
    ></selfselect>
  </div>

</template>

<script>
  import  selfselect from '@/components/selfselect';

  import {GET_PRODUCT_CATEGORY_URL, GET_PRODUCT_BY_CATEGORY_ID} from '@/utils/api';
  import {request} from "@/utils/request";


  export default{

    components: {
      selfselect
    },
    data() {
      return {
        categoryInfo: [
        ]
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
      }
    },

    created() {
      this.getProductCategory();
      console.log("getProductCategory: ", this.categoryInfo);
    }


    }

</script>

<style scoped>

</style>
