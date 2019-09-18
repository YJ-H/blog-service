import { Context } from "koa";
import { ArticleModel } from "./../../models/article.model";
import { JsonController, Ctx, Get, Param, Put, Body, HttpError, OnUndefined, BadRequestError } from "routing-controllers"
import Tips from "../../utils/tip"
import { IsInt, IsString, validate } from "class-validator";

interface ArticleBody {
  _id: string
  html: string
  markdown: string
  title: string
}

class validateArticle {
  @IsString()
  html: string;

  @IsString()
  markdown: string;

  @IsString()
  title: string;
}

@JsonController('/article')
export default class{
  @Get('/articleById/:id')
  async router (
    @Ctx() ctx: Context,
    @Param('id') id: string
  ) {
    try {
      if (!id) return Tips[1007]
      let res: ArticleBody = <ArticleBody>(await ArticleModel.findById(id).populate('user').lean(true))
      if (res) {
        // res._id = res.toString()
        return {...Tips[0],data: { ...JSON.parse(JSON.stringify(res)) } }
      } else {
        return Tips[1003]
      }
    } catch (error) {
      console.log(error)
      return Tips[1002]
    }
    
  }

  @Get('/articleList')
  async allRouter (
    @Ctx() ctx: Context,
  ) {
    try {
      let res: ArticleBody[] = <ArticleBody[]>(await ArticleModel.find({}, { html: 0, markdown:0 }).populate('user', 'name uid').lean(true))
      if (!res) Tips[1003]
      return {
        ...Tips[0],
        data: JSON.parse(JSON.stringify(res))
      }
    } catch (error) {
      console.log(error)
      return Tips[1002]
    }
  }

  @Get("/findArticleByCreateId")
  async findArticleByCreateIdRouter (
    @Ctx() ctx: Context
  ) {
    try {
      let { uid } = ctx.state
      let res: ArticleBody = <ArticleBody>(await ArticleModel.find({create_user_id: uid}).lean(true))
      if (!res) Tips[1003]
      return {
        ...Tips[0],
        data: JSON.parse(JSON.stringify(res))
      }
    } catch (error) {
      console.log(error)
      return Tips[1002]
    }
  }
  
  @Put('/addArticle')
  @OnUndefined(500)
  async addArticleRouter (
    @Ctx() ctx: Context,
    @Body({required: true}) article: validateArticle
  ) {
    try {
      let isSave = await new ArticleModel({
        ...article,
        create_user_id: ctx.state.uid,
        user: ctx.state._id
      }).save()
      if (isSave.errors) return Tips[1003]
      return {...Tips[0]}
    } catch (error) {
      console.log(error)
    }
    
  }
    
}