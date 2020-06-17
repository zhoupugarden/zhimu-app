export let orderStatusEnum = {
  INIT: {
    value : 1,
    desc :"待支付"
  },
  has_pay: {
    value : 2,
    desc :"已支付"
  },
  accepted: {
    value : 3,
    desc :"已接单"
  },
  make_done: {
    value : 4,
    desc :"制作完成"
  },
  deliverd: {
    value : 5,
    desc :"已配送"
  },
  self_deliverd: {
    value : 6,
    desc :"已自提"
  },
  have_signed: {
    value : 7,
    desc :"已收货"
  },
  cancelled: {
    value : 99,
    desc :"订单取消"
  },
  closed: {
    value : 100,
    desc :"订单完成"
  },
  closed_auto: {
    value : 101,
    desc :"订单关闭"
  },
  refunding: {
    value : 201,
    desc :"退款中"
  },
  refund: {
    value : 202,
    desc :"退款完成"
  }
};


export let deliverTypeEnum = {
  merchant_deliver: {
    value : 1,
    desc :"商家配送"
  },
  self_deliver: {
    value : 99,
    desc :"自提"
  },
};

export let pointChangeSourceEnum = {
  REGISTER: {
    value: 1,
    desc:"注册赠送"
  },
  CONSUM: {
    value: 2,
    desc:"订单消费"
  },
  COMMENT: {
    value: 3,
    desc:"点评订单"
  },
  POINT_REDEEM: {
    value: 4,
    desc:"积分兑换"
  },
  CONSUM_CANCEL: {
    value: 5,
    desc:"交易取消"
  },
  COMMENT_PIC: {
    value: 6,
    desc:"有图评论订单"
  },
  VIP_CONSUM: {
    value: 7,
    desc:"VIP消费订单"
  },
  REFUND: {
    value: 8,
    desc:"交易退款"
  },
  STAR_COMMENT: {
    value: 9,
    desc:"优质点评"
  },
  CUSTOMER_GIVE: {
    value: 10,
    desc:"人工赠送"
  },
  BIRTH_UPDATE: {
    value: 11,
    desc:"生日更新"
  }
};

export let balanceChangeSourceEnum = {
  CHARGE: {
    value: 1,
    desc:"余额充值"
  },
  CONSUM: {
    value: 2,
    desc:"消费"
  },
  CANCEL: {
    value: 3,
    desc:"订单取消"
  },
  REFUND: {
    value: 4,
    desc:"订单退款"
  },

};

export let pmsOnlineStatusEnum = {
  on_line: 1001,
  off_line: 1002,
  out_stock: 1003,
};

export let sweetLevelEnum = {
  no_sugar:
    {
      value:0,
      label:"无糖",
    },
  one_sugar:
    {
      value:1,
      label:"1份甜",
    },
  two_sugar:
    {
      value:2,
      label:"2份甜",
    },
  three_sugar:
    {
      value:3,
      label:"3份甜",
    },
  four_sugar:
    {
      value:4,
      label:"4份甜",
    },
  five_sugar:
    {
      value:5,
      label:"5份甜",
    }
};

export let attributeGroupEnum = {
  attr_bong: {
    value:1001,
    desc:"磅数规格"
  },
  attr_contain: {
    value:1002,
    desc:"容器规格"
  },
  attr_size: {
    value:1003,
    desc:"大小规格"
  },
  attr_heavy: {
    value:1004,
    desc:"重量规格"
  },
  attr_other: {
    value:1005,
    desc:"其他规格"
  }
};

export let deliverTimeEnum = {
  RIGHT_NOW: {
    value:1000,
    desc:"今日现货可立即配送"
  },
  EVERY_DAY: {
    value:1001,
    desc:"每日现货可立即配送"
  },
  TOMORROW: {
    value:1023,
    desc:"隔天配送"
  }
};

export let categoryTypeEnum = {
  CAKE: {
    value:1,
    desc:"蛋糕商品"
  },
  COOKIES: {
    value:2,
    desc:"点心类"
  },
  BREAD: {
    value:3,
    desc:"面包类"
  },
  DRINK: {
    value:4,
    desc:"茶饮类"
  },
  FITTING: {
    value:5,
    desc:"付费配件类"
  },
  virtual: {
    value:6,
    desc:"充值商品"
  },
};

export let CouponRuleTypeEnum = {
  full_reduction: 1,
  dis_count: 2,
  free_freight: 3,
  off_line: 4,
  redeem: 5,
  promote_pound: 6,
  promote_cup: 7,
  one_by_one: 8,
  sec_by_half: 9
};

export let problemTypeEnum = {
  deliver_p: {
    value:1,
    desc:"配送问题"
  },
  custom_p: {
    value:2,
    desc:"客服问题"
  },
  product_p: {
    value:3,
    desc:"产品问题"
  },
  info_p: {
    value:4,
    desc:"信息问题"
  },
};

export let CouponGiveTypeEnum = {
  register: {
    value:1,
    desc:"注册赠送"
  },
  buy_vip: {
    value:2,
    desc:"会员卡购买"
  },
  every_month: {
    value:3,
    desc:"每月赠送"
  },
  vip_birth: {
    value:4,
    desc:"会员生日"
  }
};

export let CouponSourceEnum = {
  REGISTER: {
    value:1,
    desc:"新用户专享"
  },
  REDEEM: {
    value:2,
    desc:"积分兑换"
  },
  MANUAL: {
    value:3,
    desc:"人工赠送"
  },
  RECHARGE: {
    value:4,
    desc:"VIP专享"
  },
  EVERY_MONTH: {
    value:5,
    desc:"VIP每月专享"
  },
  BOUNTY_REDEEM: {
    value:6,
    desc:"奖励金兑换"
  },
  BIRTH_DAY: {
    value:7,
    desc:"VIP生日专享"
  }
};

export let couponStatusEnum = {
  valid: {
    value:1,
    desc:"有效"
  },
  expired: {
    value:2,
    desc:"过期"
  },
  used: {
    value:3,
    desc:"已使用"
  },
  pending: {
    value:4,
    desc:"待生效"
  },
  invalid: {
    value:5,
    desc:"作废"
  }
};

export let ReceiptItemsEnum = {
  merchant_name: {
    value:1001,
    desc:"商家名称"
  },
  contact_no: {
    value:1002,
    desc:"联系电话"
  },
  merchant_address: {
    value:1003,
    desc:"商家地址"
  },
  wx_name: {
    value:1004,
    desc:"公众号名称"
  },
  wx_qr: {
    value:1005,
    desc:"公众号二维码"
  },
  notice_content: {
    value:1006,
    desc:"提醒内容"
  },
  slogan: {
    value:1007,
    desc:"口号"
  },
  merchant_logo: {
    value:1008,
    desc:"商家logo"
  }
};

export let freeFittingEnum = {
  birth_hat: {
    value:1001,
    desc:"生日帽"
  },
  num_candle: {
    value:1002,
    desc:"数字蜡烛"
  },
  heart_candle: {
    value:1003,
    desc:"心形蜡烛"
  },
  cutlery: {
    value:1004,
    desc:"餐具"
  },
  fire: {
    value:1005,
    desc:"火柴"
  },
  Chocolate: {
    value:1006,
    desc:"巧克力牌"
  }
};

export let merchantStatusEnum = {
  ready_open: 1001,
  opening: 1002,
  closing: 1003,
  resting: 1004,
  pre_open: 1005
};

export let pageUrlEnum = {
  home_url: "pages/home/main",
  order_url: "pages/order/main",
  cart_url: "pages/cart/main",
  my_url: "pages/my/main",
  detail_url: "pages/detail/main",
  my_setting_url: "pages/mysetting/main",
  help_url: "pages/help/main",
  my_address_url: "pages/myaddress/main",
  new_address_url: "pages/newaddress/main",
  balance_question_url: "pages/balancequestion/main",
  coupon_question_url: "pages/couponquestion/main",
  member_question_url: "pages/memberquestion/main",
  complaint_url: "pages/complaint/main",
  point_url: "pages/point/main",
  balance_url: "pages/balance/main",
  coupon_url: "pages/coupon/main",
  my_vip_url: "pages/myvip/main",
  buy_vip_url: "pages/buyvip/main",
  point_redeem_url: "pages/pointredeem/main",
  point_help_url: "pages/pointhelp/main",
  order_submit_url: "pages/ordersubmit/main",
  order_detail_url: "pages/orderdetail/main",
  mission_url: "pages/mission/main",
  login_url: "pages/login/main",
  phone_login_url: "pages/phonelogin/main",
  comment_url: "pages/comments/main",
  setting_url: "pages/setting/main",
  evaluation_url: "pages/evaluation/main",
  vip_url: "pages/vip/main",
  star_vip_url: "pages/starvip/main"
};
