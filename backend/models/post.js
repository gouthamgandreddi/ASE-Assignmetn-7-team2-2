const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  id:{
    type:String
  },
  title:{
    type:String,
    required:true
  },
  content:String
});


module.exports = mongoose.model('Post',postSchema);
