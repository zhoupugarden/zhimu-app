import * as types from './mutation-types'

// 进行涉及到多个全局变量的复杂计算

// export const setOpenId = ({ commit }, { id }) => {
//     commit(types.OPEN_ID, id)
// }
export default {
    setOpenId: ({ commit }, { id }) => commit(openId, id),

    addProductToCart:({state, commit}, data)=> {
      console.log(data);
      let cartItem = {};
      if (data.skuId) {
        cartItem = state.cartList.find(item => {
          //
          return item.skuId === data.skuId
          console.log("addProductToCart", item.skuId , data.skuId)
        })
      } else {
        cartItem = state.cartList.find(item => {
          //
          return item.productId === data.productId
          console.log("addProductToCart", item.productId , data.productId)
        })
      }
      console.log(cartItem);
      if (!cartItem) {
        commit(types.ADD_PRODUCT_TO_CART, data)
      }else {
        commit(types.INCREMENT_INVENTORY, data)
      }
    },
    addFreeCart:({state, commit}, data) => {
      commit(types.ADD_FREE_TO_CART, data)
    },

    decrementInventory: ({commit}, data) => {
      commit(types.DECREMENT_INVENTORY, data)
    },

    incrementInventory: ({commit}, data) => {
      commit(types.INCREMENT_INVENTORY, data)
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
    storeUserId: ({commit}, userId) => {
      commit(types.USER_ID, userId)
    },
    storeIsVip: ({commit}, level) => {
    commit(types.IS_VIP, level)
  },
    checkoutCartList: ({commit}) => {
      commit(types.CHECK_OUT_CART)
    },
  checkoutFreeCartList: ({commit}) => {
    commit(types.CHECK_OUT_FREE_CART)
  },

  addMerchantInfo:({state, commit}, data) => {
    commit(types.ADD_MERCHANT_INFO, data)
  },

  addDeliverConfig:({state, commit}, data) => {
    commit(types.ADD_DELIVER_CONFIG, data)
  },

  addAdSettings:({state, commit}, data) => {
    commit(types.ADD_AD_SETTINGS, data)
  },

  addCurrentLocation: ({state, commit}, data) => {
      commit(types.ADD_CURRENT_LOCATION, data)
  }

}
