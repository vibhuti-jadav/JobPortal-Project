import mongoose from "mongoose"

const portalSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
    },
    requirments:[String],
    salary:Number,
    experienceLevel:Number,
    location:String,
    jobType:{
        type:String,
        enum:["full-time","part-time","intership","remote"],
    },
    position:Number,
    
})

const portal = mongoose.model("portal",portalSchema)

export default portal
