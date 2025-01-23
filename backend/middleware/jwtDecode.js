const jwt = require('jsonwebtoken');
const decode = (token) => {
  if (!token) {
    console.error('No token provided');
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
};
module.exports = decode
