import * as types from './mutation-types'

// 进行涉及到多个全局变量的复杂计算

// export const setOpenId = ({ commit }, { id }) => {
//     commit(types.OPEN_ID, id)
// }
export default {
    addProductToCart:({state, commit}, data)=> {
      console.log("addProductToCart",data);
      let cartItem = state.cartList.find(item => {
          return item.skuId === data.skuId;
          console.log("addProductToCart", item.skuId , data.skuId)
        });
      console.log("已存在商品信息", cartItem);
      if (!cartItem) {
        let cartItem = {};
        cartItem.skuId = data.skuId;
        cartItem.productId = data.productId;
        cartItem.categoryId = data.categoryId;
        cartItem.picUrl = data.picUrl;
        cartItem.type = data.type;
        cartItem.attributeName = data.attributeName;
        cartItem.attributeValue = data.attributeValue;
        cartItem.salePrice = data.salePrice;
        cartItem.linePrice = data.linePrice;
        cartItem.productName = data.productName;
        commit(types.ADD_PRODUCT_TO_CART, cartItem)
      }else {
        commit(types.INCREMENT_INVENTORY, data.skuId)
      }
    },
    addFreeCart:({state, commit}, data) => {
      commit(types.ADD_FREE_TO_CART, data)
    },

    decrementInventory: ({commit}, data) => {
      commit(types.DECREMENT_INVENTORY, data.skuId)
    },

    incrementInventory: ({commit}, data) => {
      commit(types.INCREMENT_INVENTORY, data.skuId)
    },

    delProductFromCart:({commit}, {skuId}) => {
      commit(types.DEL_PRODUCT_FROM_CART, {skuId})
    },

    delFreeFromCart:({commit}, {productName}) => {
    commit(types.DEL_FREE_FROM_CART, {productName})
  },
    updateFreeFromCart:({commit}, data) => {
    commit(types.UPDATE_FREE_FROM_CART, data)
    },

    storeToken: ({commit}, token) => {
      commit(types.TOKEN, token)
    },
    logout: ({commit}) => {
      commit(types.LOG_OUT)
    },
    storeIsLogin: ({commit}, isLogin) => {
      commit(types.IS_LOGIN, isLogin)
    },
    storeIsVip: ({commit}, vip) => {
    commit(types.IS_VIP, vip)
  },
    checkoutCartList: ({commit}) => {
      commit(types.CHECK_OUT_CART)
    },
    checkoutFreeCartList: ({commit}) => {
    commit(types.CHECK_OUT_FREE_CART)
  },

    addCurrentLocation: ({state, commit}, data) => {
      commit(types.ADD_CURRENT_LOCATION, data)
  }

}
