// 后端接口基础路径
export const BASE_API_URL = 'http://localhost:8080';
// 获取产品分类信息
export const GET_PRODUCT_CATEGORY_URL = BASE_API_URL + '/productCategory/listAll';
// 根据产品分类id获得所有产品信息
export const GET_PRODUCT_BY_CATEGORY_ID = BASE_API_URL + '/product/listBriefProduct';
// 根据商品id获得商品详情
export const GET_PRODUCT_DETAIL_BY_ID = BASE_API_URL + '/product/listDetailById';

// 根据商品id获得商品SKU详情
export const GET_PRODUCT_SKU_DETAIL_BY_ID = BASE_API_URL + '/product/listSKUDetailByProductId';
// 获取所有热销推荐产品信息
export const GET_HOT_PRODUCTS_INFO = BASE_API_URL + '/market/hotProduct/list';


