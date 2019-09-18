import { Middleware, KoaMiddlewareInterface } from "routing-controllers"
import Utils from "../utils";
import Tips from "../utils/tip";

@Middleware({type: 'before'})
export class AuthorizationChecker implements KoaMiddlewareInterface {
   use(context: any, next: (err?: any) => Promise<any>):any {
    let { url = '' } = context
    if (url.indexOf('/oa') <= -1) {
      let { loginedtoken } = context.request.header
      if (loginedtoken) {
        let result = Utils.verifyToken(loginedtoken)
        let { uid, _id } = result
        if (uid && _id) {
          context.state = { uid, _id }
          return next()
        } else {
          context.body = Tips[1005]
          return false
        }
      } else {
        context.body = Tips[1005]
        return false
      }
    } else {
      return next()
    }
  }
}