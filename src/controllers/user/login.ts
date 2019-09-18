import { Context } from 'koa'
import md5 from "md5"
import Utils from "../../utils"
import Tips from "../../utils/tip"
import db from "../../db"
import { UserModel } from "../../models/user.model"

import {
  Post,
  JsonController,
  Ctx,
  Body,
} from 'routing-controllers'

interface LoginBody {
  name: string
  password: string | number[]
}

@JsonController()
export default class {
  @Post('/oa/user/login')
  async router(
    @Ctx() ctx: Context,
    @Body() body: LoginBody,
  ) {
      let { name, password } = body
      let passwordMd5 = [name, md5(password)]
      let res = await UserModel.findOne(
        { name: name, password:passwordMd5 },
        { password: 0 }
        ).lean()
      console.log(res)
      if (res) {
        let uid = res['uid']
        let _id = res['_id']
        let token = Utils.generateToken({ uid, _id })
        return {
          ...Tips[0], data: { token }
        }
      } else {
        return Tips[1006]
      }
  }
}