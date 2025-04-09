const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    required: false
  },
  order: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema); 