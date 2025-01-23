const User = require('../models/userModel.js');
const validator = require("email-validator");
const jwt = require('jsonwebtoken')

module.exports = {
  login: require("./user/loginEndpoint.js")(validator, jwt, User),
  signup: require("./user/signupEndoint.js")(validator, User),
  self: require("./user/selfEndpoint.js")(User),
  profile: require("./user/profileEndpoint.js")(User)
}
