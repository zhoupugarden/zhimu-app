import * as types from './mutation-types'

//调用检查商品库存数量的后台接口，然后更新
// import shop from '../../api/shop'


const mutations = {
    // [方法名](参数1,参数2...){方法}
    [types.ADD_PRODUCT_TO_CART](state, cartItem) {
      console.log(cartItem)
      cartItem.quantity = 1;
      state.cartList.push(
        cartItem
      );
    },
    [types.ADD_FREE_TO_CART](state, freeCartItem) {
      console.log("freeCartItem", freeCartItem);
      let isExist = false;
      state.freeList.forEach(
        item => {
          if (item.fittingId === freeCartItem.fittingId) {
            console.log("免费产品已经存在");
            isExist = true;
          }
        }
      );
      if (!isExist) {
        state.freeList.push(
          freeCartItem
        )
      } else {
        return;
      }
    },

    [types.DECREMENT_INVENTORY](state, data) {
      let cartItem = {};
      if (data.skuId) {
        cartItem = state.cartList.find(item => item.skuId === data.skuId);
      } else {
        cartItem = state.cartList.find(item => item.productId === data.productId);
      }
      cartItem.quantity--;
      console.log("DECREMENT_INVENTORY", state.cartList, state.cartList.length)
    },
    [types.INCREMENT_INVENTORY](state, data) {
      let cartItem = {};
      if (data.skuId) {
        cartItem = state.cartList.find(item => item.skuId === data.skuId);
      } else {
        cartItem = state.cartList.find(item => item.productId === data.productId);
      }
      cartItem.quantity++;
      console.log("INCREMENT_INVENTORY", state.cartList, state.cartList.length)
    },
    [types.DEL_PRODUCT_FROM_CART](state, {skuId}) {
      let index = state.cartList.findIndex( item => item.skuId === skuId)
      console.log("index", index);
      state.cartList.splice(index, 1);
      console.log("DEL_PRODUCT_FROM_CART", state.cartList, state.cartList.length);

      if (!state.cartList.find(item=>item.type===1))  {
        state.freeList = []
      }
    },
  [types.DEL_FREE_FROM_CART](state, {productName}) {
    let index = state.freeList.findIndex( item => item.productName === productName)
    console.log("index", index);
    state.freeList.splice(index, 1);
  },
  [types.UPDATE_FREE_FROM_CART](state, data) {
    let freeItem = state.freeList.find( item => item.productName === data.productName)
    console.log("freeItem", freeItem);
    freeItem.value = data.value;
  },

  [types.CHECK_OUT_CART](state) {
      state.cartList = []
    },
  [types.CHECK_OUT_FREE_CART](state) {
    state.freeList = []
  },


  [types.TOKEN](state, token) {
      state.token = token;
    },
    [types.LOG_OUT](state) {
      state.token = '';
      state.userId = '';
    },

    [types.USER_ID](state, userId) {
      state.userId = userId;
    },
  [types.IS_VIP](state, level) {
    state.isVip = level;
  },

  [types.ADD_MERCHANT_INFO](state, info) {
      state.merchantInfo = info;
  },

  [types.ADD_DELIVER_CONFIG](state, config) {
    state.deliverConfig = config;
  },

  [types.ADD_AD_SETTINGS](state, settings) {
    state.adSettings = settings;
  }

}
export default mutations;
