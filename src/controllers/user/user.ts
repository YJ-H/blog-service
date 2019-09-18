import { Context } from "koa"
import { Get, JsonController, Ctx } from "routing-controllers"
import Tips from "../../utils/tip"
import {UserModel} from "../../models/user.model";

@JsonController()
export default class {
  @Get('/user/auth')
  async router(
    @Ctx() ctx:any
  ) {
    try {
      let uid = ctx.state.uid
       let res = await UserModel.findOne({uid: uid},{name:1,uid:1,_id:0}).lean()
       if (res) {
        return { ...Tips[0], data: res }
       } else {
        return {
          code: 10001,
          message:  '用户不存在'
        }
       }
    } catch (error) {
      console.log(error)
      return Tips[1002]
    }
  }
}