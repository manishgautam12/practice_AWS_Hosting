import mongoose from "mongoose";
mongoose.pluralize(null);
const signUpModel= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,  
    },
    lastName:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        match:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true, 
    },
    status:{
        type:Boolean,
        required:true,
    }
})

export default mongoose.model("users_db",signUpModel ,"users_db");