import {INDEX_LIST, INDEX_INFO} from '@/utils/api';
import {request} from "@/utils/request";

const state = {
  categoryNameList:[],
  productList:[],
  skuList:[],
  productMenuList:[]
};

const mutations = {
  setHomeData(state, params) {
    state.categoryNameList = params.categoryNameList;
    state.productList = params.productList;
    state.skuList = params.skuList;
    state.productMenuList = params.productMenuList;
  }
};

const actions = {
//  请求获取商家的菜单数据
  async getHomeData(context, params) {
    try {
      await request(
        INDEX_LIST,
        'get'
      ).then(
       response => {
         console.log("====getHomeData=====", response);
         let categoryList = response;
         let categoryNameList = [];
         let productList = [];
         let productMenuList = [];
         let skuList = [];
         for (let category of categoryList) {
           //初始化category数据
           let categoryNameItem = {};
           categoryNameItem.name = category.name;
           categoryNameItem.id = category.id;
           categoryNameItem.hasNew = category.hasNew;
           categoryNameList.push(categoryNameItem);
           //初始化product数据
           let productOfCategory = category.pmsProductPlusList;
           productMenuList.push(productOfCategory);
           for (let product of productOfCategory) {
             let {pmsProductSkuList, ...productItem} = product;
             productList.push(productItem);
             //初始化sku数据
             let skuOfProduct = product.pmsProductSkuList;
             for(let sku of skuOfProduct) {
               skuList.push(sku);
             }
           }
         }
         context.commit('setHomeData', {categoryNameList, productList, skuList,productMenuList});
         console.log("this.productList========", productList);
         console.log("this.categoryNameList====", categoryNameList);
         console.log("this.skuList====", skuList);
       }
      )
    }catch (error) {

    }
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
