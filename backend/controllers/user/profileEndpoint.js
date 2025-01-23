const mongoose = require('mongoose');
module.exports = (User) => async (req, res) => {
  try {
    let id = req.query.id
    if (!id) {
      res.status(400).json({ message: "please enter and id" })
    }
    else {
      const user = await User.findById(id)
      if (!user) {
        res.status(400).json({ message: "no user found" })
      }
      else {
        const userPublic = {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        }

        res.status(200).json({ message: "User profile", user: userPublic });
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" });
  }
} 
