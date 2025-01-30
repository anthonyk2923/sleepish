const time = require("../config/time.js");

const protect = async (req, res, next) => {
  const timeNTP = new Date(await time.time());
  const cur = timeNTP.getHours()
  console.log(timeNTP.toString())
  const curfewStart = parseInt(process.env.ALLOW_START);
  const curfewEnd = parseInt(process.env.ALLOW_END);
  const bypass = process.env.BYPASS_CURFEW == "true" || process.env.BYPASS_CURFEW == true
  console.log(cur, curfewStart, curfewEnd, bypass, ((cur >= curfewStart && cur < curfewEnd) || bypass))
  try {
    if ((cur >= curfewStart && cur < curfewEnd) || bypass) {
      next();
    } else {
      return res.status(403).json({ message: "You can only chat between 0:00 and 6:00." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong with the time check." });
  }
};

module.exports = protect;
