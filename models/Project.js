const mongoose = require("mongoose");

// * Schema design
const projectSchema = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: [true, "A project name is required."],
      unique: true,
      trim: true,
    },

    project_description: {
      type: String,
      required: [true, "A project description is required."],
      trim: true,
    },

    project_logo: {
      type: String,
      required: [true, "An application logo is required."],
      unique: true,
      trim: true,
    },

    project_link: {
      type: String,
      required: [true, "An application project link is required."],
      unique: true,
      trim: true,
    },

    project_repo: {
      type: String,
      required: [true, "An application must have a GitHub repo."],
      unique: true,
      trim: true,
    },

    project_documentation: {
      title: {
        type: String,
        required: [
          true,
          "A project's documentation must have at least one title.",
        ],
        trim: true,
      },

      description: {
        type: String,
        required: [
          true,
          "A project's documentation must have at least one description.",
        ],
        trim: true,
      },

      keywords: {
        type: [String],
        required: [true, "A project's documentation must have a few keywords."],
      },

      headings: [
        {
          sub_title: {
            type: String,
            trim: true,
          },

          paragraph: {
            type: String,
            trim: true,
          },

          lists: {
            type: [String],
            trim: true,
          },

          images: {
            type: [String],
            trim: true,
          },
        },
      ],
    },
  },
  {
    // * Enable virtual populating
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// * Query Middleware
projectSchema.pre("find", function (next) {
  this.find().select("-project_documentation");

  next();
});

// * Model
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
