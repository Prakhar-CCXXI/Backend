import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

  username : {
      type : String,
      required : true
    },
  email : String ,
  isActive : Boolean ,
},{timestamps : true}) ;

export const User = mongoose.model('User', userSchema)