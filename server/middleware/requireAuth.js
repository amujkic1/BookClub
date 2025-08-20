const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

module.exports = { requireAuth };
