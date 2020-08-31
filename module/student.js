var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  student_name:{
    type:String,
  },
  student_last:{
    type:String,

  },
  student_city: {
    type :String
  },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Students', ProductSchema);