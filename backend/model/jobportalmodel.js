import mongoose from "mongoose"

const portalSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    

})