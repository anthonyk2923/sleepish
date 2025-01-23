module.exports = (Message, User) => async (req, res) => {
  try {
    const chunk = parseInt(req.query.chunk) || 50;
    const page = parseInt(req.query.page) || 0;

    const totalMessages = await Message.countDocuments();

    const skip = Math.max(totalMessages - chunk * (page + 1), 0);

    const messages = await Message.find()
      .sort({})
      .skip(skip > 0 ? skip : 0)
      .limit(chunk);

    const userIds = messages.map((message) => message.fromUserId);
    const users = await User.find({ _id: { $in: userIds } });

    const userMap = users.reduce((acc, user) => {
      acc[user._id] = user.username;
      return acc;
    }, {});

    const messagesWithUsernames = messages.map((message) => ({
      ...message.toObject(),
      username: userMap[message.fromUserId],
    }));

    const totalPages = Math.ceil(totalMessages / chunk);

    res.status(200).json({ totalPages: totalPages, messages: messagesWithUsernames });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
