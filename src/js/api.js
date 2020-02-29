
//开发 后端自己服务器 （内网）
//开发 测试服务器 （外网，内网）
//上线  正式服务器 （外网）


let host = 'http://jx.xuzhixiang.top'

//注册接口
let regApi = host+'/ap/api/reg.php'


//登录接口
let loginApi =host+'/ap/api/login.php'

// 添加商品 接口
//      接口地址：  http://jx.xuzhixiang.top/ap/api/goods/goods-add.php
// 	 
let productAddApi =host+'/ap/api/goods/goods-add.php'


// 所有商品接口
// get
// 参数
// pagesize  每页获取几个数据
// pagenum 获取第几页数据  第0页
// uid  用户id
// http://jx.xuzhixiang.top/ap/api/allproductlist.php?pagesize=20&pagenum=4

let productListApi =host+'/ap/api/allproductlist.php'


// 删除商品 接口   new
//      接口地址：    http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php
//      接口请求方式：get
//      接口参数：
//             pid（必选）商品的id
//             uid（必选）用户的id
let productDeleteApi =host+'/ap/api/goods/goods-delete.php'

// 
// .修改商品 接口
//      接口地址：    http://jx.xuzhixiang.top/ap/api/goods/goods-update.php
//      接口请求方式：get
//      接口参数：
//             pid（必选）商品的id
// pname（必选）商品
// pprice（必选）商品
// pdesc（必选）商品

let productEditApi =host+'/ap/api/goods/goods-update.php'



// 根据商品id获取商品详情接口
//      接口地址：http://jx.xuzhixiang.top/ap/api/detail.php
//      接口请求方式：get
//      接口参数：
//           id  商品的id
let productDetailApi =host+'/ap/api/detail.php'



// 
// 给用户购物车中添加商品 接口
// 
//      接口地址：http://jx.xuzhixiang.top/ap/api/add-product.php
//      接口请求方式：get
//      接口参数：
//           uid  用户id
//           pid  商品id
//           pnum  要添加的商品数量

let cartAddApi =host+'/ap/api/add-product.php'



// 查询用户购物车中的商品 接口
// 
//  接口地址：http://jx.xuzhixiang.top/ap/api/cart-list.php
//  接口请求方式：get
//  接口参数：
//       id  用户id
let cartListApi =host+'/ap/api/cart-list.php'


// 删除用户购物车中的商品 接口
// 
//  接口地址：http://jx.xuzhixiang.top/ap/api/cart-delete.php
//  接口请求方式：get
//  接口参数：
//       uid  用户id
//       pid  商品id
// 
//  使用方式
//       删除用户1中的 id为1商品
//       http://jx.xuzhixiang.top/ap/api/cart-delete.php?uid=1&pid=1
// 
//  服务器返回json数据
let cartDeleteApi =host+'/ap/api/cart-delete.php'


// 更新购物车中商品数量 接口
// 
//   接口地址：http://jx.xuzhixiang.top/ap/api/cart-update-num.php
//   接口请求方式：get
//   接口参数：
//        uid  用户id
//        pid  商品id
//        pnum  更新商品数量
let cartUpdateApi =host+'/ap/api/cart-update-num.php'

