/**
 * 链接解析
 * mongodb协议
 * xxx.xxx.xxx.xxx host   ip或者域名
 * :27017 db端口 27017为mongodb默认端口
 * /blog 指定库名
 */
export default {
  DB_URL: 'mongodb://xxx.xxx.xxx.xxx:27017/blog',
  authSource: 'admin', // auth校验库
  auth: {
    user: 'root', //用户名
    password: 'xxxxxxx', // 密码
  },
}