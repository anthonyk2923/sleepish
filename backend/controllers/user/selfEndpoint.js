
module.exports = (User) => async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
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
      const appSettings = {
        curfewStart: process.env.ALLOW_START,
        curfewEnd: process.env.ALLOW_END,
        curfewBypass: process.env.BYPASS_CURFEW
      }
      res.status(200).json({ message: "User profile and App Settings", user: userPublic, app: appSettings });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" });
  }
} 
