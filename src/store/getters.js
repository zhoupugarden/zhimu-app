import {categoryTypeEnum} from '@/utils/enums';

// 用gettter取数据到组件里,是数据的映射

// // getter可充当计算属性
// export const currentSong = (state) => {
//     return state.playlist[state.currentIndex] || {}
// }
export default {
    openId: state => state.openId,
    cartList: state => state.cartList,

    cartFittingList: state => state.cartList.filter(a => a.type === categoryTypeEnum.FITTING.value),
    cartProductList: state => state.cartList.filter(a => a.type !== categoryTypeEnum.FITTING.value),

    token:state => state.token,
    currentLocation:state => state.currentLocation,
    isLogin: state => state.isLogin,
    isVip: state => state.isVip,
    cartTotalCount: state => {
      return state.cartList.reduce(
        (count, item) => {
          return count + item.quantity
        }, 0
      )
    },

  cartProductListName: state => {
      let listName = [];
   for (let i = 0; i< state.cartList.length; i++) {
     listName.push(state.cartList[i].productName)
   }
      return listName.join('、');
  },
    cartTotalPrice: state => {
      if (state.cartList.length === 0) {
        return 0
      } else {
        let totalPrice = state.cartList.reduce(
          (total, cartListItem) => {
            return total + cartListItem.salePrice * cartListItem.quantity
          }, 0
        );
        console.log("cartTotalPrice ", totalPrice);
        return totalPrice;
      }
    },
    productCartList: state => state.cartList.filter(
      item => item.type != 2
    ),
    freeCartList: state => state.freeList,
    isExistCake: state => {
      let cakeList = state.cartList.find(
        item => item.type === 1
      );
      if (cakeList === undefined ||cakeList.length === 0) {
        return false;
      }else {
        return true;
      }
    }
}
