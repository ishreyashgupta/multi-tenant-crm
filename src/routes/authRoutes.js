const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateRegister, validateLogin, handleValidationErrors } = require("../middleware/validation");

// Authentication routes
router.post("/register", 
  validateRegister, 
  handleValidationErrors, 
  authController.register
);

router.post("/login", 
  validateLogin, 
  handleValidationErrors, 
  authController.login
);

module.exports = router;
