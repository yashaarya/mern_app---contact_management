const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// POST /api/contacts - Create a new contact
router.post('/', async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message
    });

    const savedContact = await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      contact: savedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/contacts - Retrieve all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      contacts: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
