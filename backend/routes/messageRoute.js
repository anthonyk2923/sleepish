const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController.js");
const protectJwt = require('../middleware/jwtProtected.js')

module.exports = (io) => {
  const controller = messageController(io);

  router.route("/").get(protectJwt, controller.get);
  router.route("/send").post(protectJwt, controller.send);

  return router;
};
