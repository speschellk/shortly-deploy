var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/shortlyTest');

//setting up schema in mongoose
var usersSchema = new Schema({
  id: Number,
  username: String,
  password: String,
  createdAt: String,
});

var urlSchema = new Schema({
  id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  createdAt: String
});

module.exports.user = mongoose.model('User', userSchema);
module.exports.url = mongoose.model('Url', urlSchema);