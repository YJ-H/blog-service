import 'reflect-metadata'
import './copy-static-assets'
import Koa from 'koa'
import { useKoaServer, createKoaServer } from 'routing-controllers'
import { AuthorizationChecker } from "./middlewares/authorizationChecker";
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')
const log = global.console.log.bind(console);
const Tips = require('./utils/tip')
const PORT = process.env.PORT || 3300

const app = createKoaServer({
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
  middlewares: [AuthorizationChecker],
})
app.use(bodyParser())
// compressor
app.use(compress({
  filter: (contentType:any) => /text|javascript/i.test(contentType),
  threshold: 2048
}))
console.log(app)
// http.createServer(app.callback()).listen(PORT)
app.listen(PORT, () => console.log(`Server run as http://127.0.0.1:${PORT}`))


log('server is running on port: %s', PORT)
