const mongoose = require("mongoose");

const iconSchema = new mongoose.Schema(
  {
    icon_name: {
      type: String,
      required: [true, "An icon name is required."],
      unique: true,
      trim: true,
    },

    icon_link: {
      type: String,
      required: [true, "Icon is required."],
      unique: true,
      trim: true,
    },
  },
  { versionKey: false }
);

const Icon = mongoose.model("Icon", iconSchema);

module.exports = Icon;
