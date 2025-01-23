const mongoose = require('mongoose')
const { Schema } = mongoose;
const time = require('../config/time.js')

const messageSchema = new Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 400,
    trim: true,
  },
  time: {
    type: Date,
  },
})

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
