var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: { type: String },
  start: { type: Date },
  content: { type: String },
  created: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('event', eventSchema)
