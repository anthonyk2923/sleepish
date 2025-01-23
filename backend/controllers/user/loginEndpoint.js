module.exports = (validator, jwt, User) => async (req, res) => {
  try {
    const { login, password } = req.body
    if (!login || !password) {
      return res.status(400).json({ message: "enter login and password" })
    }
    let user;
    if (validator.validate(login)) {
      user = await User.findOne({ email: login });
    } else {
      user = await User.findOne({ username: login });
    }
    if (!user) {
      return res.status(400).json({ message: "no user found" })
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });


  } catch (error) {
    console.error("error during login:", error);
    res.status(500).json({ message: "internal server error during login" })
  }
}
