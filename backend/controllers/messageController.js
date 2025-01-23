
const Message = require("../models/messageModel.js");
const User = require("../models/userModel.js");

module.exports = (io) => ({
  get: require("./message/getEndpoint.js")(Message, User),
  send: require("./message/sendEndpoint.js")(Message, User, io)
});

