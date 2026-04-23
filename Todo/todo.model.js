import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
  content:{
    type : String,
    required : true ,
  },
  createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref :"User" ,
  },
  // Taking a refrence of 'User' schema 
  subtodo : [
      {
      type : mongoose.Schema.Type.ObjectId,
      ref : "User"
    } //Array of SubTodos
  ]
},{timestamps:true}) ;

export const Todo = mongoose.model('Todo', todoSchema)