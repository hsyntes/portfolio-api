const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    article_title: {
      type: String,
      required: [true, "An article title is required."],
      unique: true,
      trim: true,
    },

    article_description: {
      type: String,
      required: [true, "An article description is required."],
      trim: true,
    },

    article_thumbnail: {
      type: String,
      required: [true, "An article thumbnail is required."],
      unique: true,
      trim: true,
    },

    article_postedAt: {
      type: Date,
      default: Date.now(),
    },

    article_documentation: {
      title: {
        type: String,
        required: [true, "An article title is required."],
      },

      description: {
        type: String,
        required: [true, "An article description is required."],
      },

      keywords: {
        type: [String],
        required: [true, "An article's must have a few keywords. "],
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

          code: {
            type: String,
            trim: true,
          },

          images: {
            type: String,
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

// * Query middleware
articleSchema.pre("find", function (next) {
  this.find().select("-article_documentation");

  next();
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
