const Project = require("../models/Project");
const Article = require("../models/Article");

exports.getDocuments = async (req, res, next) => {
  try {
    const projects = await Project.aggregate([
      {
        $sample: {
          size: 3,
        },
      },
      {
        $project: {
          project_documentation: 0,
        },
      },
    ]);

    const articles = await Article.aggregate([
      {
        $sample: {
          size: 3,
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
      results: projects.length + articles.length,
      data: {
        projects,
        articles,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.searchDocuments = async (req, res, next) => {
  try {
    const { q } = req.params;

    const projects = await Project.find({
      project_name: { $regex: q, $options: "i" },
    });

    const articles = await Article.find({
      article_title: { $regex: q, $options: "i" },
    });

    res.status(200).json({
      status: "success",
      data: {
        projects,
        articles,
      },
    });
  } catch (e) {
    next(e);
  }
};
