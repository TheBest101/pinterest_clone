'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Links = new Schema({
	owner: String,
  title: String,
  link: String
});

module.exports = mongoose.model('Links', Links);
