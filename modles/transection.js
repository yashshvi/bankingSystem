const mongoose=require('mongoose');
  const { Schema } = mongoose;
  const transferSchema =new Schema({
    Creditor: String,
    Receipent: String,
    Amount: Number,
    Time: { type: Date, default: Date.now() }
})
module.exports = mongoose.model("History",transferSchema);
