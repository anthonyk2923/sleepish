module.exports = (validator, User) => async (req, res) => {
  try {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
      return res.status(400).json({ message: "enter a username and email and password" })
    }
    if (!validator.validate(email)) {
      return res.status(400).json({ message: "email malformated" })
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "email already exists" })
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "username already exists" })
    }

    const newUser = new User({
      email: email,
      username: username,
      password: password,
    })
    await newUser.save()
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.error("error during signup:", error);
    res.status(500).json({ message: "interal server error during signup" })
  }
}
