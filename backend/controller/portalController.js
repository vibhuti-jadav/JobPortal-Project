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

const alljobs = async(req,res,next)=>{
  try {
    
    const alljob = await portal.find({})

    if(!alljob){
      return next(new httpError('employ  can,t find ',400))
    }
    res.status(200).json({message:"employ information here",alljob})

  } catch (error) {
    next(new httpError(error.message))
  }
}

const specifyJob = async(req,res,next)=>{
  try {
    const id =  req.params.id

    const  existingJob =  await portal.findById(id)

    if(!existingJob){
      return next(new httpError("job is not found",400))
    }

    res.status(200).json({message:"job find successfully",existingJob})
  } catch (error) {
    next(new httpError(error.message))
  }
}

const updateJob = async(req,res,next)=>{
  try {
    const id = req.params.id

    const existingJob = await portal.findById(id)

    if(!existingJob){
      return next(new httpError("job not found",400))
    }

    const updates = Object.keys(req.body)

    const allowfield = ["title","description","requirments","salary","experienceLevel","location","jobtype","position"]
 
    const isValidUpdate = updates.every((field)=>allowfield.includes(field))

    if(!isValidUpdate){
      return next(new httpError("only allowed field can be updated",400))
    }

    updates.forEach((update)=>{
      existingJob[update] = req.body[update]
    })

    await existingJob.save()

    res.status(200).json({message:"employee information udated successfullyy",existingJob})

  } catch (error) {
    next(new httpError(error.message))
  }
}

const deleteJob = async(req,res,next)=>{
  try {
    const id = req.params.id

    const  existingJob = await portal.findByIdAndDelete(id) 

    if(!existingJob){
      return next(new httpError("job not found",400))
    }

    res.status(200).json({message:"job delete successfully"})
  } catch (error) {
   next(new httpError(error.message)) 
  }
}



export default { addJob , alljobs ,specifyJob , updateJob,deleteJob };
