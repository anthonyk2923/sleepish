const time = require('../../config/time.js')
module.exports = (Message, User, io) => async (req, res) => {
  try {
    if (!req.user.id) {
      res.status(400).json({ message: "please provide a user id" })
    }
    if (!req.body.body) {
      res.status(400).json({ message: "please provide a message body" })
    }
    else {
      const messageObject = {
        fromUserId: req.user.id,
        body: req.body.body,
        time: await time.time()
      }
      const newMessage = new Message(messageObject)
      await newMessage.save()
      const userName = await User.findById(req.user.id)
      if (!userName.username) {
        console.log(`user with id: ${req.user.id} not found`)
      }
      else {
        messageObject.username = userName.username
        io.emit('newMessage', messageObject)
        res.status(201).json({ message: "message sent" })
      }

    }
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}
