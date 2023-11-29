const mongoose = require("mongoose");

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Certification name is required."],
    trim: true,
  },

  company: {
    type: String,
    required: [true, "A certification must belong to at least one company."],
    trim: true,
  },

  icon: {
    type: String,
    required: [true, "A certification must have an icon."],
    trim: true,
  },

  link: {
    type: String,
    required: [
      true,
      "A certification must have a credential and be validated.",
    ],
    trim: true,
  },
});

const Certification = mongoose.model("Certification", certificationSchema);

module.exports = Certification;
