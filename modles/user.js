// <!-- import mongoose from 'mongoose'; -->
const mongoose=require('mongoose');
  const { Schema } = mongoose;

  const blogSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    phone: Number,
    email: String,
    balance:Number
  });
  module.exports=mongoose.model('User',blogSchema);