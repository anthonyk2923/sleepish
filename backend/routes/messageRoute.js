const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController.js");
const protectJwt = require('../middleware/jwtProtected.js')
const protectTime = require('../middleware/timeProtect.js')

module.exports = (io) => {
  const controller = messageController(io);

  router.route("/").get([protectJwt, protectTime], controller.get);
  router.route("/send").post([protectJwt, protectTime], controller.send);

  return router;
};
