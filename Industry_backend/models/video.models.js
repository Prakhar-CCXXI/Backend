import mongoose from "mongoose"
import mongooseAggregatorPaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new mongoose.Schema({
  
    videoFile:{
      type : String ,
      required : true ,
    },
    thumbnail:{
      type: String,
      required : true
    },
     title:{
      type: String,
      required : true
    },
     description:{
      type: String,
      required : true
    },
     duration:{
      type: Number,
      required : true
    },
    view:{
      type: Number,
      default : 0
    },
    isPublished:{
      type:Boolean,
      default : true
    },
    owner:{

    }
},{ timestamps: true }) ;


videoSchema.plugin(mongooseAggregatorPaginate)

export const Video = mongoose.model('Video', videoSchema)

