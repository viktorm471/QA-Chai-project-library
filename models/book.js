const mongoose = require("mongoose");

const book = new mongoose.Schema({
  title: {type:String, required:true},
  commentcount: { type : Number , "default" : 0 },
  comments:{ type : Array , "default" : [] }
});
module.exports = mongoose.model("Book", book);