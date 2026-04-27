import mongoose from "mongoose"

const medical_recordSchema = new mongoose.Schema({},{timestamps:true}) ;

export const medical_record = mongoose.model('medical_record', medical_recordSchema)