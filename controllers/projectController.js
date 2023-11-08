const ErrorProvider = require("../classes/ErrorProvider");
const Project = require("../models/Project");

// * Get all projects
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      status: "success",
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (e) {
    next(e);
  }
};

// * Get a project
exports.getProjectById = async (req, res, next) => {
  try {
    if (!req.params.id)
      return next(new ErrorProvider(403, "fail", "A project id is required."));

    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project)
      return next(new ErrorProvider(404, "fail", "Not found project."));

    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.getProjectByName = async (req, res, next) => {
  try {
    if (!req.params.name)
      return next(
        new ErrorProvider(403, "fail", "A project name is required.")
      );

    const { name } = req.params;

    const project = await Project.findOne({ name });

    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (e) {
    next(e);
  }
};

// * Create a project
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      project_name: req.body.name,
      project_description: req.body.description,
      project_logo: req.body.logo,
      project_link: req.body.link,
      project_repo: req.body.repo,
      project_documentation: req.body.documentation,
    });

    res.status(201).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    if (!req.params.id)
      return next(
        new ErrorProvider(403, "fail", "A project id is required to update..")
      );

    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(
      id,
      {
        project_documentation: req.body.documentation,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: `${project.name} has been updated successfully.`,
      data: {
        project,
      },
    });
  } catch (e) {
    next(e);
  }
};
