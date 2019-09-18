import {
  Get,
  Controller,
} from 'routing-controllers'

@Controller()
export default class {
  @Get('/')
  async router() {
    return '222'
  }
}
