const { body, validationResult } = require("express-validator");

// Validation result handler
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array()
    });
  }
  next();
};

// Contact validation rules
exports.validateContact = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  
  body("phone")
    .trim()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  
  body("company")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company name must not exceed 100 characters"),
  
  body("position")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Position must not exceed 100 characters"),
  
  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes must not exceed 500 characters"),
  
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),
  
  body("tags.*")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Each tag must not exceed 20 characters")
];

// User registration validation
exports.validateRegister = [
  body("tenantName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Tenant name must be between 2 and 50 characters"),
  
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
];

// User login validation
exports.validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
  
  body("password")
    .notEmpty()
    .withMessage("Password is required")
];