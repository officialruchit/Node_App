const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }
    req.user = user;
    next();
  });
}
module.exports=auth