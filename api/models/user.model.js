import mongoose from "mongoose"


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required: true,
    },
    avatar:{
        type:String,
        default: "https://robohash.org/1?set=set2&size=50x50"
    },
}, 
    {timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;