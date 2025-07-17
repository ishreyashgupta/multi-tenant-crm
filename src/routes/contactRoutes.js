const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { authenticate, authorize, tenantIsolation } = require("../middleware/auth");
const { validateContact, handleValidationErrors } = require("../middleware/validation");

// Apply authentication to all routes
router.use(authenticate);
router.use(tenantIsolation);

// Contact CRUD routes
router.post("/", 
  validateContact, 
  handleValidationErrors, 
  contactController.createContact
);

router.get("/", contactController.getContacts);

router.get("/stats", contactController.getContactStats);

router.get("/:id", contactController.getContact);

router.put("/:id", 
  validateContact, 
  handleValidationErrors, 
  contactController.updateContact
);

router.delete("/:id", contactController.deleteContact);

module.exports = router;
