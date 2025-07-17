const jwt = require("jsonwebtoken");
const User = require("../models/User");

// JWT Authentication Middleware
exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).populate("tenantId");
    
    if (!user) {
      return res.status(401).json({ error: "Invalid token." });
    }

    req.user = user;
    req.tenantId = user.tenantId._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

// Role-based Authorization Middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

// Tenant Isolation Middleware
exports.tenantIsolation = (req, res, next) => {
  // Ensure all queries are scoped to the current tenant
  req.tenantFilter = { tenantId: req.tenantId };
  next();
};