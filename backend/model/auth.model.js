import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique:true
    },
    fullname:{
        type: String,
        required: true,
        unique: true,  
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    cart :{
        type: Object,
        default:{}
    }
},{minimized: false});

const User = mongoose.models.auth || mongoose.model("auth", authSchema);
export default User;