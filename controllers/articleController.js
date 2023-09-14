const ErrorProvider = require("../classes/ErrorProvider");
const Article = require("../models/Article");

exports.getArticles = async (req, res, next) => {
  try {
    // * Random 6 article
    const articles = await Article.aggregate([
      {
        $sample: {
          size: 6,
        },
      },
      {
        $project: {
          article_documentation: 0,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      results: articles.length,
      data: {
        articles,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    if (!req.params.id)
      return next(new ErrorProvider(403, "fail", "An article id is required."));

    const { id } = req.params;

    const article = await Article.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        article,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.createArticle = async (req, res, next) => {
  try {
    const article = await Article.create({
      article_title: req.body.title,
      article_description: req.body.description,
      article_thumbnail: req.body.thumbnail,
      article_documentation: req.body.documentation,
    });

    res.status(201).json({
      status: "success",
      data: {
        article,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    if (!req.params.id)
      return next(new ErrorProvider(403, "fail", "An article id is required."));

    const { id } = req.params;

    const article = await Article.findByIdAndUpdate(
      id,
      {
        article_title: req.body.title,
        article_description: req.body.description,
        article_thumbnail: req.body.thumbnail,
        article_documentation: req.body.documentation,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        article,
      },
    });
  } catch (e) {
    next(e);
  }
};
