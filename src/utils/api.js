// 后端接口基础路径
// export const BASE_API_URL = 'https://api.zimcake.com/zm-mini-0.0.1-SNAPSHOT';
export const BASE_API_URL = 'http://localhost:8080';
// export const BASE_API_URL = 'http://47.101.175.89:8080/zm-mini-0.0.1-SNAPSHOT';

// 获取充值配置信息
export const GET_CHARGE_CONFIG_INFO = BASE_API_URL + '/product/getChargeSkuDto';

// 根据商品id获得商品详情
export const GET_PRODUCT_DETAIL_BY_ID = BASE_API_URL + '/product/listDetailById';

// 根据商品id获得商品SKU详情
export const GET_PRODUCT_SKU_DETAIL_BY_ID = BASE_API_URL + '/product/listSKUDetailByProductId';
// 获取所有热销推荐产品信息
export const GET_HOT_PRODUCTS_INFO = BASE_API_URL + '/market/hotProduct/list';

export const INDEX_LIST = BASE_API_URL + '/index/list';

export const INDEX_INFO = BASE_API_URL + '/index/info';

export const SMS_VERIFY_CODE_SEND = BASE_API_URL + '/sms/verifyCode/send';

export const SMS_VERIFY_CODE_VERIFY = BASE_API_URL + '/sms/verifyCode/verify';

export const MY_PHONE_LOGIN = BASE_API_URL + '/my/phoneLogin';

export const WX_LOGIN = BASE_API_URL + '/wx/login';

export const MY_USER_INFO = BASE_API_URL + '/my/userInfo';

export const GET_COUPON_BY_USER_ID = BASE_API_URL + '/coupon/list';

export const GET_BALANCE_DETAIL = BASE_API_URL + '/balance/list';

export const GET_POINT_DETAIL = BASE_API_URL + '/point/list';

export const ADD_NEW_ADDRESS = BASE_API_URL + '/address/add';

export const GET_USER_ADDRESS = BASE_API_URL + '/address/list';

export const DEL_USER_ADDRESS = BASE_API_URL + '/address/delete';

export const GET_OSS_CONFIG = BASE_API_URL + '/aliyun/oss/policy';

export const UPDATE_USER_WX_INFO = BASE_API_URL + '/my/userInfo/updateWx';

export const UPDATE_USER_INFO = BASE_API_URL + '/my/userInfo/update';

export const PRE_USE_COUPON = BASE_API_URL + '/coupon/preuse';

export const CHARGE = BASE_API_URL + '/charge/add';

export const ORDER_SUBMIT = BASE_API_URL + '/order/submit';

export const GET_ORDER_LIST = BASE_API_URL + '/order/list';

export const GET_ORDER_DETAIL = BASE_API_URL + '/order/detail';

export const GET_ORDER_LOG = BASE_API_URL + '/order/log/list';

export const GET_STAR_COMMENT = BASE_API_URL + '/comment/product/star';

export const CANCEL_ORDER = BASE_API_URL + '/order/cancel';

export const PAY_ORDER = BASE_API_URL + '/order/pay';

export const GET_PRODUCT_COMMENT = BASE_API_URL + '/comment/product/dashboard';

export const GET_PRODUCT_COMMENT_LIST = BASE_API_URL + '/comment/product/list';

export const SUBMIT_ORDER_COMMENT = BASE_API_URL + '/comment/add';

export const  GET_COMMENT_ORDER_INFO = BASE_API_URL + '/order/comment/info';

export const  MOCK_WX_PAY = BASE_API_URL + '/wx/pay/callback';

export const  GET_ADDRESS_BY_ID = BASE_API_URL + '/address/listByAddressId';

export const  UPDATE_USER_ADDRESS = BASE_API_URL + '/address/update';

export const  PAY_FITTING_LIST = BASE_API_URL + '/product/PayFitting/list';

export const  ADD_SIGN = BASE_API_URL + '/sign/add';

export const  BOUNTY_REDEEM = BASE_API_URL + '/sign/redeem';

export const  SIGN_INDEX = BASE_API_URL + '/sign/index';

export const  SIGN_DETAIL = BASE_API_URL + '/sign/detail';

export const  POINT_REDEEM = BASE_API_URL + '/point/redeem';

export const  SUBMIT_PROBLEM = BASE_API_URL + '/problem/submit';

export const  PRODUCT_NOTICE = BASE_API_URL + '/notice/add';

export const  GET_POINT_MALL = BASE_API_URL + '/pointmall/list';

export const  GET_POINT_MALL_DETAIL = BASE_API_URL + '/pointmall/detail';

export const  GET_BOUNTY_REDEEM_LIST = BASE_API_URL + '/sign/redeem/list';

export const  GET_FITTING_LIST = BASE_API_URL + '/fitting/list';

export const  ORDER_PRESUBMIT = BASE_API_URL + '/order/presubmit';

export const  CART_PRODUCT_CHECK = BASE_API_URL + '/cart/addCartCheck';








