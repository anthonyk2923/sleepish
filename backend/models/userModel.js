const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");   

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 6,
    maxLength: 64,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 32,
  },
  role: {
    type: String,
    required: true,
    enum: ['basic', 'vip', 'admin'],
    default: 'basic',
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
