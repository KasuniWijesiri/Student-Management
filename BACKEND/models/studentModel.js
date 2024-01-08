import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:true
        },
        age:{
            type: Number,
            required:true 
        },
        
        parent:{
            type: String,
            required:true
        },
        phone:{
            type: Number,
            required:true 
        },
        email:{
            type: String,
            required:true 
        },

    },
    {
        timestamps:true,
    },

);

export const Student = mongoose.model('Student',studentSchema);