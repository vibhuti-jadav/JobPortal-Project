import httpError from "../middleware/errorHandlig.js";
import portal from "../model/jobportalmodel.js";

const addJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      requirments,
      salary,
      experienceLevel,
      location,
      JobType,
      position,
    } = req.body;

    const newData = {
      title,
      description,
      requirments,
      salary,
      experienceLevel,
      location,
      JobType,
      position,
    };

    const saveData = portal(newData);
    await saveData.save();

    if (!saveData) {
      return next(new httpError("job ot found", 400));
    }
    res
      .status(201)
      .json({ message: "job information added successfully", saveData });
  } catch (error) {
    next(new httpError(error.message));
  }
};

export default { addJob };
