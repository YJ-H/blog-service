const Tips = require('./tip')
const IS = require('is')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
let util = {
  // formatData 必须为 {key,type}的格式,可以不传type
  formatData (params: any, valids: any) {
    let res = true
    if (!IS.object(params)) return false
    if (!IS.array(valids)) return false
    for (let i = 0; i < valids.length; i++) {
      let e = valids[i]
      let { key, type } = e
      if (!key) {
        res = false
        break
      }
      let value = params[key] || ''
      if (type === 'not_empty') {
        if (IS.empty(value)) {
          res = false
          break
        }
      } else if (type === 'number') {
        value = Number(value)
        if (!IS.number(value) || IS.nan(value)) {
          res = false
          break
        }
      } else if (type === 'reg') {
        let reg = e['reg']
        if (!reg || !reg.test(value)) {
          res = false
          break
        }
      } else {
        if (!IS[type](value)) {
          res = false
          break
        }
      }
    }
    return res
  },
  // 生成token
  generateToken (data: object) {
    let created = Math.floor(Date.now() / 1000)
    console.log(path.join(__dirname, '../config/pri.pem'))
    let cert = fs.readFileSync(path.join(__dirname, '../public/pri.pem'))
    let token = jwt.sign({
      data,
      exp: created + 3600 * 24
    }, cert, { algorithm: 'RS256' })
    return token
  },
  // 解析token
  verifyToken (token:string) {
    let cert = fs.readFileSync(path.join(__dirname, '../public/pub.pem'))
    let res: {uid: number, any?: any}
    try {
      let result = jwt.verify(token, cert, { algorithms: ['RS256'] }) || {}
      let { exp = 0 } = result
      let current = Math.floor(Date.now() / 1000)
      if (current <= exp) {
        res = result.data || {}
      }
    } catch (e) {
      return e
    }
    return res
  },
  filter (params: any, filterArr:any) {
    if (IS.object(params) && IS.array(filterArr)) {
      let data: {[key:string]:any}
      filterArr.forEach((e:string) => {
        let val = params[e]
        if (!IS.undefined(val) && !IS.null(val) && !IS.empty(val) || IS.array.empty(val)) {
          data[e] = val
        }
      })
      return data
    } else {
      return params
    }
  }
}

export default util