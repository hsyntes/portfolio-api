const ErrorProvider = require("../classes/ErrorProvider");
const Icon = require("../models/Icon");

exports.getIcons = async (req, res, next) => {
  try {
    const icons = await Icon.find();

    res.status(200).json({
      status: "success",
      results: icons.length,
      data: {
        icons,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.getIconById = async (req, res, next) => {
  try {
    if (!req.params.id)
      return next(new ErrorProvider(403, "fail", "An icon id is required."));

    const { id } = req.params;

    const icon = await Icon.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        icon,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.getIconByName = async (req, res, next) => {
  try {
    if (!req.params.name)
      return next(new ErrorProvider(403, "fail", "An icon name is required."));

    const { name } = req.params;

    const icon = await Icon.findOne({ name });

    res.status(200).json({
      status: "success",
      data: {
        icon,
      },
    });
  } catch (e) {
    next(e);
  }
};

// exports.createIcon = async (req, res, next) => {
//   try {
//     const icon = await Icon.create({
//       icon_name: req.body.name,
//       icon_link: req.body.link,
//       icon_category: req.body.category,
//     });

//     res.status(201).json({
//       status: "success",
//       data: {
//         icon,
//       },
//     });
//   } catch (e) {
//     next(e);
//   }
// };
