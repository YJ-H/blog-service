import {Document, Schema, Model, model} from "mongoose";
import mongoose from "../db/mongodb"

interface Iarticle extends Document {
  html?: string;
  markdown?: string | number;
  create_user_id: number;
}

const ArticleSchema: Schema = new Schema({          
  title : { type: String, required: true },     
  html : { type: String, required: true },     
  markdown: {type: String || Number, required: true},
  create_user_id: {type: Number, required: true},
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
},
{
  timestamps: {
      createdAt: 'created',
      updatedAt: 'updated'
  }
});
export const ArticleModel: Model<Iarticle> = mongoose.model<Iarticle>("article", ArticleSchema);
