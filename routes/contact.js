const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("./../middleware/auth");
const Contact = require("./../models/Contact");
const router = express.Router();

//@route  GET api/contact
//@desc   GET all users contacts
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json({ contacts });
  } catch (err) {
    console.log("Server Error");
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route  POST api/contacts
//@desc   add new contact
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      const contact = await newContact.save();
      res.status(200).json(contact);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Serve Error" });
    }
  }
);

//@route  POST api/contact/:id
//@desc   Update contact
//@access Private

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const contactField = {};

  if (name) contactField.name = name;
  if (email) contactField.email = email;
  if (phone) contactField.phone = phone;
  if (type) contactField.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    //Make sure user owns contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).msg({ msg: "No Authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactField },
      { new: true }
    );
    res.status(200).json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//@route  DELETE api/contact/:id
//@desc   Delete contact
//@access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    //Make sure user owns contacts
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).msg({ msg: "No Authorized" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: "Contact remove" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
