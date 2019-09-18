import mongoose from "mongoose";
import dbConfig from "./dbConfig";
mongoose.connect(dbConfig.DB_URL, {
  authSource: dbConfig.authSource,
  auth: dbConfig.auth
});
/**
  * 连接成功
  */
 mongoose.connection.on('connected', function () {    
  console.log('Mongoose 连接成功 => ' + dbConfig.DB_URL);  
});    

/**
* 连接异常
*/
mongoose.connection.on('error',function (err) {    
  console.log('Mongoose connection error: ' + err);  
});    

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function () {    
  console.log('Mongoose connection disconnected');  
});    

export default mongoose
