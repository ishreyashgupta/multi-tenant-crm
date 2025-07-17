const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Tenant = require("../models/Tenant");

exports.register = async (req, res) => {
  try {
    const { tenantName, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Check if tenant already exists
    const existingTenant = await Tenant.findOne({ name: tenantName });
    if (existingTenant) {
      return res.status(400).json({ error: "Tenant already exists with this name" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create tenant first
    const tenant = new Tenant({ name: tenantName });
    await tenant.save();

    // Create admin user for the tenant
    const user = new User({
      tenantId: tenant._id,
      email,
      password: hashedPassword,
      role: "admin",
    });
    await user.save();

    const token = jwt.sign(
      { 
        userId: user._id, 
        tenantId: tenant._id, 
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.status(201).json({ 
      message: "Registration successful",
      token, 
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        tenantId: tenant._id,
        tenantName: tenant.name
      }
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).populate("tenantId");
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { 
        userId: user._id, 
        tenantId: user.tenantId._id, 
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.json({ 
      message: "Login successful",
      token, 
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId._id,
        tenantName: user.tenantId.name
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};