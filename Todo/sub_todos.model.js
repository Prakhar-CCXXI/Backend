import mongoose, { mongo } from "mongoose"

const subTodoSchema = new mongoose.Schema({

  content : {
    type : String ,
    required : true ,
  },
  content : {
    type : Boolean,
    default : false
  },
  createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref :"User" ,
    }

},{timestamp:true}) ;

export const subtodo = mongoose.model('SubTodo',subTodoSchema)