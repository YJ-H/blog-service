import {Document, Schema, Model, model} from "mongoose";
import mongoose from "../db/mongodb"

interface IUser extends Document {
  name?: string;
  password?: string | number;
  uid?: number;
}
const UserSchema: Schema = new Schema({          
  name : { type: String },                    //用户账号
  password: {type: String || Number},
  uid: {type: Number}                      //密码
});
export const UserModel: Model<IUser> = mongoose.model<IUser>("user", UserSchema);
