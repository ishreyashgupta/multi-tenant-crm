const Contact = require("../models/Contact");

// Create a new contact
exports.createContact = async (req, res) => {
  try {
    const contactData = {
      ...req.body,
      tenantId: req.tenantId,
      userId: req.user._id
    };

    // Check if contact with same email exists in this tenant
    const existingContact = await Contact.findOne({
      tenantId: req.tenantId,
      email: req.body.email
    });

    if (existingContact) {
      return res.status(400).json({ error: "Contact with this email already exists" });
    }

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      message: "Contact created successfully",
      contact
    });
  } catch (error) {
    console.error("Create contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all contacts for the tenant
exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, tag } = req.query;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = { tenantId: req.tenantId, isActive: true };
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    if (tag) {
      filter.tags = { $in: [tag] };
    }

    const contacts = await Contact.find(filter)
      .populate("userId", "email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalContacts: total,
        hasNext: skip + contacts.length < total,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single contact by ID
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      tenantId: req.tenantId,
      isActive: true
    }).populate("userId", "email");

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ contact });
  } catch (error) {
    console.error("Get contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a contact
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      {
        _id: req.params.id,
        tenantId: req.tenantId,
        isActive: true
      },
      req.body,
      { new: true, runValidators: true }
    ).populate("userId", "email");

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({
      message: "Contact updated successfully",
      contact
    });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a contact (soft delete)
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      {
        _id: req.params.id,
        tenantId: req.tenantId,
        isActive: true
      },
      { isActive: false },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get contact statistics
exports.getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments({
      tenantId: req.tenantId,
      isActive: true
    });

    const recentContacts = await Contact.countDocuments({
      tenantId: req.tenantId,
      isActive: true,
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
    });

    const contactsByCompany = await Contact.aggregate([
      {
        $match: {
          tenantId: req.tenantId,
          isActive: true,
          company: { $exists: true, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$company",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json({
      stats: {
        totalContacts,
        recentContacts,
        topCompanies: contactsByCompany
      }
    });
  } catch (error) {
    console.error("Get contact stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
