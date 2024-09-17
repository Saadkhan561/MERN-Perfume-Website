const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required:true },
  role:{type:String, default: "user"},

});

module.exports = mongoose.model('perfume_users', userSchema);
