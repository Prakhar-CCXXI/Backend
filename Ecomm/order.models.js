import mongoose from "mongoose"


const orderItemsSchema = mongoose.Schema({
  productId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product" 
  },
  quatity : {
    type : Number ,
    required : true 
  }
})

const orderSchema = new mongoose.Schema({
  orderPrice :{
    type : String,
    required : true
  },
  customer :{
    type : mongoose.Schema.Types.ObjectId ,
    ref : "User"
  },
  orderItems:{
    type : [orderItemsSchema]
  },
  address:{
    type : String,
    required : true
  },
  status:{
    type: String ,
    enum : ["PENDING","CANCELLED","DELIVERED"],
    default : "PENDING"
  }
},{timestamps:true}) ;

export const Order = mongoose.model('Order', orderSchema)