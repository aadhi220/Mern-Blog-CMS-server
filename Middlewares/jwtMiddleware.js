const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("Inside jwtMiddleware");

  // Check if the Authorization header exists
  if (!req.headers.authorization) {
    return res.status(401).json("Authorization header missing");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const jwtResponse = jwt.verify(token, "blog123");
    req.payload = jwtResponse.userId;
    next();
  } catch (err) {
    res.status(401).json("Authorization failed!! Please log in.");
  }
};

module.exports = jwtMiddleware;