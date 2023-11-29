const Certification = require("../models/Certification");

exports.getCertifications = async (req, res, next) => {
  try {
    const certifications = await Certification.find();

    res.status(200).json({
      status: "success",
      results: certifications.length,
      data: {
        certifications,
      },
    });
  } catch (e) {
    next(e);
  }
};
