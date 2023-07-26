const jwt = require("jsonwebtoken");

// Middleware to authenticate user requests
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    const decodedToken = jwt.verify(token, "your_secret_key");
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = { authenticateUser };
