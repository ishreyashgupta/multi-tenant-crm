const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "manager", "user"],
    default: "user"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);